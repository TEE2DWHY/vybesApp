import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import logo from "../assets/images/logo.jpg";
import topVector from "../assets/images/home-vector.png";
import bottomVector from "../assets/images/home-vector2.png";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { getItem } from "../utils/AsyncStorage";

const App = () => {
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isAppLaunched = await getItem("isAppLaunched");
      const isLoggedIn = await getItem("isLoggedIn");
      if (isAppLaunched && !isLoggedIn) {
        return router.replace("/sign-in");
      }
      if (isLoggedIn) {
        return router.replace("/home");
      } else {
        setTimeout(() => {
          router.push("/welcome");
        }, 2000);
      }
      setLoading(false); // Set loading to false after checking
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
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
