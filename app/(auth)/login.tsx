// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, { useEffect } from "react";
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
import { FontAwesome6 } from "@expo/vector-icons";

import { StatusCode } from "@/utils/enums";
import { useCustomToast } from "@/hooks/CustomToast";
import { ZodUserLogin } from "@/services/types";
import colors from "@/utils/colors";
import LogoComponent from "@/components/logo";
import LinkButton from "@/components/button/LinkButton";
import CustomText from "@/components/text/CustomText";
import RegularInput from "@/components/input/RegularInput";
import IconButton from "@/components/button/IconButton";
import RegularButton from "@/components/button/RegularButton";
import UserQueries from "@/services/queries/users";
import { useAppDispatch } from "@/store";
import { GetTokenSlice, IUserStoreModel, loginSlice } from "@/store/user";
import { IUserModel } from "@/utils/interfaces";
import ServiceQueries from "@/services/queries/services";
import { FetchServiceListSlice } from "@/store/service";

// ||||||||||||||||||||||||||||| Login Page Component ||||||||||||||||||||||||||||||||||||

interface ILoginPageInput {
  email: string;
  password: string;
}

const background = require("@/assets/bg.png");

const LoginPage = () => {
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
  } = useForm<ILoginPageInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  // Functions
  const handleReturnLink = () => {
    router.replace("/(auth)");
  };
  const onFormSubmit: SubmitHandler<ILoginPageInput> = async ({
    email,
    password,
  }) => {
    const verify_form = ZodUserLogin.safeParse({
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

    const login = await UserQueries.UserLogin(email.toLowerCase(), password);
    if (login.status !== StatusCode.OK) {
      useCustomToast({
        type: "error",
        header: `Requête échouée (${login.status})`,
        body: login.data as string,
      });
      return;
    }

    let current_services = await ServiceQueries.GetServices(
      Number((login.data as IUserModel).user_id!)
    );
    AppDispatch(GetTokenSlice((login.data as IUserModel).user_id!.toString()));
    AppDispatch(loginSlice(login.data as IUserStoreModel));
    AppDispatch(FetchServiceListSlice(current_services));

    useCustomToast({
      type: "success",
      header: `Connexion reussie`,
      body: "Vous allez être redirigés...",
    });

    new Promise((resolve) => {
      setTimeout(() => {
        resolve(router.replace("/(tabs)"));
      }, 1000);
    });
  };

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
            className="h-2/3 space-y-4 py-2 px-6 bg-tw_primary"
          >
            <View className="flex flex-col py-3">
              <Pressable
                onPress={handleReturnLink}
                className="flex flex-row space-x-4 pb-4 items-center"
              >
                <View>
                  <IconButton
                    style="w-8 h-8 bg-tw_secondary"
                    on_pressed={handleReturnLink}
                  >
                    <FontAwesome6
                      name="arrow-left"
                      size={16}
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
                Bon retour parmis nous !
              </CustomText>
              <CustomText style_1="text-sm text-tw_accent" font="Regular">
                Entrez vos identifients ci-dessous !
              </CustomText>
            </View>
            <View aria-label="Form" className="space-y-6">
              <View className="flex gap-y-3" aria-label="Inputs">
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
                          placeholder="Entrer votre adresse email"
                          placeholderTextColor={colors.tw_text + "80"}
                          className="w-full ml-3 placeholder-tw_text text-tw_text"
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
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          placeholder="Entrer votre mot de passe"
                          placeholderTextColor={colors.tw_text + "80"}
                          className="w-full ml-3 placeholder-tw_text text-tw_text"
                          value={value}
                          onChangeText={onChange}
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
                    text="Se Connecter"
                    style="rounded-lg bg-tw_text"
                    style_2="text-tw_primary font-bold"
                    on_pressed={handleSubmit(onFormSubmit)}
                  />
                </View>
              </View>
            </View>
            <View aria-label="Footer Link" className="w-full pt-10">
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
