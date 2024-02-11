// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
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
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import {
  IServiceFormCreate,
  IServiceItem,
  IServiceModelCreate,
} from "@/utils/interfaces";
import RegularInput from "@/components/input/RegularInput";
import RegularButton from "@/components/button/RegularButton";
import { ZodServiceCreate } from "@/services/types";
import { useCustomToast } from "@/hooks/CustomToast";
import ServiceQueries from "@/services/queries/services";
import { useAppDispatch, useAppSelector } from "@/store";
import { StatusCode } from "@/utils/enums";
import { useDispatch } from "react-redux";
import { AddServiceSlice, UpdateRefreshListSlice } from "@/store/service";
import { useRouter } from "expo-router";

// ||||||||||||||||||||||||||||| AddServiceBottomSheetModal Component ||||||||||||||||||||||||||||||||||||

interface IAddServiceBottomSheetModalProps {
  is_open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const AddServiceBottomSheetModal: FC<IAddServiceBottomSheetModalProps> = ({
  is_open,
  setIsOpen,
}) => {
  // Redux
  const token = useAppSelector((state) => state.user.token);
  const AppDispatch = useAppDispatch();

  // Hooks
  const [error_value, setErrorValue] = React.useState<{
    selected: string;
    msg: string;
  } | null>(null);
  const sheet_ref = useRef<BottomSheetModal>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IServiceFormCreate>({
    defaultValues: {
      service_name: "",
      service_email: "",
      service_password: "",
      service_img_url: "",
    },
  });
  const router = useRouter();

  // Variables
  const snap_points = ["53%"];

  // Functions
  const handleSave: SubmitHandler<IServiceFormCreate> = async ({
    service_name,
    service_email,
    service_password,
    service_img_url,
  }) => {
    let verify_fields = await ZodServiceCreate.safeParseAsync({
      service_name,
      service_email,
      service_password,
    });
    if (!verify_fields.success) {
      setErrorValue({
        selected: verify_fields.error.errors[0].path[0] as string,
        msg: verify_fields.error.errors[0].message,
      });
      return;
    }

    const email = service_email
      .split("")
      .map((char) => {
        if (/[a-zA-Z]/g.test(char)) {
          return char.toLowerCase();
        }
        return char;
      })
      .join("");

    const new_service = await ServiceQueries.CreateService(
      Number(token!),
      service_name,
      email,
      service_password,
      undefined
    );
    if (new_service.status !== StatusCode.Created) {
      setErrorValue({
        selected: "",
        msg: "Erreur: service non crée.",
      });
      return;
    }

    AppDispatch(AddServiceSlice(new_service.data as IServiceItem));
    AppDispatch(UpdateRefreshListSlice(true));
    setIsOpen(false);
  };

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
          <View className={"relative divide-y-2 divide-tw_text/70"}>
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
                  <View>
                    <Controller
                      control={control}
                      name="service_name"
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <RegularInput
                          style={`${
                            (!value.length && "border-2 border-error") ||
                            (error_value?.selected === "service_name" &&
                              "border-2 border-error") ||
                            ""
                          }`}
                        >
                          <TextInput
                            placeholder="Nom du service"
                            placeholderTextColor={colors.tw_accent}
                            value={value}
                            onChangeText={onChange}
                            className="w-full text-tw_text"
                          />
                        </RegularInput>
                      )}
                    />
                  </View>
                  <View>
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      name="service_email"
                      render={({ field: { onChange, value } }) => (
                        <RegularInput
                          style={`${
                            (!value.length && "border-2 border-error") ||
                            (error_value?.selected === "service_email" &&
                              "border-2 border-error") ||
                            ""
                          }`}
                        >
                          <TextInput
                            placeholder="Votre adresse email"
                            placeholderTextColor={colors.tw_accent}
                            value={value}
                            onChangeText={onChange}
                            className="w-full text-tw_text"
                          />
                        </RegularInput>
                      )}
                    />
                  </View>
                  <View>
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      name="service_password"
                      render={({ field: { onChange, value } }) => (
                        <RegularInput
                          style={`${
                            (!value.length && "border-2 border-error") ||
                            (error_value?.selected === "service_password" &&
                              "border-2 border-error") ||
                            ""
                          }`}
                        >
                          <TextInput
                            secureTextEntry={true}
                            placeholder="Votre mot de passe"
                            placeholderTextColor={colors.tw_accent}
                            value={value}
                            onChangeText={onChange}
                            className="w-full text-tw_text"
                          />
                        </RegularInput>
                      )}
                    />
                  </View>
                </View>
                <CustomText style_1="text-error text-sm" font="SemiBold">
                  {error_value?.msg || ""}
                </CustomText>
                <View aria-label="Button">
                  <RegularButton
                    text="Ajouter Service"
                    on_pressed={handleSubmit(handleSave)}
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
