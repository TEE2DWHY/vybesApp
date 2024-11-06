import React from "react";
import { View, Text, TouchableOpacity, Image, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import qr from "../assets/images/qr.png";

const ShareQr = ({ closeModal, showQr, userImage }) => {
  return (
    <>
      <Modal visible={showQr} transparent={true} animationType="fade">
        <TouchableOpacity
          onPress={closeModal}
          className="flex-1 bg-[#1b1b1b67] justify-center items-center"
        />
        <View className="flex-1 bg-[#2B0B3F] items-center pt-12">
          <Text className="text-white-normal text-lg font-semibold mb-5 font-axiformaBlack">
            Share Your Profile QR Code To Friends
          </Text>
          <View className="relative mb-5 rounded-full items-center justify-center">
            <View className="w-50 h-50 bg-white items-center justify-center rounded-lg">
              <Image source={qr} className="w-32 h-32" />
            </View>
            <Image
              source={{ uri: userImage }}
              className="w-10 h-10 rounded-full absolute -top-2 -right-5 border-2 border-white-normal"
            />
          </View>
          <TouchableOpacity className="bg-[#7B2CBF] rounded-full py-3 px-10 flex-row items-center mt-5">
            <Text className="text-white-normal text-base font-medium mr-2 font-axiformaBook">
              Share QR Code
            </Text>
            <Ionicons name="share-social" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default ShareQr;
