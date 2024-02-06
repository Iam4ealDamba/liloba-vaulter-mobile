// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import RegularButton from "@/components/button/RegularButton";
import RegularInput from "@/components/input/RegularInput";
import colors from "@/utils/colors";
import { IProfilePasswordModify } from "@/utils/interfaces";
import React, { FC, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

// ||||||||||||||||||||||||||||| ProfileModify Component ||||||||||||||||||||||||||||||||||||

interface IProfileModifyProps {}

const PasswordModify: FC<IProfileModifyProps> = () => {
  // Hooks
  const [val, setVal] = useState();

  const { control } = useForm<IProfilePasswordModify>();

  // Effects
  useEffect(() => {
    // Enter some content here.
  }, []);

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
                  <RegularInput style="bg-tw_primary">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="Votre ancien mot de passe"
                      placeholderTextColor={colors.tw_accent}
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
                  <RegularInput style="bg-tw_primary">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="Votre nouveau mot de passe"
                      placeholderTextColor={colors.tw_accent}
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
                  <RegularInput style="bg-tw_primary">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="Confirmer le mot de passe"
                      placeholderTextColor={colors.tw_accent}
                      className="w-full text-tw_text"
                    />
                  </RegularInput>
                )}
              />
            </View>
          </View>
          <View aria-label="Buttons" className="w-full">
            <RegularButton style="w-full" text="Modifier Mot de Passe" />
          </View>
        </View>
      </View>
    </View>
  );
};
export default PasswordModify;
