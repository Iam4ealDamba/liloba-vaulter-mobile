// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { Redirect, Slot, Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";

// ||||||||||||||||||||||||||||| Auth Layout Component ||||||||||||||||||||||||||||||||||||

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="/(auth)/index" options={{ headerShown: true }} />
      <Stack.Screen name="/(auth)/login" options={{ headerShown: true }} />
      <Stack.Screen name="/(auth)/register" options={{ headerShown: false }} />
    </Stack>
  );
};
export default AuthLayout;
