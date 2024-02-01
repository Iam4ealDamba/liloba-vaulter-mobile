// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";

import Logo from "../../assets/logo.svg";

// ||||||||||||||||||||||||||||| Logo Component ||||||||||||||||||||||||||||||||||||

const LogoComponent = () => {
  // Hooks
  const [val, setVal] = useState();

  // Effects
  useEffect(() => {
    // Enter some content here.
  }, []);

  // Return
  return (
    <View
      className="flex items-centerw-[300px] h-[40px] mx-auto"
      aria-label="Logo"
    >
      <Logo className="w-full h-full" height={46} width={370} />
    </View>
  );
};
export default LogoComponent;
