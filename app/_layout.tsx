// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, { FC } from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppLayout from "@/layout/AppLayout";

// ||||||||||||||||||||||||||||| RootLayout Component ||||||||||||||||||||||||||||||||||||

interface IRootLayoutProps {}

const RootLayout: FC<IRootLayoutProps> = () => {
  // Return
  return (
    <AppLayout>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </AppLayout>
  );
};
export default RootLayout;
