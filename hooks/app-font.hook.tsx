// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||
import * as Font from "expo-font";

// ||||||||||||||||||||||||||||| AppFontHook Component ||||||||||||||||||||||||||||||||||||

const AppFontHook = async () => {
  await Font.loadAsync({
    "Fairplay-Regular": require("../assets/fonts/static/PlayfairDisplay-Regular.ttf"),
    "Fairplay-Medium": require("../assets/fonts/static/PlayfairDisplay-Medium.ttf"),
    "Fairplay-SemiBold": require("../assets/fonts/static/PlayfairDisplay-SemiBold.ttf"),
    "Fairplay-Bold": require("../assets/fonts/static/PlayfairDisplay-Bold.ttf"),
    "Fairplay-Black": require("../assets/fonts/static/PlayfairDisplay-Black.ttf"),
  });
};

export default AppFontHook;
