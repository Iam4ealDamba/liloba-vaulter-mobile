// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import IconButton from "@/components/button/IconButton";
import CustomText from "@/components/text/CustomText";
import colors from "@/utils/colors";
import { FontAwesome } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";
import { Text, View } from "react-native";

// ||||||||||||||||||||||||||||| ProfileUpdateImageSheet Component ||||||||||||||||||||||||||||||||||||

interface IProfileUpdateImageSheetProps {
  is_open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleUploadImage: (name: "camera" | "gallery") => void;
  handleRemoveImage: () => void;
}

const ProfileUpdateImageSheet: FC<IProfileUpdateImageSheetProps> = ({
  is_open,
  setIsOpen,
  handleUploadImage,
  handleRemoveImage,
}) => {
  // Hooks
  const sheet_ref = useRef<BottomSheetModal>(null);

  // Variables
  const snap_points = ["24%"];

  // Effects
  useEffect(() => {
    // Enter some content here.
    if (is_open) {
      sheet_ref.current && sheet_ref?.current.present();
    } else {
      sheet_ref.current && sheet_ref?.current.dismiss();
    }
  }, [is_open]);

  // Return
  return (
    <View
      className={`top-0 left-0 w-[100vw] h-[100vh] bg-black/50 ${
        is_open ? "absolute" : "hidden"
      }`}
    >
      <BottomSheetModal
        ref={sheet_ref}
        snapPoints={snap_points}
        onDismiss={() => setIsOpen(false)}
        backgroundStyle={{ backgroundColor: colors.tw_primary }}
      >
        <BottomSheetScrollView>
          <View className="w-full py-6 space-y-6 rounded-lg">
            <View className="w-full">
              <CustomText
                style_1="text-lg text-tw_text text-center"
                font="SemiBold"
              >
                Changer de photo de profil
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
                  <FontAwesome
                    name="trash"
                    size={22}
                    color={colors.tw_primary}
                  />
                  <CustomText style_1="text-xs text-tw_primary" font="Bold">
                    Retirer
                  </CustomText>
                </IconButton>
              </View>
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
};
export default ProfileUpdateImageSheet;
