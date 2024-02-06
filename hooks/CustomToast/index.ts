import Toast from "react-native-toast-message";

export interface ICustomToast {
  type: "success" | "error" | "info";
  header: string;
  body: string;
}

export const useCustomToast = ({ type, header, body }: ICustomToast) => {
  Toast.show({
    type: type,
    text1: header,
    text2: body,
    position: "top",
  });
};
