import React from "react";
import { Stack } from "expo-router";

const ProfileLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="deposit" options={{ headerShown: false }} />
        <Stack.Screen name="txDashboard" options={{ headerShown: false }} />
        <Stack.Screen name="withdraw" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default ProfileLayout;
