import React from "react";
import { Stack } from "expo-router";

const ChatLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="privacy" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default ChatLayout;
