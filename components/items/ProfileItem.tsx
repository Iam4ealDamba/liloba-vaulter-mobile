// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, { FC, useState, useEffect } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import CustomText from "../text/CustomText";
import { FontAwesome } from "@expo/vector-icons";
import colors from "@/utils/colors";

// ||||||||||||||||||||||||||||| ProfileItem Component ||||||||||||||||||||||||||||||||||||

interface IProfileItemProps {
  title: string;
  icon: string;
  on_pressed?: () => void;
}

const ProfileItem: FC<IProfileItemProps> = ({ title, icon, on_pressed }) => {
  // Return
  return (
    <TouchableOpacity
      aria-label="Service Item"
      className="flex flex-row py-3 items-center justify-between"
      onPress={on_pressed}
      activeOpacity={0.6}
    >
      <View aria-label="Left" className="flex flex-row items-center gap-x-4">
        <View
          aria-label="Left Logo"
          className="w-10 h-10 flex items-center justify-center rounded-md bg-tw_secondary"
        >
          <FontAwesome name={icon} size={22} color={colors.tw_primary} />
        </View>
        <View aria-label="Right Title" className="">
          <CustomText font="Bold" style_1="text-tw_text">
            {title}
          </CustomText>
        </View>
      </View>
      <View aria-label="Right" className="">
        <FontAwesome name="chevron-right" size={18} color={colors.tw_text} />
      </View>
    </TouchableOpacity>
  );
};
export default ProfileItem;
