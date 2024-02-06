// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import Toast from "react-native-toast-message";

// ||||||||||||||||||||||||||||| Auth Layout Component ||||||||||||||||||||||||||||||||||||

const AuthLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </>
  );
};
export default AuthLayout;
