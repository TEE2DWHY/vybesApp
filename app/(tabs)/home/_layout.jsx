import React from "react";
import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* <Stack.Screen name="privacy" options={{ headerShown: false }} />
        <Stack.Screen name="add" options={{ headerShown: false }} /> */}
      </Stack>
    </>
  );
};

export default HomeLayout;
