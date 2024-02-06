// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { Link } from "expo-router";
import React, { useState, useEffect, FC } from "react";
import { Pressable, Text, View } from "react-native";
import CustomText from "../text/CustomText";

// ||||||||||||||||||||||||||||| Regular Button Component ||||||||||||||||||||||||||||||||||||

interface ILinkButtonProps {
  text: string;
  on_pressed?: () => void;
  style?: string;
  style_2?: string;
}

const RegularButton: FC<ILinkButtonProps> = ({
  text,
  on_pressed,
  style,
  style_2,
}) => {
  // Effects
  useEffect(() => {
    // Enter some content here.
  }, []);

  // Return
  return (
    <Pressable
      onPress={on_pressed}
      className={` w-[280px] h-[50px] flex items-center justify-center mx-auto rounded-lg bg-tw_text active:bg-tw_text/80 ${style}`}
    >
      <CustomText font="SemiBold" style_1={style_2}>
        {text}
      </CustomText>
    </Pressable>
  );
};
export default RegularButton;
