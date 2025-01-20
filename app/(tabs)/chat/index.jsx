import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
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
import { setItem, getItem } from "../../../utils/AsyncStorage";

const Chat = () => {
  const token = useToken();
  const { user } = useAccount();
  const [contacts, setContacts] = useState([]);
  const [pinnedChat, setPinnedChat] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef(null);

  // Retrieve pinned chat from AsyncStorage when the app loads
  useEffect(() => {
    const getPinnedChat = async () => {
      const savedPinnedChat = await getItem("pinnedChat");
      if (savedPinnedChat) {
        setPinnedChat(savedPinnedChat); // Set the saved pinned chat
      }
    };

    getPinnedChat();

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
      socket.current = connectSocket(user?._id);

      socket.current.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      socket.current.on("getMessage", (message) => {
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

    return () => {
      disconnectSocket();
    };
  }, [token]);

  // Save pinned chat to AsyncStorage whenever it changes
  useEffect(() => {
    if (pinnedChat) {
      setItem("pinnedChat", pinnedChat); // Use your setItem function to save pinned chat
    }
  }, [pinnedChat]);

  const formatTime = (timeString) => {
    if (!timeString) {
      return "";
    }

    const date = parseISO(timeString);
    return isToday(date) ? format(date, "HH:mm") : format(date, "EEE, HH:mm");
  };

  const handleLongPress = (contact) => {
    const isCurrentlyPinned =
      pinnedChat && pinnedChat.contact._id === contact.contact._id;

    Alert.alert(
      "Chat Options",
      isCurrentlyPinned
        ? "What would you like to do?"
        : "What would you like to do?",
      [
        {
          text: isCurrentlyPinned ? "Unpin Chat" : "Pin Chat",
          onPress: () => (isCurrentlyPinned ? unpinChat() : pinChat(contact)),
        },
        {
          text: "Delete Chat",
          onPress: () => deleteChat(contact),
        },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const pinChat = (contact) => {
    // Set the pinned chat
    setPinnedChat(contact);
  };

  const unpinChat = () => {
    setPinnedChat(null); // Unpin the currently pinned chat
  };

  const deleteChat = (contact) => {
    setContacts((prevContacts) =>
      prevContacts.filter((c) => c.contact._id !== contact.contact._id)
    );
    if (pinnedChat && pinnedChat.contact._id === contact.contact._id) {
      setPinnedChat(null); // Unpin if the deleted chat was pinned
    }
  };

  const renderItem = ({ item }) => {
    const currentUserIsContact = item.contact._id === user?._id;
    const contact = currentUserIsContact ? item.user : item.contact;
    const lastMessage = item.lastMessage;
    const isOnline = onlineUsers.some((user) => user.userId === contact._id);
    const formattedTime = item.time
      ? formatTime(item.time)
      : `Say hi to ${contact?.userName}`;

    const isPinned = pinnedChat && pinnedChat.contact._id === contact._id;

    return (
      <TouchableOpacity
        onLongPress={() => handleLongPress(item)}
        onPress={() => router.push(`/chat/conversation/${contact._id}`)}
      >
        <View className="flex-row items-center justify-between my-2 border-b border-b-gray-200 pb-2">
          <View className="flex-row items-center gap-4">
            <Image
              source={{ uri: contact.image }}
              className="w-12 h-12 rounded-full"
            />
            <View className="flex-1">
              <View className="flex-row items-center justify-between text-purple-normal">
                <View className="flex-row items-center gap-2">
                  <Text className="text-[#495795] font-axiformaBlack text-base capitalize">
                    {contact.userName}
                  </Text>
                  {isPinned && (
                    <MaterialCommunityIcons
                      name="pin"
                      size={17}
                      color="#a241ee;"
                    />
                  )}
                  {isOnline && (
                    <View className="bg-green-500 w-2 h-2 rounded-full" />
                  )}
                </View>
                <Text className="text-[#546881] font-axiformaRegular text-sm">
                  {formattedTime}
                </Text>
              </View>
              <View className="flex-row items-center gap-2 w-[90%]">
                {lastMessage ? (
                  <Text className="text-[#909DAD] font-axiformaRegular text-sm flex-1">
                    {lastMessage.text || lastMessage}
                  </Text>
                ) : (
                  <Text className="text-[#909DAD] font-axiformaRegular text-sm">
                    Start a conversation with {contact.userName}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const filteredContacts = pinnedChat
    ? contacts.filter(
        (contact) => contact.contact._id !== pinnedChat.contact._id
      ) // Exclude pinned contact from the list
    : contacts;

  return (
    <>
      <SafeAreaView className="h-full pt-4">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <Spinner />
          </View>
        ) : (
          <FlatList
            className="mb-14"
            data={[pinnedChat, ...filteredContacts].filter(Boolean)} // Add pinned chat first
            renderItem={renderItem}
            keyExtractor={(item, index) => {
              if (item.contact?._id) {
                return item.contact._id; // If it's a contact, use the contact's ID
              } else {
                // If it's the pinned chat, append a unique prefix
                return `pinned-${item.contact._id}`;
              }
            }}
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
