import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, View, Text, Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

const Conversation = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const parentNavigation = navigation.getParent();
    parentNavigation?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      parentNavigation?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);

  return (
    <>
      <SafeAreaView className="flex-1 bg-white-normal">
        <View className="flex-row items-center justify-between py-4 px-4">
          <View className="flex-row gap-3 items-center">
            <AntDesign
              name="left"
              size={24}
              color="#546881"
              onPress={() => router.push("/chat")}
            />
            <View className="flex-row items-center ml-2">
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/women/3.jpg",
                }}
                className="w-10 h-10 rounded-full"
              />
              <Text className="ml-2 text-[#6890BF] font-axiformaBlack capitalize">
                @dhemmexroxy
              </Text>
            </View>
          </View>
          <View className="flex-row gap-6">
            <AntDesign name="videocamera" size={24} color="#7A91F9" />
            <Ionicons name="call-outline" size={24} color="#7A91F9" />
            <Entypo name="dots-three-vertical" size={24} color="#7A91F9" />
          </View>
        </View>
        <ScrollView className="bg-[#DBEBFF33] flex-1">
          {/* Chat messages can be added here */}
        </ScrollView>
        <StatusBar backgroundColor="#fff" style="dark" />
      </SafeAreaView>
    </>
  );
};

export default Conversation;
