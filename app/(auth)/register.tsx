// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
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

import colors from "@/utils/colors";
import LogoComponent from "@/components/logo";
import LinkButton from "@/components/button/LinkButton";
import CustomText from "@/components/text/CustomText";
import { FontAwesome6 } from "@expo/vector-icons";
import RegularInput from "@/components/input/RegularInput";
import RegularButton from "@/components/button/RegularButton";
import { useCustomToast } from "@/hooks/CustomToast";
import IconButton from "@/components/button/IconButton";
import { ZodUserRegister } from "@/services/types";
import UserQueries from "@/services/queries/users";
import { StatusCode } from "@/utils/enums";
import { useAppDispatch } from "@/store";
import { GetTokenSlice, IUserStoreModel, loginSlice } from "@/store/user";
import { IUserModel } from "@/utils/interfaces";

// ||||||||||||||||||||||||||||| Register Page Component ||||||||||||||||||||||||||||||||||||

interface IRegisterPageInput {
  username: string;
  email: string;
  password: string;
}

const background = require("@/assets/bg.png");

const RegisterPage = () => {
  // Redux
  const AppDispatch = useAppDispatch();

  // Hooks
  const [field_error, setField_error] = React.useState<{
    selector: string;
    msg: string;
  } | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterPageInput>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  // Functions
  const handleReturnLink = () => {
    router.replace("/(auth)");
  };
  const handleFormSubmit: SubmitHandler<IRegisterPageInput> = async ({
    username,
    email,
    password,
  }) => {
    const verify_form = ZodUserRegister.safeParse({
      username,
      email,
      password,
    });
    if (!verify_form.success) {
      setField_error({
        selector: verify_form.error.errors[0].path[0].toString(),
        msg: verify_form.error.errors[0].message,
      });

      useCustomToast({
        type: "error",
        header: `Formulaire invalide`,
        body: verify_form.error.errors[0].message,
      });

      return;
    }

    const register = await UserQueries.UserRegister(
      username,
      email.toLowerCase(),
      password
    );
    if (register.status !== StatusCode.Created) {
      useCustomToast({
        type: "error",
        header: `Inscription échouée`,
        body: register.data as string,
      });
      return;
    }

    AppDispatch(
      GetTokenSlice((register.data as IUserModel).user_id!.toString())
    );
    AppDispatch(loginSlice(register.data as IUserStoreModel));

    useCustomToast({
      type: "success",
      header: `Inscription reussie`,
      body: "Vous allez être redirigés...",
    });

    new Promise((resolve) => {
      setTimeout(() => {
        resolve(router.replace("/(tabs)"));
      }, 1000);
    });
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
            className="h-3/4 space-y-4 py-2 px-6 bg-tw_primary"
          >
            <View className="flex flex-col py-4">
              <Pressable
                onPress={handleReturnLink}
                className="flex flex-row pb-4 items-center"
              >
                <View>
                  <IconButton
                    style="w-8 h-8 bg-tw_secondary"
                    on_pressed={handleReturnLink}
                  >
                    <FontAwesome6
                      name="arrow-left"
                      size={20}
                      color={colors.tw_primary}
                    />
                  </IconButton>
                </View>
                <CustomText
                  style_1="text-lg underline text-tw_text ml-4"
                  font="Bold"
                >
                  Retour en arrière
                </CustomText>
              </Pressable>
              <CustomText style_1="text-2xl text-tw_text" font="Bold">
                Bienvenue sur Liloba Vaulter !
              </CustomText>
              <CustomText style_1="text-sm text-tw_accent" font="Regular">
                Vos futures mot de passe sont à l’abris ici
              </CustomText>
            </View>
            <View aria-label="Form" className="space-y-6">
              <View className="flex gap-y-3" aria-label="Inputs">
                <View aria-label="Input" className=" flex space-y-3">
                  <CustomText style_1="text-tw_text mb-3" font="Regular">
                    Nom D&apos;utilisateur
                  </CustomText>
                  <RegularInput>
                    <FontAwesome6
                      name="envelope"
                      size={20}
                      color={colors.tw_text}
                    />
                    <Controller
                      name="username"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          placeholder="Entrer un nom d'utilisateur"
                          placeholderTextColor={colors.tw_text + "80"}
                          className="w-full ml-3 placeholder-tw_text text-tw_text "
                          value={value}
                          onChangeText={onChange}
                        />
                      )}
                    />
                  </RegularInput>
                  <CustomText style_1="text-error" font="Regular">
                    {(errors.username && "Erreur: Champ invalide") ||
                      (field_error?.selector == "username" &&
                        field_error.msg) ||
                      ""}
                  </CustomText>
                </View>
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
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          placeholder="Entrer une adresse email"
                          placeholderTextColor={colors.tw_text + "80"}
                          className="w-full ml-3 placeholder-tw_text text-tw_text "
                          value={value}
                          onChangeText={onChange}
                        />
                      )}
                    />
                  </RegularInput>
                  <CustomText style_1="text-error" font="Regular">
                    {(errors.email && "Erreur: Champ invalide") ||
                      (field_error?.selector == "email" && field_error.msg) ||
                      ""}
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
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          placeholder="Entrer un mot de passe"
                          placeholderTextColor={colors.tw_text + "80"}
                          value={value}
                          onChangeText={onChange}
                          secureTextEntry
                          className="w-full ml-3 placeholder-tw_text text-tw_text "
                        />
                      )}
                    />
                  </RegularInput>
                  <CustomText style_1="text-error" font="Regular">
                    {(errors.password && "Erreur: Champ invalide") ||
                      (field_error?.selector == "password" &&
                        field_error.msg) ||
                      ""}
                  </CustomText>
                </View>
              </View>
              <View aria-label="Button" className="flex space-y-3">
                <View className="flex ">
                  <RegularButton
                    text="S'inscrire Maintenant"
                    style="rounded-lg bg-tw_text"
                    style_2="text-tw_primary font-bold"
                    on_pressed={handleSubmit(handleFormSubmit)}
                  />
                </View>
              </View>
            </View>
            <View aria-label="Footer Link" className="w-full pt-8">
              <CustomText style_1="text-tw_text text-center" font="Regular">
                Déjà inscrit ?
              </CustomText>
              <Link href={"/(auth)/login"} className="" asChild>
                <Pressable>
                  <CustomText
                    style_1="text-tw_text underline text-center"
                    font="Bold"
                  >
                    Connectez-vous ici
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
export default RegisterPage;
