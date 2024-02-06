// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, { FC, useState, useEffect } from "react";
import { Text, View } from "react-native";

// ||||||||||||||||||||||||||||| RegularInput Component ||||||||||||||||||||||||||||||||||||

interface IRegularInputProps {
  children?: JSX.Element[] | JSX.Element | string[];
  style?: string;
}

const RegularInput: FC<IRegularInputProps> = ({ children, style }) => {
  // Hooks
  const [val, setVal] = useState();

  // Effects
  useEffect(() => {
    // Enter some content here.
  }, []);

  // Return
  return (
    <View
      className={`w-full flex flex-row items-center px-4 py-1 rounded-md bg-tw_bg ${style}`}
    >
      {children}
    </View>
  );
};
export default RegularInput;
