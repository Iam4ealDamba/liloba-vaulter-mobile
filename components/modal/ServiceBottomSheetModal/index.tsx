// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, {
  FC,
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import {
  Text,
  View,
  TextInput,
  Alert,
  Button,
  Pressable,
  ScrollView,
  SectionList,
} from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

import { IServiceItem } from "@/utils/interfaces";
import ServiceItem from "@/components/items/ServiceItem";
import CustomText from "@/components/text/CustomText";
import colors from "@/utils/colors";
import { SafeAreaView } from "react-native-safe-area-context";

// ||||||||||||||||||||||||||||| Service Bottom Sheet Modal Component ||||||||||||||||||||||||||||||||||||

interface IServiceBottomSheetModalProps {
  is_open?: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selected: IServiceItem | null;
  set_selected_modify: Dispatch<SetStateAction<IServiceItem | null>>;
}

const ServiceBottomSheetModal: FC<IServiceBottomSheetModalProps> = ({
  is_open = false,
  setIsOpen,
  selected,
  set_selected_modify,
}) => {
  const searchbar_ref = useRef<TextInput>(null);
  const sheet_ref = useRef<BottomSheetModal>(null);

  // Variables
  const snap_points = ["43%"];
  const data_list = [
    {
      name: "Suprimmer le service",
      logo: "trash",
      on_pressed: () => {
        setIsOpen(false);
        return Alert.alert("Suppression", "Service supprimé !");
      },
    },
    {
      name: "Modifier le service",
      logo: "edit",
      on_pressed: () => {
        set_selected_modify(selected);
        setIsOpen(false);
      },
    },
    {
      name: "Afficher le mot de passe",
      logo: "eye",
      on_pressed: () => {
        return Alert.alert("Mot de passe", selected?.password);
      },
    },
    {
      name: "Copier le mot de passe",
      logo: "paste",
      on_pressed: async () => {
        await Clipboard.setStringAsync(selected?.password!);
        return Alert.alert(
          "Copier effectué",
          "Le mot de passe a bien été copié !"
        );
      },
    },
  ];

  // Effects
  useEffect(() => {
    if (is_open) {
      sheet_ref.current?.present();
    } else {
      sheet_ref.current?.dismiss();
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
            <View className="px-6 py-2">
              <ServiceItem data={selected} />
            </View>
            <View className="px-6 py-2">
              <ScrollView>
                {data_list.map((item, index) => {
                  return (
                    <Pressable
                      key={item.name}
                      className="flex flex-row gap-x-3 py-3"
                      onPress={item.on_pressed}
                    >
                      <View className="w-5">
                        <FontAwesome
                          name={item.logo}
                          size={20}
                          color={colors.tw_text}
                        />
                      </View>
                      <Text className="text-tw_text">{item.name}</Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
              <CustomText
                style_1="absolute -bottom-8 left-6 text-sm text-tw_accent"
                font="Regular"
              >
                Modifié le : 12/12/2022 à 12:00
              </CustomText>
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
};
export default ServiceBottomSheetModal;
