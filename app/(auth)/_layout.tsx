// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import Toast from "react-native-toast-message";

// ||||||||||||||||||||||||||||| Auth Layout Component ||||||||||||||||||||||||||||||||||||

const AuthLayout = () => {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast />
    </SafeAreaProvider>
  );
};
export default AuthLayout;
