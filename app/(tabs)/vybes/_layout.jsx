import { Stack } from "expo-router";
import React from "react";

const VybesLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="addStory/index" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default VybesLayout;
