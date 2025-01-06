import { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import "../global.css";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Axiforma-Black": require("../assets/fonts/Axiforma-Black.ttf"),
    "Axiforma-Light": require("../assets/fonts/Axiforma-Light.ttf"),
    "Axiforma-Regular": require("../assets/fonts/Axiforma-Regular.ttf"),
    "Axiforma-Book": require("../assets/fonts/Axiforma-Book.ttf"),
    "Axiforma-BlackItalic": require("../assets/fonts/Axiforma-BlackItalic.ttf"),
    "Axiforma-Medium": require("../assets/fonts/Axiforma-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    } else if (error) {
      console.error(error);
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
