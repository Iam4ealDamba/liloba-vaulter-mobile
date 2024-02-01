// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { Link } from "expo-router";
import React, { useState, useEffect, FC } from "react";
import { Pressable, Text, View } from "react-native";

// ||||||||||||||||||||||||||||| Link Button Component ||||||||||||||||||||||||||||||||||||

interface ILinkButtonProps {
  text: string;
  link_btn: string;
  style?: string;
  style_2?: string;
}

const LinkButton: FC<ILinkButtonProps> = ({
  link_btn,
  text,
  style,
  style_2,
}) => {
  // Effects
  useEffect(() => {
    // Enter some content here.
  }, []);

  // Return
  return (
    <Link
      href={{
        pathname: link_btn,
      }}
      className={`flex items-center justify-center bg-red-300 w-[280px] h-[50px] mx-auto ${style}`}
      asChild
    >
      <Pressable>
        <Text className={style_2}>{text}</Text>
      </Pressable>
    </Link>
  );
};
export default LinkButton;
