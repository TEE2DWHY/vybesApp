import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export const user = () => {
  const { params } = useLocalSearchParams();
  const { id } = params;
  return (
    <View>
      <Text>user</Text>
    </View>
  );
};
