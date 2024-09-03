import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const VybesLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default VybesLayout;
