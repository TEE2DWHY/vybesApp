import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions={{}}>
        <Tabs.Screen
          name="home"
          options={{ title: "home", headerShown: false }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
