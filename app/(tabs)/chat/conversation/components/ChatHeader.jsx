// Header.js
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";

const Header = ({ contact, isTyping, onBackPress, onUserPress }) => {
  return (
    <View className="flex-row items-center p-4">
      <View className="flex-row gap-3 items-center w-[75%]">
        <AntDesign
          name="left"
          size={24}
          color="#546881"
          onPress={onBackPress}
        />
        <TouchableOpacity
          className="flex-row items-center ml-2 flex-1"
          onPress={onUserPress}
        >
          <Image
            source={{ uri: contact.image }}
            className="w-10 h-10 rounded-full"
          />
          <View className="ml-2 flex-1">
            <Text className="text-[#6890BF] font-axiformaBlack capitalize">
              @{contact?.userName}
            </Text>
            {isTyping && (
              <View className="flex-row items-center justify-start mt-1">
                <Text className="text-gray-400 font-axiformaRegular text-sm">
                  is typing...
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex-row gap-4 items-center">
        <AntDesign
          name="videocamera"
          size={24}
          color="#7A91F9"
          onPress={() =>
            Alert.alert("Coming Soon...", "This feature is coming soon")
          }
        />
        <Ionicons
          name="call-outline"
          size={24}
          color="#7A91F9"
          onPress={() =>
            Alert.alert("Coming Soon...", "This feature is coming soon")
          }
        />
        <Entypo
          name="dots-three-vertical"
          size={24}
          color="#7A91F9"
          onPress={() => console.log("More options")}
        />
      </View>
    </View>
  );
};

export default Header;
