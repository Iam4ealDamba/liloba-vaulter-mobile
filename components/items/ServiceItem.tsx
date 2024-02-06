// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, { FC, useState, useEffect } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import CustomText from "../text/CustomText";
import TagComponent from "../tag/TagComponent";
import { IServiceItem } from "@/utils/interfaces";

// ||||||||||||||||||||||||||||| ServiceItem Component ||||||||||||||||||||||||||||||||||||

interface IServiceItemProps {
  text?: string;
  data?: IServiceItem | null;
  on_pressed?: () => void;
}

const ServiceItem: FC<IServiceItemProps> = ({
  text = "Service Name",
  data,
  on_pressed,
}) => {
  // Hooks
  const [val, setVal] = useState();

  // Effects
  useEffect(() => {
    // Enter some content here.
  }, []);

  // Return
  return (
    <Pressable
      aria-label="Service Item"
      className="flex flex-row gap-x-3 py-3 bg-transparent transition-all active:bg-tw_text/20"
      onPress={on_pressed}
    >
      <View
        aria-label="Left"
        className="w-16 h-16 rounded-md bg-tw_text"
      ></View>
      <View aria-label="Right" className="flex-1">
        <CustomText font="Black" style_1="text-tw_text">
          {data ? data.name : text}
        </CustomText>
        <CustomText
          font="Regular"
          style_1="text-sm text-tw_accent line-clamp-1"
        >
          {data ? data.email : "adresse@email.com"}
        </CustomText>
      </View>
    </Pressable>
  );
};
export default ServiceItem;
