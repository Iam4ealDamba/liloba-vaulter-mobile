// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, { FC, useState, useEffect } from "react";
import { Text, View } from "react-native";
import AppFontHook from "@/hooks/app-font.hook";

// ||||||||||||||||||||||||||||| CustomText Component ||||||||||||||||||||||||||||||||||||

interface ICustomTextProps {
  children: JSX.Element | string | JSX.Element[] | string[];
  font: "Regular" | "Medium" | "SemiBold" | "Bold" | "Black";
  style_1?: string;
}

const CustomText: FC<ICustomTextProps> = ({
  children,
  font = "Regular",
  style_1,
}) => {
  // Hooks
  const [is_font_loaded, setIsFontLoaded] = useState(false);

  // Functions
  const LoadAppFont = async () => {
    await AppFontHook();
    setIsFontLoaded(true);
  };

  // Effects
  useEffect(() => {
    // Enter some content here.
    LoadAppFont();
  }, []);

  // Return
  return (
    <Text
      className={style_1}
      style={is_font_loaded && { fontFamily: `Fairplay-${font}` }}
    >
      {children}
    </Text>
  );
};
export default CustomText;
