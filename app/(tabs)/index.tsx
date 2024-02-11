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
import { useAppDispatch, useAppSelector } from "@/store";
import { UpdateRefreshListSlice } from "@/store/service";

// ||||||||||||||||||||||||||||| HomeTabsPage Component ||||||||||||||||||||||||||||||||||||

interface IHomeTabsPageProps {}

const HomeTabsPage: FC<IHomeTabsPageProps> = () => {
  // Redux
  const services_slice = useAppSelector((state) => state.service.data);
  const refresh_list_slice = useAppSelector(
    (state) => state.service.can_refresh_list
  );
  const AppDispatch = useAppDispatch();

  // Hooks
  const [services_list, setServicesList] = useState<IServiceItem[]>([]);
  const [search_text, setSearchText] = useState("");
  const [open_service_detail, setOpenServiceDetail] = useState(false);
  const [open_service_add, setOpenServiceAdd] = useState(false);
  const [selected_service_item, setSelectedServiceItem] =
    useState<IServiceItem | null>(null);

  const searchbar_ref = useRef<TextInput>(null);

  const list_to_show = services_list.filter((el) => {
    if (search_text.length < 3) {
      return el;
    }

    if (
      el.service_name
        .toString()
        .toLowerCase()
        .includes(search_text.toString().toLowerCase())
    ) {
      return el;
    }
  });

  // Functions
  const handleOnPress = (service: IServiceItem) => {
    setOpenServiceDetail(true);
    setSelectedServiceItem(service);
  };

  // Effects
  useEffect(() => {
    setServicesList(services_slice);
  }, []);

  useEffect(() => {
    if (refresh_list_slice) {
      setServicesList(services_slice);
      AppDispatch(UpdateRefreshListSlice(false));
    }
  }, [services_slice.length, refresh_list_slice]);

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
                  key={service.service_id}
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
      {selected_service_item && (
        <ServiceBottomSheetModal
          is_open={open_service_detail}
          setIsOpen={setOpenServiceDetail}
          selected={selected_service_item}
          setSelected={setSelectedServiceItem}
        />
      )}
      {open_service_add && (
        <AddServiceBottomSheetModal
          is_open={open_service_add}
          setIsOpen={setOpenServiceAdd}
        />
      )}
    </View>
  );
};
export default HomeTabsPage;
