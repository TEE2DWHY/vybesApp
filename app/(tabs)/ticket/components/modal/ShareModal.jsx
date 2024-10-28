import React, { useState, useEffect } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import ticketFour from "../../../../../assets/images/ticket-4.png";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import Foundation from "@expo/vector-icons/Foundation";

const ShareModal = ({ image }) => {
  return (
    <View className="p-5 bg-[#FCFDFD] rounded-tr-[40px] rounded-tl-[40px] mx-2  z-50 absolute bottom-0  shadow-2xl">
      <View className="flex items-center justify-center my-4">
        <View className="relative rounded-full h-24 w-24">
          <Image
            source={{ uri: image }}
            className="w-full h-full rounded-full"
            resizeMode="cover"
          />
          <View className="absolute top-[30%] left-[24%] items-center justify-center z-50 bg-white-normal rounded-full p-2">
            <Foundation name="ticket" size={24} color={"#9941EE"} />
          </View>
        </View>
      </View>

      <View className="flex-row justify-between items-center mb-4">
        <Text className="capitalize text-[#1D242D] font-axiformaRegular">
          Share Your Tickets Via
        </Text>
        <View className="flex-row items-center gap-2">
          <Text className="font-axiformaRegular text-[#B2BBC6]">Copy Link</Text>
          <Feather name="link-2" size={24} color="#9941EE" />
        </View>
      </View>
      <View className="flex-row flex-wrap items-center justify-between self-center">
        <TouchableOpacity className="w-[25%] items-center justify-center mb-8">
          <FontAwesome
            name="facebook-square"
            size={24}
            style={{ color: "#000AFF" }}
          />
        </TouchableOpacity>
        <TouchableOpacity className="w-[25%] items-center justify-center mb-2">
          <Fontisto name="messenger" size={24} style={{ color: "#B2BBC6" }} />
        </TouchableOpacity>
        <TouchableOpacity className="w-[25%] items-center justify-center mb-2">
          <FontAwesome6 name="tiktok" size={24} style={{ color: "#3A1078" }} />
        </TouchableOpacity>
        <TouchableOpacity className="w-[25%] items-center justify-center mb-2">
          <Entypo name="instagram" size={24} style={{ color: "#3795BD" }} />
        </TouchableOpacity>
        <TouchableOpacity className="w-[25%] items-center justify-center mb-2">
          <FontAwesome name="reddit" size={24} style={{ color: "#FF8343" }} />
        </TouchableOpacity>
        <TouchableOpacity className="w-[25%] items-center justify-center mb-2">
          <AntDesign
            name="linkedin-square"
            size={24}
            style={{ color: "#3FA2F6" }}
          />
        </TouchableOpacity>
        <TouchableOpacity className="w-[25%] items-center justify-center mb-8">
          <Entypo
            name="twitter-with-circle"
            size={24}
            style={{ color: "#1A2130" }}
          />
        </TouchableOpacity>
        <TouchableOpacity className="w-[25%] items-center justify-center mb-8">
          <FontAwesome5
            name="whatsapp-square"
            size={24}
            style={{ color: "#88D66C" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShareModal;
