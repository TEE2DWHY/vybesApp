import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { StatusBar } from "expo-status-bar";
import notificationImage from "../../../assets/images/notification.png";

const Notification = () => {
  useEffect(() => {
    const getAllNotifications = async () => {
      try {
      } catch (error) {
        console.log(error);
      }
    };
  }, []);
  return (
    <SafeAreaView className="h-full bg-white">
      <View className="flex-row items-center justify-between px-4 py-2">
        <TouchableOpacity>
          <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="font-axiformaBlack text-lg">Notifications</Text>
        <TouchableOpacity>
          <Feather name="settings" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4">
        <View className="items-center justify-center min-h-[70vh]">
          <Image
            source={notificationImage}
            className="w-[120px] h-[120px]"
            resizeMode="contain"
          />
          <Text className="font-axiformaBlack text-xl">
            No notifications yet
          </Text>
          <Text className="text-gray-600 text-center mt-2 font-axiformaRegular leading-4 mb-2">
            Your notification will appear here once you’ve received them.
          </Text>
          <Text className="text-black-normal mt-2 font-axiformaRegular">
            Missing notifications?{" "}
          </Text>
          <Text className="text-blue-400 underline mt-4">
            Go to historical notifications.
          </Text>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#fffff" style="dark" />
    </SafeAreaView>
  );
};

export default Notification;
