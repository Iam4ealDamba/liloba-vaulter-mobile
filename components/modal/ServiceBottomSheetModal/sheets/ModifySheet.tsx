// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import RegularButton from "@/components/button/RegularButton";
import RegularInput from "@/components/input/RegularInput";
import CustomText from "@/components/text/CustomText";
import { useCustomToast } from "@/hooks/CustomToast";
import ServiceQueries from "@/services/queries/services";
import { ZodServiceCreate } from "@/services/types";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  FetchServiceListSlice,
  UpdateRefreshListSlice,
  UpdateServiceSlice,
} from "@/store/service";
import colors from "@/utils/colors";
import { StatusCode } from "@/utils/enums";
import {
  IServiceFormCreate,
  IServiceItem,
  IServiceModelCreate,
} from "@/utils/interfaces";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import React, {
  FC,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

// ||||||||||||||||||||||||||||| ModifySheet Component ||||||||||||||||||||||||||||||||||||

interface IModifySheetProps {
  selected: IServiceItem;
  set_is_open: Dispatch<SetStateAction<boolean>>;
  set_sheet_selected: Dispatch<SetStateAction<number>>;
}

const ModifySheet: FC<IModifySheetProps> = ({
  selected,
  set_is_open,
  set_sheet_selected,
}) => {
  // Redux
  const AppDispatch = useAppDispatch();

  // Hooks
  const [error_value, setErrorValue] = React.useState<{
    selected: string;
    msg: string;
  } | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IServiceFormCreate>({
    defaultValues: {
      service_name: selected.service_name,
      service_email: selected.service_email,
      service_password: selected.service_password,
      service_img_url: selected.service_img_url,
    },
  });

  // Functions
  const handleUpdate: SubmitHandler<IServiceFormCreate> = async ({
    service_name,
    service_email,
    service_password,
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

    const updated_service = await ServiceQueries.UpdateService(
      Number(selected.service_id),
      service_name,
      service_email.toLowerCase(),
      service_password,
      undefined
    );
    if (updated_service.status !== StatusCode.Created) {
      setErrorValue({
        selected: "",
        msg: "Erreur: le service n'a pas pu être mis à jour.",
      });
    }

    AppDispatch(UpdateServiceSlice(updated_service.data as IServiceItem));
    AppDispatch(UpdateRefreshListSlice(true));
    set_is_open(false);
  };

  // Return
  return (
    <View>
      <View className="px-6 py-5 space-y-6">
        <View aria-label="Top" className="flex items-center space-y-4">
          <View aria-label="Title">
            <CustomText font="Bold" style_1="text-tw_text">
              Modifier un service
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
                render={({ field: { onChange, value } }) => {
                  return (
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
                        onChange={onChange}
                        className="w-full text-tw_text"
                      />
                    </RegularInput>
                  );
                }}
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
              text="Modifier Service"
              on_pressed={handleSubmit(handleUpdate)}
            />
          </View>
        </View>
      </View>
      <View className="absolute top-5 left-6 ">
        <Pressable onPress={() => set_sheet_selected(0)}>
          <FontAwesome name="chevron-left" size={24} color={colors.tw_accent} />
        </Pressable>
      </View>
    </View>
  );
};
export default ModifySheet;
