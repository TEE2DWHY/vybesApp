import React from "react";
import { Stack } from "expo-router";

const TicketLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="event/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="buyticket" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default TicketLayout;
