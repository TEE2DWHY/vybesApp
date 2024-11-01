import { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import * as Linking from "expo-linking";
import { useFonts } from "expo-font";

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
    const hideSplashScreen = async () => {
      try {
        if (loaded) {
          await SplashScreen.hideAsync();
        } else if (error) {
          console.error("Font loading error:", error);
          await SplashScreen.hideAsync();
        }
      } catch (e) {
        console.error("Error hiding splash screen:", e);
      }
    };

    hideSplashScreen();
  }, [loaded, error]);

  // // Display null while fonts are loading
  // if (!loaded && !error) {
  //   return null;
  // }

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

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default RootLayout;
