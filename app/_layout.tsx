// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, { FC } from "react";
import { Stack } from "expo-router";
import "../global.css";

// ||||||||||||||||||||||||||||| RootLayout Component ||||||||||||||||||||||||||||||||||||

interface IRootLayoutProps {}

const RootLayout: FC<IRootLayoutProps> = () => {
  // Return
  return <Stack />;
};
export default RootLayout;
