import React from "react";
import { TouchableOpacity, SafeAreaView, Image, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";

const PhotoPreviewSection = ({ photo, handleRetakePhoto, sendImage }) => {
  return (
    <SafeAreaView className="flex-1 items-center justify-between bg-black-darker">
      <View className="absolute top-5 left-5"></View>
      <View className="w-full h-5/6 rounded-lg overflow-hidden mt-10">
        <Image
          className="w-full h-full rounded-2xl"
          source={{ uri: photo.uri }}
          resizeMode="contain"
        />
      </View>
      <View className="flex-row justify-between w-full px-10 mb-10">
        <TouchableOpacity
          className="bg-gray-700 rounded-full p-4 items-center justify-center"
          onPress={handleRetakePhoto}
        >
          <Fontisto name="camera" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-purple-600 rounded-full p-4 items-center justify-center"
          onPress={sendImage}
        >
          <Fontisto name="arrow-right" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PhotoPreviewSection;
