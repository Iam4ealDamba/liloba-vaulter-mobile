// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, { FC, useState, useEffect } from "react";
import { Text, View } from "react-native";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

import ReduxProvider from "@/store/provider";
import migrations from "@/drizzle/migrations";
import database from "@/services/db";

// ||||||||||||||||||||||||||||| AppLayout Component ||||||||||||||||||||||||||||||||||||

interface IAppLayoutProps {
  children: JSX.Element;
}

const AppLayout: FC<IAppLayoutProps> = ({ children }) => {
  // Hooks
  const { success, error } = useMigrations(database, migrations);

  // Return
  if (error) {
    return <View></View>;
  }

  if (!success) {
    return <View></View>;
  }

  return <ReduxProvider>{children}</ReduxProvider>;
};
export default AppLayout;
