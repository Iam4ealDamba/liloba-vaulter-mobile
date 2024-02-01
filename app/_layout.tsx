// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { Redirect, Slot } from "expo-router";
import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";

// ||||||||||||||||||||||||||||| Root Layout Component ||||||||||||||||||||||||||||||||||||

const RootLayout = () => {
  return <Slot screenOptions={{ headerShown: false }} />;
};
export default RootLayout;
