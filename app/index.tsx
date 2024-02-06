// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { Redirect } from "expo-router";
import React, { FC, useState, useEffect } from "react";
import { Text, View } from "react-native";

// ||||||||||||||||||||||||||||| RootIndex Component ||||||||||||||||||||||||||||||||||||

interface IRootIndexProps {}

const RootIndex: FC<IRootIndexProps> = () => {
  return <Redirect href="/(auth)" />;
};
export default RootIndex;
