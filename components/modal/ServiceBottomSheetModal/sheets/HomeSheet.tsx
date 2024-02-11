// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, {
  FC,
  useState,
  useEffect,
  SetStateAction,
  useRef,
  Dispatch,
} from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Clipboard from "expo-clipboard";

import { IServiceItem } from "@/utils/interfaces";
import { FontAwesome } from "@expo/vector-icons";
import ServiceItem from "@/components/items/ServiceItem";
import CustomText from "@/components/text/CustomText";
import colors from "@/utils/colors";
import { useAppDispatch, useAppSelector } from "@/store";
import ServiceQueries from "@/services/queries/services";
import { StatusCode } from "@/utils/enums";
import { RemoveServiceSlice, UpdateRefreshListSlice } from "@/store/service";
import { useRouter } from "expo-router";

// ||||||||||||||||||||||||||||| HomeSheet Component ||||||||||||||||||||||||||||||||||||

interface IHomeSheetProps {
  selected: IServiceItem;
  set_sheet_selected: Dispatch<React.SetStateAction<number>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const HomeSheet: FC<IHomeSheetProps> = ({
  selected,
  set_sheet_selected,
  setIsOpen,
}) => {
  // Redux
  const token = useAppSelector((state) => state.user.token);
  const AppDispatch = useAppDispatch();

  // Hooks
  const router = useRouter();
  const [data_list] = useState([
    {
      name: "Suprimmer le service",
      logo: "trash",
      on_pressed: () => {
        Alert.alert("Suppression", "Voulez-vous supprimer ce service ?", [
          {
            text: "Annuler",
          },
          {
            text: "Confirmer",
            onPress: async () => {
              const id_to_delete = selected?.service_id!;
              const delete_selected = await ServiceQueries.DeleteService(
                Number(token),
                selected?.service_id!
              );
              if (delete_selected?.status !== StatusCode.OK) {
                Alert.alert("Erreur", String(delete_selected?.data));
              }

              setIsOpen(false);
              AppDispatch(
                RemoveServiceSlice(
                  Number(
                    (delete_selected.data as { service_id: number }).service_id
                  )
                )
              );
              AppDispatch(UpdateRefreshListSlice(true));
              Alert.alert("Suppression", "Le service a bien été supprimé.");
            },
          },
        ]);
      },
    },
    {
      name: "Modifier le service",
      logo: "edit",
      on_pressed: () => {
        set_sheet_selected(1);
      },
    },
    {
      name: "Afficher le mot de passe",
      logo: "eye",
      on_pressed: () => {
        return Alert.alert("Mot de passe", selected?.service_password);
      },
    },
    {
      name: "Copier le mot de passe",
      logo: "paste",
      on_pressed: async () => {
        await Clipboard.setStringAsync(selected?.service_password!);
        return Alert.alert(
          "Copier effectué",
          "Le mot de passe a bien été copié !"
        );
      },
    },
  ]);

  // Return
  return (
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
          Modifié le: {selected?.updated_at || ""}
        </CustomText>
      </View>
    </View>
  );
};
export default HomeSheet;
