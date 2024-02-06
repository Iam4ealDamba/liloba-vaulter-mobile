// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, { useState, useEffect } from "react";
import { Link } from "expo-router";
import { Button, ImageBackground, Pressable, SafeAreaView } from "react-native";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import background from "@/assets/bg.png";
import LogoComponent from "@/components/logo";
import LinkButton from "@/components/button/LinkButton";
import CustomText from "@/components/text/CustomText";

// ||||||||||||||||||||||||||||| Login Page Component ||||||||||||||||||||||||||||||||||||

const AuthIndexPage = () => {
  // Hooks
  const [val, setVal] = useState();

  // Effects
  useEffect(() => {
    // Enter some content here.
  }, []);

  // Return
  return (
    <SafeAreaView>
      <View className="relative">
        <ImageBackground
          source={background}
          resizeMode="cover"
          className="h-full flex"
        >
          <View className="flex-1">
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
          <View className="h-[370px] py-2 space-y-4 bg-tw_primary">
            <View className="space-y-3 py-4">
              <LogoComponent />
              <View>
                <CustomText
                  style_1="w-[300px] mx-auto text-sm text-center text-tw_accent"
                  font="SemiBold"
                >
                  L’application qui garde vos mot de passes en sécurité
                </CustomText>
              </View>
            </View>
            <View className="flex ">
              <LinkButton
                link_btn="/(auth)/login"
                text="Se Connecter"
                style="rounded-lg bg-tw_text"
                style_2="text-tw_primary font-bold"
              />
            </View>
          </View>
          <View className="absolute w-full bottom-10 flex flex-col items-center justify-center">
            <CustomText style_1="text-tw_text" font="Regular">
              Pas encore de compte ?
            </CustomText>
            <Link href={"/(auth)/register"} asChild>
              <Pressable>
                <CustomText style_1="text-tw_text underline" font="SemiBold">
                  Inscrivez-vous ici
                </CustomText>
              </Pressable>
            </Link>
          </View>
        </ImageBackground>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};
export default AuthIndexPage;
