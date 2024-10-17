import { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import * as Linking from "expo-linking";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();
const prefix = Linking.createURL("/");

const RootLayout = () => {
  const linking = {
    prefixes: [prefix],
  };
  const [loaded, error] = useFonts({
    "Axiforma-Black": require("../assets/fonts/Axiforma-Black.ttf"),
    "Axiforma-Light": require("../assets/fonts/Axiforma-Light.ttf"),
    "Axiforma-Regular": require("../assets/fonts/Axiforma-Regular.ttf"),
    "Axiforma-Book": require("../assets/fonts/Axiforma-Book.ttf"),
    "Axiforma-BlackItalic": require("../assets/fonts/Axiforma-BlackItalic.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default RootLayout;
