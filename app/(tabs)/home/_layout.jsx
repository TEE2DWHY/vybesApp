import React from "react";
import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="userprofile" options={{ headerShown: false }} />
        <Stack.Screen name="transfercoin" options={{ headerShown: false }} />
        <Stack.Screen name="user/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default HomeLayout;
