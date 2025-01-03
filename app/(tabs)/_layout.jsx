import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, Platform } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Foundation from "@expo/vector-icons/Foundation";
import AccountWrapper from "../../hooks/useAccount";

const TabIcon = ({ icon, name, focused }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
      }}
    >
      <View style={{ marginBottom: 2 }}>{icon}</View>
      <Text
        style={{
          fontFamily: focused ? "axiformaMedium" : "axiformaRegular",
          color: focused ? "#9941EE" : "#B2BBC6",
          fontSize: Platform.OS === "ios" ? 9 : 12,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <AccountWrapper>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#9941EE",
          tabBarInactiveTintColor: "#B2BBC6",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 0,
            height: 80,
            paddingTop: 10,
            paddingBottom: 10,
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
                    color={focused ? "#9941EE" : "#B2BBC6"}
                  />
                }
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
                    color={focused ? "#9941EE" : "#B2BBC6"}
                  />
                }
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
                    color={focused ? "#9941EE" : "#B2BBC6"}
                  />
                }
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
                    color={focused ? "#9941EE" : "#B2BBC6"}
                  />
                }
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
                    color={focused ? "#9941EE" : "#B2BBC6"}
                  />
                }
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="#fff" style="dark" />
    </AccountWrapper>
  );
};

export default TabsLayout;
