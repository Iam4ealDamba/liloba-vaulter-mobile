// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { Link } from "expo-router";
import React, { useState, useEffect, FC } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import CustomText from "../text/CustomText";

// ||||||||||||||||||||||||||||| Regular Button Component ||||||||||||||||||||||||||||||||||||

interface ILinkButtonProps {
  children: JSX.Element | JSX.Element[];
  on_pressed?: () => void;
  style?: string;
  style_2?: string;
}

const IconButton: FC<ILinkButtonProps> = ({
  children,
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
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={on_pressed}
      className={` w-12 h-12 flex items-center justify-center mx-auto rounded-lg bg-tw_text active:bg-tw_text/80 ${style}`}
    >
      {children}
    </TouchableOpacity>
  );
};
export default IconButton;
