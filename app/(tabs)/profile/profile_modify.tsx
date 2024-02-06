// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, { FC, useState, useEffect } from "react";
import { Alert, Image } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import FileSystem from "expo-file-system";

import * as ImagePicker from "expo-image-picker";
import IconButton from "@/components/button/IconButton";
import CustomText from "@/components/text/CustomText";
import colors from "@/utils/colors";
import { IProfileModify } from "@/utils/interfaces";
import RegularInput from "@/components/input/RegularInput";
import RegularButton from "@/components/button/RegularButton";

// ||||||||||||||||||||||||||||| ProfileModify Component ||||||||||||||||||||||||||||||||||||

const AvatarPng = require("@/assets/avatar.png");

interface IProfileModifyProps {}

const ProfileModify: FC<IProfileModifyProps> = () => {
  // Hooks
  const [show_image_modal, setShowImageModal] = useState(false);
  const [avatar_image, setAvatarImage] = useState<string>("");
  const [image_loading, setImageLoading] = useState(true);

  const { control } = useForm<IProfileModify>();

  const {} = useForm();

  // Functionss
  const handleUploadImage = async (mode: "camera" | "gallery") => {
    try {
      let result: ImagePicker.ImagePickerResult;

      if (mode === "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

        if (!result.canceled) {
          // Save Image
          await saveImage(result.assets[0].uri);
        }
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

        if (!result.canceled) {
          // Save Image
          await saveImage(result.assets[0].uri);
          console.log(result.assets[0].uri);
        }
      }
    } catch (error: any) {
      Alert.alert("Erreur Image Photo", error.message);
      setShowImageModal(false);
    }
  };
  const handleRemoveImage = () => {
    try {
      saveImage("");
    } catch ({ message }: any) {
      Alert.alert("Erreur: Suppression Image", message);
    }
  };
  const downloadImage = async (uri: string) => {
    let img = await fetch(uri)
      .then((response) => response)
      .catch((error) => null);

    if (img) {
      console.log(img);
      return uri;
    } else {
      return "";
    }

    // const filename = FileSystem.documentDirectory + "images/profile/avatar.jpg";
    // await FileSystem.copyAsync({ from: uri, to: filename });
  };
  const saveImage = async (image: string) => {
    try {
      const get_img = await downloadImage(image);
      setAvatarImage(get_img);
      setShowImageModal(false);
    } catch (error) {
      throw error;
    }
  };

  // Effects
  useEffect(() => {
    // Enter some content here.
  }, []);

  // Return
  return (
    <View className="relative h-full py-6 px-6 bg-tw_bg">
      <View aria-label="Content" className="flex mt-4 space-y-10">
        <View aria-label="Top" className="w-full space-y-3">
          <View
            aria-label="Profile Image"
            className="relative w-48 h-48 mx-auto"
          >
            <Image
              source={avatar_image.length ? { uri: avatar_image } : AvatarPng}
              className="w-full h-full rounded-3xl"
            />
            <TouchableOpacity
              onPress={() => setShowImageModal(true)}
              className="absolute bottom-0 right-0 w-10 h-10 flex items-center justify-center rounded-xl rounded-bl-none rounded-tr-none bg-tw_secondary"
            >
              <FontAwesome name="camera" size={22} color={colors.tw_primary} />
            </TouchableOpacity>
          </View>
        </View>
        <View aria-label="Bottom" className="w-full space-y-10">
          <View aria-label="Inputs" className="space-y-6">
            <View aria-label="Input Field">
              <Controller
                control={control}
                name="username"
                render={({ field: { value, onChange } }) => (
                  <RegularInput style="bg-tw_primary">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="Votre nom d'utilisateur"
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
                name="email"
                render={({ field: { value, onChange } }) => (
                  <RegularInput style="bg-tw_primary">
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="Votre adresse email"
                      placeholderTextColor={colors.tw_accent}
                      className="w-full text-tw_text"
                    />
                  </RegularInput>
                )}
              />
            </View>
          </View>
          <View aria-label="Buttons" className="w-full">
            <RegularButton style="w-full" text="Modifier Profile" />
          </View>
        </View>
      </View>
      <Pressable
        aria-label="Image Modal"
        onPress={() => setShowImageModal(false)}
        className={`top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center bg-black/50 ${
          show_image_modal ? "absolute" : "hidden"
        }`}
      >
        <View className="w-[80%] py-6 space-y-6 rounded-lg bg-tw_primary">
          <View className="w-full">
            <CustomText
              style_1="text-lg text-tw_text text-center"
              font="SemiBold"
            >
              Photo de profile
            </CustomText>
          </View>
          <View className="flex flex-row items-center justify-center gap-x-6">
            <View>
              <IconButton
                style="bg-tw_secondary w-16 h-14"
                on_pressed={() => handleUploadImage("camera")}
              >
                <FontAwesome
                  name="camera"
                  size={22}
                  color={colors.tw_primary}
                />
                <CustomText style_1="text-xs text-tw_primary" font="Bold">
                  Photo
                </CustomText>
              </IconButton>
            </View>
            <View>
              <IconButton
                style="bg-tw_secondary w-16 h-14"
                on_pressed={() => handleUploadImage("gallery")}
              >
                <FontAwesome
                  name="picture-o"
                  size={22}
                  color={colors.tw_primary}
                />
                <CustomText style_1="text-xs text-tw_primary" font="Bold">
                  Gallerie
                </CustomText>
              </IconButton>
            </View>
            <View>
              <IconButton
                style="bg-tw_secondary w-16 h-14"
                on_pressed={handleRemoveImage}
              >
                <FontAwesome name="trash" size={22} color={colors.tw_primary} />
                <CustomText style_1="text-xs text-tw_primary" font="Bold">
                  Retirer
                </CustomText>
              </IconButton>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
export default ProfileModify;
