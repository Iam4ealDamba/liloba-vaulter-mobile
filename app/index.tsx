// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { Redirect } from "expo-router";
import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";

// ||||||||||||||||||||||||||||| Index Router Component ||||||||||||||||||||||||||||||||||||

const IndexRouter = () => {
  return <Redirect href="/(auth)" />;
};
export default IndexRouter;
