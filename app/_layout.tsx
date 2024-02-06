// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, { FC } from "react";
import { Stack } from "expo-router";
import "@/styles/global.css";

// ||||||||||||||||||||||||||||| RootLayout Component ||||||||||||||||||||||||||||||||||||

interface IRootLayoutProps {}

const RootLayout: FC<IRootLayoutProps> = () => {
  // Return
  return <Stack screenOptions={{ headerShown: false }} />;
};
export default RootLayout;
