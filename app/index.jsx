import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Linking,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // For navigation
import logo from "../assets/images/logo.jpg";
import topVector from "../assets/images/home-vector.png";
import bottomVector from "../assets/images/home-vector2.png";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { getItem } from "../utils/AsyncStorage";
import { Spinner } from "../components/Spinner";

const App = () => {
  const [loading, setLoading] = useState(true);
  // const navigation = useNavigation();

  useEffect(() => {
    // const handleDeepLink = async (url) => {
    //   const regex = /vybesapp:\/\/home\/user\/([a-f0-9]{24})/; // Regex to match the user profile deep link
    //   const match = url.match(regex);

    //   if (match && match[1]) {
    //     const userId = match[1];
    //     navigation.navigate("Profile", { userId });
    //   } else {
    //     // If the app is not installed, open the Play Store link
    //     Linking.openURL(
    //       "https://play.google.com/store/apps/details?id=com.tee2dwhy.vybesapp"
    //     ).catch((err) => console.error("Failed to open Play Store:", err));
    //   }
    // };

    const handleAppLaunch = async () => {
      const isAppLaunched = await getItem("isAppLaunched");
      const isLoggedIn = await getItem("isLoggedIn");

      if (isAppLaunched && !isLoggedIn) {
        return router.replace("/sign-in");
      }

      if (isLoggedIn) {
        return router.replace("/home");
      } else {
        const timeoutId = setTimeout(() => {
          router.push("/welcome");
        }, 2000);

        return () => clearTimeout(timeoutId);
      }
    };

    handleAppLaunch().finally(() => setLoading(false));

    // // Listen for deep links
    // const deepLinkListener = Linking.addEventListener("url", (event) => {
    //   handleDeepLink(event.url);
    // });

    // // Handle deep links if the app is opened via one
    // Linking.getInitialURL().then((url) => {
    //   if (url) {
    //     handleDeepLink(url);
    //   }
    // });

    // return () => {
    //   deepLinkListener.remove();
    // };
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full flex-1 justify-center items-center">
        <View className="flex-1 justify-center items-center h-[48vh]">
          <Spinner />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "#fff",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image
          source={topVector}
          className="w-[60px] h-[60px] self-end mt-[-2px]"
          resizeMode="contain"
        />
        <View className="justify-center items-center flex-1">
          <Image
            source={logo}
            className="mb-6 w-[80px] h-[80px]"
            resizeMode="contain"
          />
          <Text className="text-6xl text-black-dark mb-3 font-axiformaRegular">
            Vybes
          </Text>
          <Text className="text-blue-dark text-base text-center font-axiformaBlack">
            Find Your Life Partner And Enjoy A Good Time
          </Text>
        </View>
        <Image
          source={bottomVector}
          className="w-[60px] h-[60px] self-start"
          resizeMode="contain"
        />
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="dark" />
    </SafeAreaView>
  );
};

export default App;
