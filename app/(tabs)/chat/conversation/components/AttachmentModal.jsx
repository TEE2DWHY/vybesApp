// AttachmentModal.js
import React from "react";
import { Modal, View, TouchableOpacity, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { handleImageSelect } from "../../../../../utils/handleImageSelect";

const AttachmentModal = ({
  showAttachmentModal,
  setShowAttachmentModal,
  handleAttachmentSelect,
}) => {
  return (
    <View className="absolute bottom-0 left-0 right-0 flex-col items-center w-[93%] self-center mb-2 mx-4">
      <Modal
        visible={showAttachmentModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAttachmentModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowAttachmentModal(false)}
          className="flex-1 justify-end items-center bg-[#1b1b1ba0] bg-opacity-50"
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => console.log("Pressed")}
            className="w-[90%] bg-white-normal p-6 rounded-lg items-center"
          >
            <View className="flex-row items-center justify-between w-[90%] mb-2">
              <View className="flex-col items-center mb-4">
                <TouchableOpacity
                  className="justify-center items-center w-12 h-12 rounded-full bg-[#FBF7F7] border border-[#F3E5E7]"
                  onPress={() => handleAttachmentSelect("Audio")}
                >
                  <Ionicons name="headset" size={30} color="#D8ACB2" />
                </TouchableOpacity>
                <Text className="text-center mt-2 font-axiformaRegular text-[#3D4C5E]">
                  Audio
                </Text>
              </View>

              <View className="flex-col items-center mb-4">
                <TouchableOpacity
                  className="px-4 py-2 rounded-full justify-center items-center bg-[#FDEFEA] border border-[#FACDBE]"
                  onPress={() => handleAttachmentSelect("Camera")}
                >
                  <AntDesign name="camera" size={30} color="#EE5D2D" />
                </TouchableOpacity>
                <Text className="text-center mt-2 font-axiformaRegular text-[#3D4C5E]">
                  Camera
                </Text>
              </View>

              <View className="flex-col items-center mb-4">
                <TouchableOpacity
                  className="px-4 py-2 rounded-full justify-center items-center bg-[#F2F4FE] border border-[#D6DDFD]"
                  onPress={() => handleAttachmentSelect("Document")}
                >
                  <Ionicons name="document" size={30} color="#7A91F9" />
                </TouchableOpacity>
                <Text className="text-center mt-2 font-axiformaRegular text-[#3D4C5E]">
                  Document
                </Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between w-[90%]">
              <View className="flex-col items-center mb-4">
                <TouchableOpacity
                  className="px-4 py-2 rounded-full justify-center items-center bg-[#FFF7EE] border border-[#FFE7CA]"
                  onPress={handleImageSelect}
                >
                  <Ionicons name="image" size={30} color="#FFB053" />
                </TouchableOpacity>
                <Text className="text-center mt-2 font-axiformaRegular text-[#3D4C5E]">
                  Gallery
                </Text>
              </View>
              <View className="flex-col items-center mb-4">
                <TouchableOpacity
                  className="px-4 py-2 rounded-full justify-center items-center bg-[#B1C3FF] border border-[#F7F9FF]"
                  onPress={() => handleAttachmentSelect("Location")}
                >
                  <Ionicons name="location" size={30} color="#FF8674" />
                </TouchableOpacity>
                <Text className="text-center mt-2 font-axiformaRegular text-[#3D4C5E]">
                  Location
                </Text>
              </View>
              <View className="flex-col items-center mb-4">
                <TouchableOpacity
                  className="px-4 py-2 rounded-full justify-center items-center bg-[#FFF3F1] border border-[#FFD9D4]"
                  onPress={() => handleAttachmentSelect("VoiceRecord")}
                >
                  <Ionicons name="mic" size={30} color="#FF8674" />
                </TouchableOpacity>
                <Text className="text-center mt-2 font-axiformaRegular text-[#3D4C5E]">
                  Voice Record
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default AttachmentModal;
