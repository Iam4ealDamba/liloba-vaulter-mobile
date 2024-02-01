// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { FC } from "react";
import { View } from "react-native";

// ||||||||||||||||||||||||||||| Auth Wrapper Component ||||||||||||||||||||||||||||||||||||

interface IAuthWrapperProps {
  children: JSX.Element;
}

const AuthWrapper: FC<IAuthWrapperProps> = ({ children }) => {
  // Return
  return (
    <View className="flex w-[100vw] h-[100vh] bg-red-300 py-5 px-5">
      {children}
    </View>
  );
};
export default AuthWrapper;
