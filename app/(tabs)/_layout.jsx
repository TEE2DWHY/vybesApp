import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Foundation from "@expo/vector-icons/Foundation";

const TabIcon = ({ icon, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2 mb-2">
      <Text>{icon}</Text>
      <Text
        className={`${
          !focused
            ? `font-axiformaRegular text-[#B2BBC6]`
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
                icon={
                  <MaterialIcons
                    name="home"
                    size={24}
                    color={!focused ? "#B2BBC6" : "#a241ee"}
                  />
                }
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
                icon={
                  <Foundation
                    name="ticket"
                    size={24}
                    color={!focused ? "#B2BBC6" : "#a241ee"}
                  />
                }
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
                icon={
                  <MaterialCommunityIcons
                    name="star-three-points"
                    size={24}
                    color={!focused ? "#B2BBC6" : "#a241ee"}
                  />
                }
                color={color}
                name="Vybe"
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
                icon={
                  <Ionicons
                    name="chatbubbles"
                    size={24}
                    color={!focused ? "#B2BBC6" : "#a241ee"}
                  />
                }
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
                icon={
                  <FontAwesome5
                    name="user-circle"
                    size={24}
                    color={!focused ? "#B2BBC6" : "#a241ee"}
                  />
                }
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="#ffff" style="dark" />
    </>
  );
};

export default TabsLayout;
