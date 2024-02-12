// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, { FC, useState, useEffect } from "react";
import { Alert, Text, View } from "react-native";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";

import { useAppDispatch, useAppSelector } from "@/store";
import ProfileItem from "@/components/items/ProfileItem";
import ServiceQueries from "@/services/queries/services";
import { useCustomToast } from "@/hooks/CustomToast";
import { StatusCode } from "@/utils/enums";
import { AddServiceSlice, UpdateRefreshListSlice } from "@/store/service";
import { IServiceItem } from "@/utils/interfaces";
import UserQueries from "@/services/queries/users";
import { useRouter } from "expo-router";

const { StorageAccessFramework } = FileSystem;

// ||||||||||||||||||||||||||||| ProfileParameters Component ||||||||||||||||||||||||||||||||||||

interface IProfileParametersProps {}

const ProfileParameters: FC<IProfileParametersProps> = () => {
  // Redux
  const token = useAppSelector((state) => state.user.token);
  const AppDispatch = useAppDispatch();

  // Hooks
  const [delete_account, setDeleteAccount] = useState(false);
  const [is_export_json, setIsExportJson] = useState(false);
  const [is_import_json, setIsImportJson] = useState(false);
  const router = useRouter();

  // Functions
  const exportServicesToJson = async () => {
    setIsExportJson(false);

    const permission =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (permission.granted) {
      // get the directory uri that was approved
      let dir_uri = permission.directoryUri;
      const get_json = await ServiceQueries.ExportServices(Number(token));

      // create file and pass it's saf uri
      await StorageAccessFramework.createFileAsync(
        dir_uri,
        "liloba_vaulter_export",
        "application/json"
      ).then(async (uri: any) => {
        // save data to newly created file
        await FileSystem.writeAsStringAsync(uri, get_json, {
          encoding: FileSystem.EncodingType.UTF8,
        }).catch((error) => {
          return error;
        });
      });
    } else {
      useCustomToast({
        type: "error",
        header: "Permission refusee",
        body: "Erreur: Veuillez autoriser l'acces au dossier de sauvegarde",
      });
    }
  };
  const importServicesFromJson = async () => {
    setIsImportJson(false);

    try {
      const doc = await DocumentPicker.getDocumentAsync({
        type: "application/json",
        copyToCacheDirectory: true,
      });
      const path = doc.assets && doc.assets[0].uri;

      if (path) {
        const result = await FileSystem.readAsStringAsync(path);
        const result_import = await ServiceQueries.ImportServices(
          Number(token),
          result
        );
        if (result_import.status !== StatusCode.OK) {
          useCustomToast({
            type: "error",
            header: "Importation echouée",
            body: result_import.data as string,
          });
        }

        if ((result_import.data as IServiceItem[]).length) {
          (result_import.data as IServiceItem[]).map((service) => {
            AppDispatch(AddServiceSlice(service));
          });
        }
        AppDispatch(UpdateRefreshListSlice(true));

        useCustomToast({
          type: "success",
          header: "Importation reussie",
          body: `Succès: Les services ont bien été importés`,
        });
      }
    } catch (error) {
      return error;
    }
  };
  const handleDeleteAccount = async () => {
    setDeleteAccount(false);

    const result = await UserQueries.UserDelete();
    if (result.status !== StatusCode.OK) {
      useCustomToast({
        type: "error",
        header: "Suppression echouée",
        body: result.data as string,
      });
    } else {
      useCustomToast({
        type: "success",
        header: "Suppression reussie",
        body: `Succès: Veuillez patienter, vous allez être redirigé...`,
      });
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(router.replace("/(auth)"));
        }, 2000);
      });
    }
  };

  // Effects
  useEffect(() => {
    // Enter some content here.
    if (is_export_json) {
      exportServicesToJson();
    }
  }, [is_export_json]);

  useEffect(() => {
    // Enter some content here.
    if (is_import_json) {
      importServicesFromJson();
    }
  }, [is_import_json]);

  useEffect(() => {
    // Enter some content here.
    if (delete_account) {
      handleDeleteAccount();
    }
  }, [delete_account]);

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
                    onPress: () => {
                      setDeleteAccount(true);
                    },
                  },
                ]
              );
            }}
          />
          <ProfileItem
            title="Exporter données compte"
            icon="cloud-upload"
            on_pressed={() => {
              setIsExportJson(true);
            }}
          />
          <ProfileItem
            title="Importer données compte"
            icon="cloud-download"
            on_pressed={() => {
              setIsImportJson(true);
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default ProfileParameters;
