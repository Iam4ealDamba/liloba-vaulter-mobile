// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, { FC, useState, useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import CustomText from "../text/CustomText";

// ||||||||||||||||||||||||||||| TagComponent Component ||||||||||||||||||||||||||||||||||||

interface ITagComponentProps {
  text: string;
  style?: string;
}

const TagComponent: FC<ITagComponentProps> = ({ text, style }) => {
  // Hooks
  const [val, setVal] = useState();

  // Effects
  useEffect(() => {
    // Enter some content here.
  }, []);

  // Return
  return (
    <Pressable
      className={`w-[100px] bg-tw_secondary rounded-full px-2 py-1 ${style}`}
    >
      <CustomText font="SemiBold" style_1="text-tw_primary text-xs text-center">
        {text}
      </CustomText>
    </Pressable>
  );
};
export default TagComponent;
