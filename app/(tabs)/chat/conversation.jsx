import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import DatingTips from "./components/DatingTips";

const Conversation = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    // Sample messages
    {
      id: 0,
      sender: "me",
      text: "Hello, How are you?...",
      time: "11:55 AM",
      status: "seen",
    },
    {
      id: 1,
      sender: "other",
      text: "Yeah I am good, what about you?",
      time: "12:01 PM",
      status: "seen",
    },
    {
      id: 2,
      sender: "me",
      text: "I just viewed your profile...",
      time: "12:02 PM",
      status: "seen",
    },
    {
      id: 3,
      sender: "other",
      text: "Oh! Are you within Obantoko?",
      time: "12:04 PM",
      status: "seen",
    },
    {
      id: 4,
      sender: "me",
      text: "No, i'm presently at odeda...",
      time: "12:05 PM",
      status: "delivered",
    },
  ]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();
      if (parent) {
        parent.setOptions({
          tabBarStyle: { display: "none" },
        });

        return () => {
          parent.setOptions({
            tabBarStyle: undefined,
          });
        };
      }
    }, [navigation])
  );

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "me",
        text: message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "sent",
      };
      setMessages([...messages, newMessage]);
      setMessage(""); // Clear input after sending
    }
  };

  const handleLongPress = (msg) => {
    setSelectedMessage(msg);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMessage(null);
  };

  return (
    <>
      <SafeAreaView className="bg-white-normal h-full">
        <View className="flex-row items-center justify-between py-4 px-4"></View>
        <View className="flex-row gap-6">
          <AntDesign name="videocamera" size={24} color="#7A91F9" />
          <Ionicons name="call-outline" size={24} color="#7A91F9" />
          <Entypo
            name="dots-three-vertical"
            size={24}
            color="#7A91F9"
            onPress={() => console.log("More options")}
          />
        </View>

        <DatingTips />

        <ScrollView className="mt-10 px-4">
          {messages.map((msg) => (
            <TouchableOpacity
              key={msg.id}
              onLongPress={() => handleLongPress(msg)}
            >
              <View
                className={`my-2 flex-row items-end ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <View
                  className={`p-3 rounded-lg ${
                    msg.sender === "me"
                      ? "bg-[#5C6DBB] rounded-br-none"
                      : "bg-[#D6DDFD] rounded-bl-none"
                  }`}
                >
                  <Text
                    className={` ${
                      msg.sender === "me" ? "text-[#ffff]" : "text-[#3D4C5E]"
                    } font-axiformaRegular`}
                  >
                    {msg.text}
                  </Text>
                  <View className="flex-row items-center justify-end">
                    <Text
                      className={` ${
                        msg.sender === "me" ? "text-[#fff]" : "text-gray-500"
                      } text-xs mr-2 font-axiformaRegular mt-2`}
                    >
                      {msg.time}
                    </Text>
                  </View>
                </View>
              </View>
              {msg.sender === "me" && (
                <View className="self-end">
                  <Ionicons
                    name={
                      msg.status === "seen"
                        ? "checkmark-done"
                        : msg.status === "delivered"
                        ? "checkmark"
                        : "checkmark-outline"
                    }
                    size={18}
                    color={msg.status === "seen" ? "#9941EE" : "#FFB053"}
                  />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Conversation;
