import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Text, View } from "react-native";
import home from "../../assets/icons/home.png";
import chat from "../../assets/icons/chat.png";
import ticket from "../../assets/icons/ticket.png";
import vybes from "../../assets/icons/vybe.png";
import profile from "../../assets/icons/profile.png";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2 mb-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${
          !focused
            ? `font-axiformaRegular`
            : `font-axiformaBlack text-purple-normal`
        } text-xs text-white`}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#9941EE",
          tabBarInactiveTintColor: "#B2BBC6",
          tabBarStyle: {
            backgroundColor: "#fffff",
            borderTopWidth: 0,
            height: 100,
            bottom: 0,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="ticket"
          options={{
            title: "Ticket",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={ticket}
                color={color}
                name="Ticket"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="vybes"
          options={{
            title: "Vybes",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={vybes}
                color={color}
                name="Vybes"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="chat"
          options={{
            title: "Chat",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={chat}
                color={color}
                name="Chat"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  );
};

export default TabsLayout;
