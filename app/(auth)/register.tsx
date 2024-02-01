// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { Link } from "expo-router";
import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";

// ||||||||||||||||||||||||||||| Register Page Component ||||||||||||||||||||||||||||||||||||

const RegisterPage = () => {
  // Hooks
  const [val, setVal] = useState();

  // Effects
  useEffect(() => {
    // Enter some content here.
  }, []);

  // Return
  return (
    <View>
      <View className="flex h-full justify-center items-center">
        <Text className="text-lg font-bold">RegisterPage Page</Text>
        <Link href={"/(auth)/login"}>Go to Login</Link>
      </View>
    </View>
  );
};
export default RegisterPage;
