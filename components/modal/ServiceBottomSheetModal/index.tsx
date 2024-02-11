// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, {
  FC,
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { View } from "react-native";

import { IServiceItem } from "@/utils/interfaces";
import colors from "@/utils/colors";
import ModifySheet from "./sheets/ModifySheet";
import HomeSheet from "./sheets/HomeSheet";

// ||||||||||||||||||||||||||||| Service Bottom Sheet Modal Component ||||||||||||||||||||||||||||||||||||

interface IServiceBottomSheetModalProps {
  is_open?: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selected: IServiceItem | null;
  setSelected: Dispatch<React.SetStateAction<IServiceItem | null>>; 
}

const ServiceBottomSheetModal: FC<IServiceBottomSheetModalProps> = ({
  is_open,
  setIsOpen,
  selected,
  setSelected, 
}) => {
  // Hooks
  const [sheet_selected, setSheetSelected] = useState<number>(0);
  const sheet_ref = useRef<BottomSheetModal>(null);

  // Variables
  const snap_points = ["47%", "57%"];

  // Functions
  const SelectSheet = (choice: number) => {
    switch (choice) {
      case 0:
        setSheetSelected(0);
        break;
      case 1:
        setSheetSelected(1);
        break;
    }
  };

  useEffect(() => {
    SelectSheet(0);
  }, []);
  useEffect(() => {
    if (sheet_selected == 1) {
      sheet_ref.current?.expand();
    } else {
      sheet_ref.current?.collapse();
    }
  }, [sheet_selected]);
  useEffect(() => {
    if (is_open) {
      sheet_ref.current?.present();
    } else {
      sheet_ref.current?.dismiss();
      setSheetSelected(0);
      setSelected(null);
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
        handleIndicatorStyle={{
          backgroundColor: colors.tw_accent,
        }}
        backgroundStyle={{
          backgroundColor: colors.tw_primary,
        }}
      >
        <BottomSheetScrollView>
          {sheet_selected == 0 ? (
            <HomeSheet
              selected={selected!}
              set_sheet_selected={setSheetSelected}
              setIsOpen={setIsOpen}
            />
          ) : (
            <ModifySheet
              selected={selected!}
              set_is_open={setIsOpen}
              set_sheet_selected={setSheetSelected} 
            />
          )}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
};
export default ServiceBottomSheetModal;
