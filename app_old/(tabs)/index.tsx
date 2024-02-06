// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, { FC, useState, useEffect, useRef } from "react";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { View, TextInput, ScrollView, Pressable } from "react-native";

import { IServiceItem } from "@/utils/interfaces";
import colors from "@/utils/colors";
import RegularInput from "@/components/input/RegularInput";
import ServiceItem from "@/components/items/ServiceItem";
import CustomText from "@/components/text/CustomText";
import ServiceBottomSheetModal from "@/components/modal/ServiceBottomSheetModal";
import AddServiceBottomSheetModal from "@/components/modal/AddServiceBottomSheetModal";
import ModifyServiceBottomSheetModal from "@/components/modal/ModifyServiceBottomSheetModal";

// ||||||||||||||||||||||||||||| HomeTabsPage Component ||||||||||||||||||||||||||||||||||||

interface IHomeTabsPageProps {}

const HomeTabsPage: FC<IHomeTabsPageProps> = () => {
  // Hooks
  const [search_text, setSearchText] = useState("");
  const [open_service_detail, setOpenServiceDetail] = useState(false);
  const [open_service_modify, setOpenServiceModify] = useState(false);
  const [open_service_add, setOpenServiceAdd] = useState(false);
  const [selected_service_item, setSelectedServiceItem] =
    useState<IServiceItem | null>(null);
  const [selected_update_service_item, setSelectedUpdateServiceItem] =
    useState<IServiceItem | null>(null);

  const searchbar_ref = useRef<TextInput>(null);

  // Variables
  const services_list: IServiceItem[] = [
    {
      id: 1,
      name: "Service 1",
      email: "adresse.1@email",
      password: "123456",
      created_at: "02/02/2024 19:22:00",
      updated_at: "02/02/2024 19:22:00",
    },
    {
      id: 2,
      name: "Service 2",
      email: "adresse.2@email",
      password: "123456",
      created_at: "02/02/2024 19:22:00",
      updated_at: "02/02/2024 19:22:00",
    },
    {
      id: 4,
      name: "Service 4",
      email: "adresse.4@email",
      password: "123456",
      created_at: "02/02/2024 19:22:00",
      updated_at: "02/02/2024 19:22:00",
    },
    {
      id: 5,
      name: "Service 5",
      email: "adresse.5@email",
      password: "123456",
      created_at: "02/02/2024 19:22:00",
      updated_at: "02/02/2024 19:22:00",
    },
    {
      id: 6,
      name: "Service 6",
      email: "adresse.6@email",
      password: "123456",
      created_at: "02/02/2024 19:22:00",
      updated_at: "02/02/2024 19:22:00",
    },
    {
      id: 7,
      name: "Service 7",
      email: "adresse.7@email",
      password: "123456",
      created_at: "02/02/2024 19:22:00",
      updated_at: "02/02/2024 19:22:00",
    },
    {
      id: 8,
      name: "Service 8",
      email: "adresse.8@email",
      password: "123456",
      created_at: "02/02/2024 19:22:00",
      updated_at: "02/02/2024 19:22:00",
    },
    {
      id: 9,
      name: "Service 9",
      email: "adresse.9@email",
      password: "123456",
      created_at: "02/02/2024 19:22:00",
      updated_at: "02/02/2024 19:22:00",
    },
    {
      id: 10,
      name: "Service 10",
      email: "adresse.10@email",
      password: "123456",
      created_at: "02/02/2024 19:22:00",
      updated_at: "02/02/2024 19:22:00",
    },
    {
      id: 11,
      name: "Service 11",
      email: "adresse.11@email",
      password: "123456",
      created_at: "02/02/2024 19:22:00",
      updated_at: "02/02/2024 19:22:00",
    },
    {
      id: 12,
      name: "Service 12",
      email: "adresse.12@email",
      password: "123456",
      created_at: "02/02/2024 19:22:00",
      updated_at: "02/02/2024 19:22:00",
    },
    {
      id: 13,
      name: "Service 13",
      email: "adresse.13@email",
      password: "123456",
      created_at: "02/02/2024 19:22:00",
      updated_at: "02/02/2024 19:22:00",
    },
    {
      id: 14,
      name: "Service 14",
      email: "adresse.14@email",
      password: "123456",
      created_at: "02/02/2024 19:22:00",
      updated_at: "02/02/2024 19:22:00",
    },
  ];

  const list_to_show = services_list.filter((el) => {
    if (search_text.length < 3) {
      return el;
    } else {
      if (new RegExp(search_text, "gi").exec(el.name))
        return el.name.toLowerCase().includes(search_text.toLowerCase());
    }
  });

  // Functions
  const handleOnPress = (service: IServiceItem) => {
    setOpenServiceDetail(true);
    setSelectedServiceItem(service);
  };

  // Return
  return (
    <View className="relative h-full py-8 px-6 bg-tw_bg">
      <View className="flex mt-4 space-y-10">
        <View aria-label="Search Bar">
          <RegularInput style="bg-tw_primary py-3">
            <FontAwesome
              name="search"
              size={16}
              color={colors.tw_accent}
              onPress={() =>
                searchbar_ref.current && searchbar_ref.current.focus()
              }
            />
            <TextInput
              ref={searchbar_ref}
              placeholder="Rechercher un service..."
              placeholderTextColor={colors.tw_accent}
              value={search_text}
              onChangeText={(text) => setSearchText(text)}
              className="ml-4 w-full h-full text-tw_text"
            />
          </RegularInput>
        </View>
        <View aria-label="Services List" className="h-[600px]">
          <ScrollView className="h-full">
            {list_to_show.length ? (
              list_to_show.map((service) => (
                <ServiceItem
                  key={service.id}
                  text="Service"
                  data={service}
                  on_pressed={() => handleOnPress(service)}
                />
              ))
            ) : (
              <CustomText style_1="text-tw_text" font="SemiBold">
                Aucun services trouvés.
              </CustomText>
            )}
          </ScrollView>
        </View>
      </View>
      <View className="absolute right-7 bottom-32 w-14 h-14">
        <Pressable
          onPress={() => setOpenServiceAdd(true)}
          className="w-full h-full flex items-center justify-center rounded-full transition-colors duration-700 text-tw_primary bg-tw_secondary active:bg-tw_secondary/80"
        >
          <FontAwesome6 name="add" size={20} color={colors.tw_primary} />
        </Pressable>
      </View>
      <ServiceBottomSheetModal
        is_open={open_service_detail}
        setIsOpen={setOpenServiceDetail}
        selected={selected_service_item}
        set_selected_modify={setSelectedUpdateServiceItem}
      />
      <AddServiceBottomSheetModal
        is_open={open_service_add}
        setIsOpen={setOpenServiceAdd}
      />
      <ModifyServiceBottomSheetModal
        setIsOpen={setOpenServiceModify}
        set_selected_modify={setSelectedUpdateServiceItem}
        selected={selected_update_service_item}
      />
    </View>
  );
};
export default HomeTabsPage;
