import React from "react";
import { View, ActivityIndicator, Text } from "react-native";

const LoadingIndicator = () => {
  return (
    <View className="flex-1 justify-center items-center bg-black-normal">
      <ActivityIndicator size="large" color="#4F46E5" />
      <Text className="text-white mt-4 font-axiformaRegular">Loading...</Text>
    </View>
  );
};

export default LoadingIndicator;
