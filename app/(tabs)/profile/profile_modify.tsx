// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, { FC, useState, useEffect } from "react";
import { Alert, Image } from "react-native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
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
import { useAppDispatch, useAppSelector } from "@/store";
import { ZodProfileModify } from "@/services/types";
import { useCustomToast } from "@/hooks/CustomToast";
import UserQueries from "@/services/queries/users";
import { StatusCode } from "@/utils/enums";
import {
  updateCanRefreshUserSlice,
  updateImageUrlSlice,
  updateProfileSlice,
} from "@/store/user";
import { useRouter } from "expo-router";
import ProfileUpdateImageSheet from "@/components/modal/profile/ProfileUpdateImageSheet";

// ||||||||||||||||||||||||||||| ProfileModify Component ||||||||||||||||||||||||||||||||||||

const AvatarPng = require("@/assets/avatar.png");

interface IProfileModifyProps {}

const ProfileModify: FC<IProfileModifyProps> = () => {
  // Redux
  const { data } = useAppSelector((state) => state.user);
  const AppDispatch = useAppDispatch();

  // Hooks
  const [is_image_modal, setIsImageModal] = useState(false);
  const [show_image_modal, setShowImageModal] = useState(false);
  const [avatar_image, setAvatarImage] = useState<string>("");
  const [field_error, setField_error] = React.useState<{
    selector: string;
    msg: string;
  } | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileModify>({
    defaultValues: {
      username: data?.username || "",
      email: data?.email || "",
    },
  });
  const router = useRouter();

  // Functions
  const handleSubmitForm: SubmitHandler<IProfileModify> = async ({
    email,
    username,
  }) => {
    const verify_form = ZodProfileModify.safeParse({
      email,
      username,
    });
    if (!verify_form.success) {
      setField_error({
        selector: verify_form.error.errors[0].path[0].toString(),
        msg: verify_form.error.errors[0].message,
      });
      return;
    }

    const is_field_same = email === data?.email && username === data?.username;
    if (is_field_same) {
      useCustomToast({
        type: "info",
        header: "Modification Profile",
        body: "Info: aucune modification n'a été effectuée.",
      });
      return;
    }

    const modify = await UserQueries.UserUpdate(username, email);
    if (modify.status !== StatusCode.OK) {
      useCustomToast({
        type: "error",
        header: "Modification Profile",
        body: "Erreur: le profile n'a pas été modifié.",
      });
      return;
    }

    const modify_data = {
      username: (modify.data as IProfileModify).username,
      email: (modify.data as IProfileModify).email,
    };

    AppDispatch(updateProfileSlice(modify_data));
    AppDispatch(updateCanRefreshUserSlice(true));

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
  const handleRemoveImage = async () => {
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
      await UserQueries.UserUpdateImg(get_img);
      AppDispatch(updateImageUrlSlice(get_img));
      AppDispatch(updateCanRefreshUserSlice(true));
      setAvatarImage(get_img);
      setShowImageModal(false);
      useCustomToast({
        type: "success",
        header: "Modification Image",
        body: "Succès: L'image a bien été changé !",
      });
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(router.back());
        }, 2000);
      });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (data?.img_url.length) {
      setAvatarImage(data?.img_url);
    } else {
      setAvatarImage("");
    }
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
              source={
                avatar_image.length
                  ? {
                      uri: avatar_image as string,
                    }
                  : AvatarPng
              }
              className="w-full h-full rounded-md"
            />
            <TouchableOpacity
              onPress={() => setShowImageModal(true)}
              className="absolute bottom-0 right-0 w-10 h-10 flex items-center justify-center rounded-xl rounded-bl-none rounded-tr-none bg-tw_secondary"
            >
              <FontAwesome name="camera" size={22} color={colors.tw_primary} />
            </TouchableOpacity>
          </View>
        </View>
        <View aria-label="Bottom" className="w-full space-y-4">
          <View aria-label="Inputs" className="space-y-5">
            <View aria-label="Input Field" className="space-y-3">
              <View>
                <CustomText font="Medium" style_1="text-tw_text">
                  Nom d'uitilisateur
                </CustomText>
              </View>
              <View>
                <Controller
                  control={control}
                  name="username"
                  render={({ field: { value, onChange } }) => (
                    <RegularInput
                      style={`bg-tw_primary ${
                        field_error?.selector == "username"
                          ? "border-2 border-error"
                          : ""
                      }`}
                    >
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
            </View>
            <View aria-label="Input Field" className="space-y-3">
              <View>
                <CustomText font="Medium" style_1="text-tw_text">
                  Adresse email
                </CustomText>
              </View>
              <View>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { value, onChange } }) => (
                    <RegularInput
                      style={`bg-tw_primary ${
                        field_error?.selector == "email"
                          ? "border-2 border-error"
                          : ""
                      }`}
                    >
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
              onPress={handleSubmit(handleSubmitForm)}
            >
              <RegularButton style={`w-full`} text="Modifier Profile" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ProfileUpdateImageSheet
        is_open={show_image_modal}
        setIsOpen={setShowImageModal}
        handleUploadImage={handleUploadImage}
        handleRemoveImage={handleRemoveImage}
      />
    </View>
  );
};
export default ProfileModify;
