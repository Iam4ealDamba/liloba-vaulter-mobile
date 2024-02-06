// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import ProfileItem from "@/components/items/ProfileItem";
import React, { FC, useState, useEffect } from "react";
import { Alert, Text, View } from "react-native";

// ||||||||||||||||||||||||||||| ProfileParameters Component ||||||||||||||||||||||||||||||||||||

interface IProfileParametersProps {}

const ProfileParameters: FC<IProfileParametersProps> = () => {
  // Hooks
  const [delete_account, sertDeleteAccount] = useState();

  // Effects
  useEffect(() => {
    // Enter some content here.
  }, []);

  // Return
  return (
    <View className="relative h-full py-6 px-6 bg-tw_bg">
      <View aria-label="Bottom" className="flex divide-y-2 divide-tw_text/70">
        <View>
          <ProfileItem
            title="Supprimer le compte"
            icon="lock"
            on_pressed={() => {
              Alert.alert(
                "Supprimer le compte",
                "Etes-vous sûr de vouloir supprimer votre compte ?",
                [
                  {
                    text: "Annuler",
                  },
                  {
                    text: "Supprimer",
                  },
                ]
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default ProfileParameters;
