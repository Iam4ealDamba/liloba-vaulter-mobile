// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, { useEffect } from "react";
import { Link } from "expo-router";
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  TextInput,
} from "react-native";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import background from "@/assets/bg.png";
import colors from "@/utils/colors";
import LogoComponent from "@/components/logo";
import LinkButton from "@/components/button/LinkButton";
import CustomText from "@/components/text/CustomText";
import { FontAwesome6 } from "@expo/vector-icons";
import RegularInput from "@/components/input/RegularInput";

// ||||||||||||||||||||||||||||| Login Page Component ||||||||||||||||||||||||||||||||||||

interface ILoginPageInput {
  email: string;
  password: string;
}

const LoginPage = () => {
  // Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginPageInput>();

  // Functions
  const handleOnSubmit: SubmitHandler<ILoginPageInput> = (data) => {
    console.log(data);
  };

  // Effects
  useEffect(() => {
    // Enter some content here.
  }, []);

  // Return
  return (
    <SafeAreaView className="text-tw_text">
      <View className="relative text-tw_text">
        <ImageBackground
          source={background}
          resizeMode="cover"
          className="h-full flex"
        >
          <View aria-label="Gradiant Filter" className="flex-1">
            <LinearGradient
              colors={[
                "#20355410",
                "#20355420",
                "#20355440",
                "#20355490",
                "#203554",
              ]}
              className="h-full"
            />
          </View>
          <View
            aria-label="Content"
            className="h-2/3 space-y-2 py-2 px-6 bg-tw_primary"
          >
            <View className="flex flex-col gap-y-3 py-4">
              <CustomText style_1="text-2xl text-tw_text" font="Bold">
                Bon retour parmis nous !
              </CustomText>
              <CustomText style_1="text-sm text-tw_accent" font="Regular">
                Entrez vos identifients ci-dessous !
              </CustomText>
            </View>
            <View aria-label="Form" className="space-y-10">
              <View className="space-y-3" aria-label="Inputs">
                <View aria-label="Input" className=" flex space-y-3">
                  <CustomText style_1="text-tw_text mb-3" font="Regular">
                    Adresse Email
                  </CustomText>
                  <RegularInput>
                    <FontAwesome6
                      name="envelope"
                      size={20}
                      color={colors.tw_text}
                    />
                    <Controller
                      name="email"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          placeholder="Entrer adresse email"
                          placeholderTextColor={colors.tw_text + "80"}
                          className="ml-3 placeholder-tw_text"
                          value={value}
                          onChangeText={onChange}
                        />
                      )}
                    />
                  </RegularInput>
                  <CustomText style_1="text-error" font="Regular">
                    {errors.email
                      ? "Erreur: Veuillez entrer votre adresse email."
                      : ""}
                    "Erreur: Veuillez entrer votre adresse email."
                  </CustomText>
                </View>
                <View aria-label="Input" className=" flex space-y-3">
                  <CustomText style_1="text-tw_text mb-3" font="Regular">
                    Mot de passe
                  </CustomText>
                  <RegularInput>
                    <FontAwesome6 name="key" size={20} color={colors.tw_text} />
                    <Controller
                      name="password"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          placeholder="Entrer adresse email"
                          placeholderTextColor={colors.tw_text + "80"}
                          className="ml-3 placeholder-tw_text"
                          value={value}
                          onChangeText={onChange}
                        />
                      )}
                    />
                  </RegularInput>
                  <CustomText style_1="text-error" font="Regular">
                    {errors.email
                      ? "Erreur: Veuillez entrer votre adresse email."
                      : ""}
                    "Erreur: Veuillez entrer votre adresse email."
                  </CustomText>
                </View>
              </View>
              <View aria-label="Button" className="flex space-y-3">
                <View className="flex ">
                  <LinkButton
                    link_btn="/(auth)/login"
                    text="Se Connecter"
                    style="rounded-lg bg-tw_text"
                    style_2="text-tw_primary font-bold"
                  />
                </View>
              </View>
            </View>
            <View aria-label="Footer Link" className="w-full pt-28">
              <CustomText style_1="text-tw_text text-center" font="Regular">
                Pas encore de compte ?
              </CustomText>
              <Link href={"/(auth)/register"} className="" asChild>
                <Pressable>
                  <CustomText
                    style_1="text-tw_text underline text-center"
                    font="Bold"
                  >
                    Inscrivez-vous ici
                  </CustomText>
                </Pressable>
              </Link>
            </View>
          </View>
        </ImageBackground>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};
export default LoginPage;
