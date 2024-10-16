import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";

const Privacy = () => {
  const [selectedOption, setSelectedOption] = useState("All Vybers & Baddies");

  const options = [
    "All Vybers & Baddies",
    "Only Vybers",
    "Only Baddies",
    "Only Baddies I Follow",
    "Only Vybers I Follow",
  ];

  return (
    <>
      <SafeAreaView className="h-full bg-white-normal">
        <View className="flex-row items-center justify-between px-4 mt-3 mb-2">
          <View className="flex-row gap-2 items-center">
            <AntDesign
              name="left"
              size={24}
              color="#546881"
              onPress={() => router.push("/chat")}
            />
            <Text className="capitalize text-[#1D242D] font-axiformaBlack text-lg">
              Chats Privacy
            </Text>
          </View>
          <View className="flex-row items-center gap-6">
            <View className="relative">
              <Entypo name="dots-three-vertical" size={24} color="#7A91F9" />
            </View>
          </View>
        </View>
        <ScrollView className="bg-gray-100">
          <View className="bg-white-normal border-white-normal self-center border  w-[90%] rounded-[12px] mt-16 py-10 px-4">
            <Text className="text-left font-axiformaBlack text-base text-[#3D4C5E] mb-4">
              Who Can Message Me
            </Text>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedOption(option)}
                className="flex-row justify-between items-center mt-4 border-b border-b-[#EEF6FF] pb-2"
              >
                <Text
                  className={`${
                    selectedOption === option
                      ? "text-[#47586E] font-axiformaBlack"
                      : "text-[#546881] font-axiformaRegular"
                  } text-base `}
                >
                  {option}
                </Text>
                {selectedOption === option && (
                  <AntDesign name="checkcircle" size={24} color="#00A86B" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <StatusBar backgroundColor="#ffff" style="dark" />
      </SafeAreaView>
    </>
  );
};

export default Privacy;
