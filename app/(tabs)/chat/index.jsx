import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ChatModal from "../../../modal/ChatModal";
import { StatusBar } from "expo-status-bar";
import Empty from "./components/Empty";
import HeaderComponent from "./components/HeaderComponent";
import { router } from "expo-router";
import { useToken } from "../../../hooks/useToken";
import axios from "axios";
import { Spinner } from "../../../components/Spinner";
import { io } from "socket.io-client";

const Chat = () => {
  const token = useToken();
  const [contacts, setContacts] = useState([]);
  const [showChatModal, setShowChatModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState([]); // State to track online users
  const socket = useRef(null); // Use ref to hold socket instance

  useEffect(() => {
    const getMyContacts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/v1/contact/contacts/confirmed",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setContacts(response.data.payload);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      getMyContacts();
    }
  }, [token]);

  useEffect(() => {
    // Establish socket connection
    socket.current = io("http://localhost:8001");

    // Emit user ID for each contact to register as online
    if (contacts.length > 0) {
      contacts.forEach((contact) => {
        socket.current.emit("addNewUser ", contact.contact._id);
      });
    }

    // Listen for online users
    socket.current.on("getOnlineUsers", (users) => {
      const onlineUserIds = users.map((user) => user.userId); // Extract user IDs
      setOnlineUsers(onlineUserIds);
      console.log("Online Users:", onlineUserIds); // Log online users
    });

    return () => {
      socket.current.disconnect(); // Clean up on unmount
    };
  }, [contacts]);

  const renderItem = ({ item }) => {
    const lastMessage = item.lastMessage;
    const isOnline = onlineUsers.includes(item.contact._id);

    return (
      <View className="flex-row items-center justify-between my-4">
        <TouchableOpacity
          className="flex-row items-center gap-4"
          onPress={() => router.push(`/chat/conversation/${item.contact._id}`)}
        >
          <Image
            source={{ uri: item.contact.image }}
            className="w-12 h-12 rounded-full"
          />
          <View>
            <View className="flex-row items-center gap-2">
              <Text className="text-[#495795] font-axiformaBlack text-base capitalize">
                {item.contact.userName}
              </Text>
              <View
                className={`${
                  item.contact.accountType === "Vyber"
                    ? "bg-[#7A91F9]"
                    : "bg-[#AAD9C3]"
                } px-2 py-1 rounded-md`}
              >
                <Text
                  className={`text-white font-axiformaRegular text-xs capitalize ${
                    item.contact.accountType === "Vyber"
                      ? "text-[#224d7f]"
                      : "text-[#6BADA9]"
                  }`}
                >
                  {item.contact.accountType}
                </Text>
              </View>
              {isOnline && (
                <View className="bg-green-500 w-2 h-2 rounded-full" />
              )}
            </View>
            <View className="flex-row items-center gap- 2">
              {lastMessage ? (
                <>
                  {lastMessage.status === "read" ? (
                    <MaterialCommunityIcons
                      name="check-all"
                      size={16}
                      color="#A7C5EB"
                    />
                  ) : lastMessage.status === "delivered" ? (
                    <MaterialCommunityIcons
                      name="check"
                      size={16}
                      color="#F6C244"
                    />
                  ) : null}
                  <Text className="text-[#909DAD] font-axiformaRegular text-sm">
                    {lastMessage.text}
                  </Text>
                </>
              ) : (
                <Text className="text-[#909DAD] font-axiformaRegular text-sm">
                  Start a conversation with {item.contact.userName}
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <Text
            className={`text-[#546881] font-axiformaRegular text-sm items-end ${
              Platform.OS !== "ios" ? "mt-[-20px] ml-[-26px]" : ""
            }`}
          >
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView className="h-full mt-10">
        {loading ? ( // Show spinner while loading
          <View className="flex-1 justify-center items-center">
            <Spinner />
          </View>
        ) : (
          <FlatList
            className="mb-14"
            data={contacts}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            ListHeaderComponent={() => (
              <HeaderComponent
                showChatModal={() => setShowChatModal(!showChatModal)}
                data={contacts}
              />
            )}
            ListEmptyComponent={() => <Empty />}
            contentContainerStyle={{ paddingHorizontal: 15, marginTop: 15 }}
          />
        )}
      </SafeAreaView>
      {showChatModal && <ChatModal />}
      <StatusBar backgroundColor="#fff" style="dark" />
    </>
  );
};

export default Chat;
