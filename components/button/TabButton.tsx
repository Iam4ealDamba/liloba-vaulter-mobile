// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { FontAwesome6 } from "@expo/vector-icons";
import React, { FC, useState, useEffect } from "react";
import { Text, View } from "react-native";

// ||||||||||||||||||||||||||||| TabButton Component ||||||||||||||||||||||||||||||||||||

interface ITabButtonProps {
  item: any;
}

const TabButton: FC<ITabButtonProps> = ({ item }) => {
  // Hooks
  const [val, setVal] = useState();

  // Effects
  useEffect(() => {
    // Enter some content here.
  }, []);

  // Return
  return (
    <View>
      <FontAwesome6 name="home" size={24} color="black" />
    </View>
  );
};
export default TabButton;
