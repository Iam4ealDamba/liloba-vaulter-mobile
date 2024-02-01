// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, { useState, useEffect } from "react";
import { Link } from "expo-router";
import { Button, ImageBackground, Pressable, SafeAreaView } from "react-native";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import background from "@/assets/bg.png";
import LogoComponent from "@/components/logo";
import LinkButton from "@/components/button/LinkButton";

// ||||||||||||||||||||||||||||| Login Page Component ||||||||||||||||||||||||||||||||||||

const LoginPage = () => {
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
          <View className="h-2/3 space-y-4 py-2 bg-tw_primary">
            <View className="flex flex-col gap-y-3 py-4 px-6">
              <Text className="text-3xl font-bold text-tw_text">
                Bon retour à vous !
              </Text>
              <Text className="text-sm text-tw_accent">
                Entrez vos identifients ci-dessous !
              </Text>
            </View>
            <View className="flex flex-col gap-y-3">
              <View>
                
              </View>
              <LinkButton
                link_btn="/(auth)/login"
                text="Se Connecter"
                style="rounded-lg bg-tw_text"
                style_2="text-tw_primary font-bold"
              />
            </View>
          </View>
          <View className="absolute w-full bottom-10 flex flex-col items-center justify-center">
            <Text className="text-tw_text">Pas encore de compte ?</Text>
            <Link
              href={"/(auth)/register"}
              className="text-tw_text font-bold underline"
            >
              Inscrivez-vous
            </Link>
          </View>
        </ImageBackground>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};
export default LoginPage;
