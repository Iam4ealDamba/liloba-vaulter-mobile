// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import Toast from "react-native-toast-message";

// ||||||||||||||||||||||||||||| Auth Layout Component ||||||||||||||||||||||||||||||||||||

const AuthLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast />
    </>
  );
};
export default AuthLayout;
