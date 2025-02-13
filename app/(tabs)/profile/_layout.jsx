import React from "react";
import { Stack } from "expo-router";

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="deposit" options={{ headerShown: false }} />
      <Stack.Screen name="txDashboard" options={{ headerShown: false }} />
      <Stack.Screen name="withdraw" options={{ headerShown: false }} />
      <Stack.Screen name="conversion" options={{ headerShown: false }} />
      <Stack.Screen
        name="transfer/[transactionId]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="deposit/[transactionId]"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ticketPayment" options={{ headerShown: false }} />
      <Stack.Screen name="mystory/[storyId]" options={{ headerShown: false }} />
      <Stack.Screen
        name="bookmark/[storyId]"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default ProfileLayout;
