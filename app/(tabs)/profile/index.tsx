// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { useRouter } from "expo-router";
import React, { FC, useState, useEffect } from "react";
import { Image, Pressable, View } from "react-native";

import ProfileItem from "@/components/items/ProfileItem";
import CustomText from "@/components/text/CustomText";
import { useAppDispatch, useAppSelector } from "@/store";
import { IUserStoreModel, updateCanRefreshUserSlice } from "@/store/user";

// ||||||||||||||||||||||||||||| ProfilePage Component ||||||||||||||||||||||||||||||||||||

const AvatarPng = require("@/assets/avatar.png");

interface IProfilePageProps {}

const ProfilePage: FC<IProfilePageProps> = () => {
  // Redux
  const { data } = useAppSelector((state) => state.user);
  const { can_refresh_user } = useAppSelector((state) => state.user);
  const AppDispatch = useAppDispatch();

  // Hooks
  const [profile, setProfile] = useState<{
    username: string;
    email: string;
    img_url?: string;
  } | null>(null);
  const router = useRouter();

  // Functions
  const fetchProfile = async () => {
    if (data) {
      const empty_url = "";
      if (!data.img_url.length) {
        setProfile({ ...data, img_url: empty_url });
        return;
      }

      const response = await fetch(data.img_url)
        .then((response) => response)
        .catch((error) => {
          return null;
        });
      if (!response) {
        setProfile({ ...data, img_url: empty_url });
        return;
      }

      AppDispatch(updateCanRefreshUserSlice(false));
      setProfile(data);
    }
  };

  // Effects
  useEffect(() => {
    if (can_refresh_user) {
      fetchProfile();
    }
  }, [data, can_refresh_user]);

  // Return
  return (
    <View className="relative h-full py-6 px-6 bg-tw_bg">
      <View aria-label="Content" className="flex mt-4 space-y-10">
        <View aria-label="Top" className="w-full space-y-3">
          <View aria-label="Profile Image" className="w-48 h-48 mx-auto">
            <Image
              source={
                profile?.img_url && profile?.img_url.length
                  ? {
                      uri: profile?.img_url as string,
                    }
                  : AvatarPng || AvatarPng
              }
              className="w-full h-full rounded-md"
            />
          </View>
          <View className="flex flex-col items-center gap-y-6">
            <CustomText style_1="text-xl text-tw_text mb-2" font="SemiBold">
              {profile?.username || ""}
            </CustomText>
            <CustomText style_1="text-sm text-tw_accent" font="Regular">
              {profile?.email || ""}
            </CustomText>
            <Pressable
              className="w-[150px] h-10 flex px-4 py-2 items-center justify-center rounded-full bg-tw_secondary text-tw_primary"
              onPress={() => router.push("/(tabs)/profile/profile_modify")}
            >
              <CustomText style_1="text-sm" font="SemiBold">
                Modifier profil
              </CustomText>
            </Pressable>
          </View>
        </View>
        <View aria-label="Bottom" className="flex divide-y-2 divide-tw_text/70">
          <View>
            <ProfileItem
              title="Paramettres"
              icon="cog"
              on_pressed={() => {
                router.push("/(tabs)/profile/profile_parameters");
              }}
            />
          </View>
          <View>
            <ProfileItem
              title="Changer mot de passe"
              icon="lock"
              on_pressed={() => {
                router.push("/(tabs)/profile/password_modify");
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default ProfilePage;
