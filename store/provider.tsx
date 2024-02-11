// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, { FC, useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Provider } from "react-redux";
import store from ".";

// ||||||||||||||||||||||||||||| ReduxProvider Component ||||||||||||||||||||||||||||||||||||

interface IReduxProviderProps {
  children: JSX.Element;
}

const ReduxProvider: FC<IReduxProviderProps> = ({ children }) => {
  // Return
  return <Provider store={store}>{children}</Provider>;
};
export default ReduxProvider;
