// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, { FC, useState, useEffect, useLayoutEffect } from "react";
import { Redirect } from "expo-router";
import { Text, View } from "react-native";
import * as ExpoSecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";

import { useAppDispatch, useAppSelector } from "@/store";
import { GetTokenSlice, IUserStoreModel, loginSlice } from "@/store/user";
import UserQueries from "@/services/queries/users";
import { StatusCode } from "@/utils/enums";
import ServiceQueries from "@/services/queries/services";
import { AddServiceSlice, FetchServiceListSlice } from "@/store/service";
import { IServiceItem } from "@/utils/interfaces";

// ||||||||||||||||||||||||||||| RootIndex Component ||||||||||||||||||||||||||||||||||||

SplashScreen.preventAutoHideAsync();

const RootIndex = () => {
  // Redux
  const { token } = useAppSelector((state) => state.user);
  const AppDispatch = useAppDispatch();

  // Hooks
  const [loading, setLoading] = useState(true);

  // Functions
  const handleGetCurrentUser = async () => {
    const get_token = await ExpoSecureStore.getItemAsync("token_user");
    if (!get_token) {
      new Promise((resolve) =>
        setTimeout(() => {
          SplashScreen.hideAsync();
          setLoading(false);
          resolve;
        }, 3000)
      );
      return;
    }

    let current = await UserQueries.GetCurrent(get_token);
    if (current.status !== StatusCode.OK) {
      new Promise((resolve) =>
        setTimeout(() => {
          SplashScreen.hideAsync();
          setLoading(false);
          resolve;
        }, 3000)
      );
      return;
    }

    let current_services = await ServiceQueries.GetServices(Number(get_token));
    AppDispatch(GetTokenSlice(get_token));
    AppDispatch(loginSlice(current.data as IUserStoreModel));
    AppDispatch(FetchServiceListSlice(current_services));
    

    new Promise((resolve) =>
      setTimeout(() => {
        SplashScreen.hideAsync();
        setLoading(false);
        resolve;
      }, 3000)
    );
  };

  // Effects
  useLayoutEffect(() => {
    handleGetCurrentUser();
  });

  // Return
  if (loading) return null;
  if (token) {
    return <Redirect href="/(tabs)" />;
  }
  return <Redirect href="/(auth)" />;
};

export default RootIndex;
