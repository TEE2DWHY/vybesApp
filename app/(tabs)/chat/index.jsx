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
import { useAccount } from "../../../hooks/useAccount";

const Chat = () => {
  const token = useToken();
  const { user } = useAccount();
  const [contacts, setContacts] = useState([]);
  const [showChatModal, setShowChatModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    const getMyContacts = async () => {
      try {
        const response = await axios.get(
          "https://vybesapi.onrender.com/v1/contact/contacts/confirmed",
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
    socket.current = io("https://d744-37-120-216-234.ngrok-free.app");

    socket.current.on("connect", () => {
      console.log("Socket connected:", socket.current.id); // Log the socket connection
    });

    socket.current.on("disconnect", () => {
      console.log("Socket disconnected.");
    });

    // Emit user ID for each contact to register as online
    if (contacts.length > 0) {
      contacts.forEach((contact) => {
        // Check if the current contact is the logged-in user
        const currentUserIsContact = contact.contact._id === user?._id;
        console.log("currentUserIsContact", currentUserIsContact); // Log to check if it's the current user

        // Log the contact and user to see which user is being emitted
        const contactId = currentUserIsContact
          ? contact.user._id
          : contact.contact._id;
        const contactName = currentUserIsContact
          ? contact.user.userName
          : contact.contact.userName;

        console.log(
          "Emitting addNewUser for contact:",
          contactId,
          "Contact Name:",
          contactName
        );

        // Emit the appropriate user ID (contact or user)
        socket.current.emit("addNewUser", contactId);
      });
    }

    // Listen for online users
    socket.current.on("getOnlineUsers", (users) => {
      console.log("Received online users:", users); // Log the users from the server
      const onlineUserIds = users.map((user) => user.userId); // Extract userIds
      console.log("Online user IDs:", onlineUserIds); // Log the user IDs from the server
      setOnlineUsers(onlineUserIds);
    });

    return () => {
      socket.current.disconnect(); // Clean up on unmount
      console.log("Socket disconnected.");
    };
  }, [contacts, user]); // Add user to dependency array to track user changes

  // Only re-run when contacts change

  const renderItem = ({ item }) => {
    const currentUserIsContact = item.contact._id === user?._id;
    console.log(currentUserIsContact);
    const contact = currentUserIsContact ? item.user : item.contact;
    const lastMessage = item.lastMessage;
    const isOnline = onlineUsers.includes(item.contact?._id);
    console.log(isOnline);

    return (
      <View className="flex-row items-center justify-between my-4">
        <TouchableOpacity
          className="flex-row items-center gap-4"
          onPress={() => router.push(`/chat/conversation/${contact._id}`)}
        >
          <Image
            source={{ uri: contact.image }}
            className="w-12 h-12 rounded-full"
          />
          <View>
            <View className="flex-row items-center gap-2">
              <Text className="text-[#495795] font-axiformaBlack text-base capitalize">
                {contact.userName}
              </Text>
              <View
                className={`${
                  contact.accountType === "vyber"
                    ? "bg-[#7A91F9]"
                    : "bg-[#AAD9C3]"
                } px-2 py-1 rounded-md`}
              >
                <Text
                  className={`text-white font-axiformaRegular text-xs capitalize ${
                    contact.accountType === "vyber"
                      ? "text-[#224d7f]"
                      : "text-[#6BADA9]"
                  }`}
                >
                  {contact.accountType}
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
                  Start a conversation with {contact.userName}
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
        {loading ? (
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
