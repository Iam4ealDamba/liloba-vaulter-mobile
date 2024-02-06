// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import IconButton from "@/components/button/IconButton";
import colors from "@/utils/colors";
import { FontAwesome } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { FC, useState, useEffect } from "react";
import { Alert, Text, View } from "react-native";

// ||||||||||||||||||||||||||||| ProfileLayout Component ||||||||||||||||||||||||||||||||||||

interface IProfileLayoutProps {}

const ProfileLayout: FC<IProfileLayoutProps> = () => {
  // Hooks
  const [val, setVal] = useState();
  const router = useRouter();

  // Functions
  const handleLogout = () => {
    router.push("/(auth)");
  };

  // Effects
  useEffect(() => {
    // Enter some content here.
  }, []);

  // Return
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerRight(props) {
            return (
              <IconButton
                style="bg-tw_secondary my-4"
                on_pressed={() => {
                  Alert.alert(
                    "Deconnexion",
                    "Etes-vous sur de vouloir vous deconnecter ?",
                    [
                      {
                        text: "Annuler",
                      },
                      {
                        text: "Deconnexion",
                        onPress: handleLogout,
                      },
                    ]
                  );
                }}
              >
                <FontAwesome
                  name="sign-out"
                  size={22}
                  color={colors.tw_primary}
                />
              </IconButton>
            );
          },
          headerStyle: {
            backgroundColor: colors.tw_bg,
          },
        }}
      />
      <Stack.Screen
        name="profile_modify"
        options={{
          title: "Modifier Profile",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: colors.tw_text,
          },
          headerStyle: {
            backgroundColor: colors.tw_bg,
          },
          headerTintColor: colors.tw_text,
        }}
      />
      <Stack.Screen
        name="password_modify"
        options={{
          title: "Modifier Mot de Passe",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: colors.tw_text,
          },
          headerStyle: {
            backgroundColor: colors.tw_bg,
          },
          headerTintColor: colors.tw_text,
        }}
      />
      <Stack.Screen
        name="profile_parameters"
        options={{
          title: "Paramettres Profil",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: colors.tw_text,
          },
          headerStyle: {
            backgroundColor: colors.tw_bg,
          },
          headerTintColor: colors.tw_text,
        }}
      />
    </Stack>
  );
};
export default ProfileLayout;
