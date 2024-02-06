// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
  Text,
  View,
  TextInput,
  Alert,
  Pressable,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

import ServiceItem from "@/components/items/ServiceItem";
import CustomText from "@/components/text/CustomText";
import colors from "@/utils/colors";
import { Controller, useForm } from "react-hook-form";
import { IServiceItem } from "@/utils/interfaces";
import RegularInput from "@/components/input/RegularInput";
import RegularButton from "@/components/button/RegularButton";

// ||||||||||||||||||||||||||||| AddServiceBottomSheetModal Component ||||||||||||||||||||||||||||||||||||

interface IAddServiceBottomSheetModalProps {
  is_open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const AddServiceBottomSheetModal: FC<IAddServiceBottomSheetModalProps> = ({
  is_open,
  setIsOpen,
}) => {
  // Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IServiceItem>();

  const sheet_ref = useRef<BottomSheetModal>(null);

  // Variables
  const snap_points = ["45%"];

  // Effects
  useEffect(() => {
    if (is_open) {
      sheet_ref.current?.present();
    }
  }, [is_open]);

  // Return
  return (
    <View
      className={`top-0 left-0 w-[100vw] h-[100vh] bg-black/50 ${
        is_open ? "absolute" : "hidden"
      }`}
    >
      <BottomSheetModal
        ref={sheet_ref}
        snapPoints={snap_points}
        onDismiss={() => setIsOpen(false)}
        handleIndicatorStyle={{
          backgroundColor: colors.tw_accent,
        }}
        backgroundStyle={{
          backgroundColor: colors.tw_primary,
        }}
      >
        <BottomSheetScrollView>
          <View className={"relative h-[100vh] divide-y-2 divide-tw_text/70"}>
            <View className="px-6 py-5 space-y-6">
              <View aria-label="Top" className="flex items-center space-y-4">
                <View aria-label="Title">
                  <CustomText font="Bold" style_1="text-tw_text">
                    Ajouter un service
                  </CustomText>
                </View>
                <View
                  aria-label="Image"
                  className="w-16 h-16 rounded-md bg-tw_text"
                ></View>
              </View>
              <View aria-label="Bottom" className="space-y-6">
                <View
                  aria-label="Inputs"
                  className="flex flex-col gap-1"
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                      <RegularInput>
                        <TextInput
                          placeholder="Nom du service"
                          placeholderTextColor={colors.tw_accent}
                          value={value}
                          onChange={onChange}
                          className="w-full text-tw_text"
                        />
                      </RegularInput>
                    )}
                  />
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                      <RegularInput>
                        <TextInput
                          placeholder="Votre adresse email"
                          placeholderTextColor={colors.tw_accent}
                          value={value}
                          onChange={onChange}
                          className="w-full text-tw_text"
                        />
                      </RegularInput>
                    )}
                  />
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                      <RegularInput>
                        <TextInput
                          secureTextEntry={true}
                          placeholder="Votre mot de passe"
                          placeholderTextColor={colors.tw_accent}
                          value={value}
                          onChange={onChange}
                          className="w-full text-tw_text"
                        />
                      </RegularInput>
                    )}
                  />
                </View>
                <View aria-label="Button">
                  <RegularButton
                    text="Ajouter Service"
                    on_pressed={() => setIsOpen(true)}
                  />
                </View>
              </View>
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
};
export default AddServiceBottomSheetModal;
