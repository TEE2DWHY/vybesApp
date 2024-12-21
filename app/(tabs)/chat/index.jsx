import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { connectSocket, disconnectSocket } from "../../../config/socket";
import { useToken } from "../../../hooks/useToken";
import { useAccount } from "../../../hooks/useAccount";
import axios from "axios";
import { Spinner } from "../../../components/Spinner";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ChatModal from "../../../modal/ChatModal";
import { StatusBar } from "expo-status-bar";
import Empty from "./components/Empty";
import HeaderComponent from "./components/HeaderComponent";
import { router } from "expo-router";
import { format, parseISO, isToday } from "date-fns";

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
          "http://localhost:8000/v1/contact/contacts/confirmed",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setContacts(response.data.payload);
        console.log(response.data?.payload);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      getMyContacts();
      socket.current = connectSocket(user?._id); // Initialize socket connection

      socket.current.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      socket.current.on("getMessage", (message) => {
        // Update contacts with the new message
        setContacts((prevContacts) => {
          return prevContacts.map((contact) => {
            if (
              contact.contact._id === message.senderId ||
              contact.user._id === message.senderId
            ) {
              return {
                ...contact,
                lastMessage: message.text,
                time: message.createdAt,
              };
            }
            return contact;
          });
        });
      });
    }

    // Cleanup socket connection on component unmount
    return () => {
      disconnectSocket(); // Properly disconnect socket when the component is unmounted
    };
  }, [token]); // Make sure the useEffect reruns when token or user changes

  const formatTime = (timeString) => {
    if (!timeString) {
      return ""; // Return an empty string or a fallback value if timeString is invalid
    }

    const date = parseISO(timeString);
    return isToday(date) ? format(date, "HH:mm") : format(date, "EEE, HH:mm");
  };

  const renderItem = ({ item }) => {
    const currentUserIsContact = item.contact._id === user?._id;
    const contact = currentUserIsContact ? item.user : item.contact;
    const lastMessage = item.lastMessage;
    const isOnline = onlineUsers.some((user) => user.userId === contact._id);
    const formattedTime = item.time
      ? formatTime(item.time)
      : `Say hi to ${contact?.userName}`;

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
          <View className="flex-1">
            <View className="flex-row items-center justify-between">
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
              <Text className={`text-[#546881] font-axiformaRegular text-sm`}>
                {formattedTime}
              </Text>
            </View>
            <View className="flex-row items-center gap-2 w-[90%]">
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
                  <Text className="text-[#909DAD] font-axiformaRegular text-sm flex-1">
                    {lastMessage.text || lastMessage}
                  </Text>
                </>
              ) : (
                // Display default message when lastMessage is null
                <Text className="text-[#909DAD] font-axiformaRegular text-sm">
                  Start a conversation with {contact.userName}
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
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
            keyExtractor={(item) => item.contact?._id}
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
