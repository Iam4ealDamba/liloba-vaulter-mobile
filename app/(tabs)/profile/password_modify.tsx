// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import RegularButton from "@/components/button/RegularButton";
import RegularInput from "@/components/input/RegularInput";
import CustomText from "@/components/text/CustomText";
import { useCustomToast } from "@/hooks/CustomToast";
import UserQueries from "@/services/queries/users";
import { ZodProfileModify, ZodProfilePasswordModify } from "@/services/types";
import colors from "@/utils/colors";
import { StatusCode } from "@/utils/enums";
import { IProfilePasswordModify } from "@/utils/interfaces";
import { useRouter } from "expo-router";
import React, { FC, useState, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Pressable, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

// ||||||||||||||||||||||||||||| ProfileModify Component ||||||||||||||||||||||||||||||||||||

interface IProfileModifyProps {}

const PasswordModify: FC<IProfileModifyProps> = () => {
  // Hooks
  const [field_error, setField_error] = React.useState<{
    selector: string;
    msg: string;
  } | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfilePasswordModify>({
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });
  const router = useRouter();

  // Functions
  const handleSubmitForm: SubmitHandler<IProfilePasswordModify> = async ({
    old_password,
    new_password,
    confirm_password,
  }) => {
    const verify_form = ZodProfilePasswordModify.safeParse({
      old_password,
      new_password,
      confirm_password,
    });
    if (!verify_form.success) {
      setField_error({
        selector: verify_form.error.errors[0].path[0].toString(),
        msg: verify_form.error.errors[0].message,
      });
      return;
    }

    if (new_password !== confirm_password) {
      setField_error({
        selector: "confirm_password",
        msg: "Les mots de passe ne sont pas identiques.",
      });
      return;
    }

    const modify = await UserQueries.UserUpdatePassword(
      old_password,
      new_password
    );
    if (modify.status !== StatusCode.OK) {
      useCustomToast({
        type: "error",
        header: "Modification Profile",
        body: `${modify.data}`,
      });
      return;
    }

    useCustomToast({
      type: "success",
      header: "Modification Profile",
      body: "Succès: Le profile a été modifié.",
    });
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(router.back());
      }, 1000);
    });
  };

  // Return
  return (
    <View className="relative h-full py-6 px-6 bg-tw_bg">
      <View aria-label="Content" className="flex mt-4 space-y-10">
        <View aria-label="Bottom" className="w-full space-y-10">
          <View aria-label="Inputs" className="space-y-6">
            <View aria-label="Input Field">
              <Controller
                control={control}
                name="old_password"
                render={({ field: { value, onChange } }) => (
                  <RegularInput
                    style={`bg-tw_primary ${
                      field_error?.selector == "old_password"
                        ? "border-2 border-error"
                        : ""
                    }`}
                  >
                    <TextInput
                      placeholder="Votre ancien mot de passe"
                      placeholderTextColor={colors.tw_accent}
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry
                      className="w-full text-tw_text"
                    />
                  </RegularInput>
                )}
              />
            </View>
            <View aria-label="Input Field">
              <Controller
                control={control}
                name="new_password"
                render={({ field: { value, onChange } }) => (
                  <RegularInput
                    style={`bg-tw_primary ${
                      field_error?.selector == "new_password"
                        ? "border-2 border-error"
                        : ""
                    }`}
                  >
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="Votre nouveau mot de passe"
                      placeholderTextColor={colors.tw_accent}
                      secureTextEntry
                      className="w-full text-tw_text"
                    />
                  </RegularInput>
                )}
              />
            </View>
            <View aria-label="Input Field">
              <Controller
                control={control}
                name="confirm_password"
                render={({ field: { value, onChange } }) => (
                  <RegularInput
                    style={`bg-tw_primary ${
                      field_error?.selector == "confirm_password"
                        ? "border-2 border-error"
                        : ""
                    }`}
                  >
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="Confirmer le mot de passe"
                      placeholderTextColor={colors.tw_accent}
                      secureTextEntry
                      className="w-full text-tw_text"
                    />
                  </RegularInput>
                )}
              />
            </View>
          </View>
          <View className="space-y-3">
            <View>
              <CustomText font="SemiBold" style_1="text-sm text-error">
                {field_error?.msg || ""}
              </CustomText>
            </View>
            <TouchableOpacity
              aria-label="Buttons"
              activeOpacity={0.8}
              className="w-full"
            >
              <RegularButton
                style={`w-full`}
                text="Modifier Mot de Passe"
                on_pressed={handleSubmit(handleSubmitForm)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default PasswordModify;
