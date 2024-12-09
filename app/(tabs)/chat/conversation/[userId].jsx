import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import DatingTips from "../components/DatingTips";
import * as ImagePicker from "expo-image-picker";
import { io } from "socket.io-client";
import { useToken } from "../../../../hooks/useToken";
import axios from "axios";
import { useAccount } from "../../../../hooks/useAccount";
import { formatMessageTime } from "../../../../utils/formatMessageTime";
import { format, isToday } from "date-fns";

const Conversation = () => {
  const { user } = useAccount();
  const params = useLocalSearchParams();
  const { userId } = params;
  const token = useToken();
  const [showModal, setShowModal] = useState(false);
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showTips, setShowTips] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [socket, setSocket] = useState(null);
  const [contact, setContact] = useState({});
  const [chat, setChat] = useState();
  const [chatId, setChatId] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isMessageEmitted, setIsMessageEmitted] = useState();
  const messagesScrollViewRef = useRef();
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    messagesScrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  useEffect(() => {
    if (socket && contact?._id) {
      socket.emit("addNewUser ", contact._id);
      socket.on("getOnlineUsers", (res) => {
        setOnlineUsers(res.map((user) => user.userId));
        console.log("Received online users:", res);
      });
    }
  }, [socket, contact]);

  const handleTyping = (text) => {
    setMessage(text);
    if (text) {
      // Emit typing event to the recipient only
      socket.emit("typing", { recipientId: userId });
      setIsTyping(true);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        socket.emit("stopTyping", { recipientId: userId });
      }, 1000);
    } else {
      setIsTyping(false);
      socket.emit("stopTyping", { recipientId: userId });
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("typing", (data) => {
        if (data.recipientId === userId) {
          setIsTyping(true);
        }
      });

      socket.on("stopTyping", (data) => {
        if (data.recipientId === userId) {
          setIsTyping(false);
        }
      });

      return () => {
        socket.off("typing");
        socket.off("stopTyping");
      };
    }
  }, [socket, userId]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/v1/user/get-user-by-id/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data);
        setContact(response.data.payload.user);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    if (token) {
      getUser();
    }
  }, [token]);

  const createChat = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/v1/chat",
        {
          recipientId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data.payload);
      setChatId(response.data.payload._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getChat = async () => {
    if (!chatId) {
      console.log("Chat ID is null, skipping message fetch.");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8000/v1/chat/find/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setChat(response.data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getChat();
    }
  }, [token, chatId]);

  useEffect(() => {
    if (token) {
      createChat();
    }
  }, [token]);

  useEffect(() => {
    const newSocket = io("https://550a-102-88-71-68.ngrok-free.app");
    setSocket(newSocket);
    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket && contact?._id) {
      socket.emit("addNewUser", contact._id);
      socket.on("getOnlineUsers", (res) => {
        setOnlineUsers(res);
        console.log("Received online users:", res);
      });
    }
  }, [socket, contact]);

  useEffect(() => {
    if (socket === null) return;
    const recipientId = chat?.members?.find((id) => id !== user?._id);
    socket.emit("sendMessage", { ...message, recipientId });
  }, [message, socket]);

  const sendMessage = async () => {
    if (!chatId) {
      console.log("Chat ID is null, cannot send message.");
      return;
    }
    console.log(onlineUsers);

    // const recipientOnline = onlineUsers.includes(userId);
    // if (!recipientOnline) {
    //   console.log("Recipient is not online, cannot send message.");
    //   return;
    // }

    try {
      const response = await axios.post(
        "http://localhost:8000/v1/messages/send-message",
        {
          chatId: chatId,
          receiverId: userId,
          text: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newMessage = {
        ...response.data.payload,
        senderId: user._id,
      };

      setMessages((prev) => [...prev, newMessage]); // Update messages state
      setMessage(""); // Clear the input field
      messagesScrollViewRef.current?.scrollToEnd({ animated: true });

      socket.emit("sendMessage", { ...newMessage, recipientId: userId });
      console.log("Emitted message to recipient:", newMessage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("getMessage", (res) => {
        console.log("Received message:", res);
        if (chatId === res.chatId) {
          setMessages((prev) => [...prev, res]); // Update messages state
          console.log("Updated messages:", [...messages, res]); // Log updated messages
        }
      });

      return () => {
        socket.off("getMessage");
      };
    }
  }, [socket, chatId, isMessageEmitted]);

  const handleImageSelect = async () => {
    try {
      const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status.granted) {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          const newMessage = {
            id: messages.length + 1,
            sender: "me",
            image: result.assets[0].uri,
            time: getCurrentTime(),
            status: "sent",
          };
          setMessages([...messages, newMessage]);
        }
      } else {
        console.log("Permission denied");
      }
    } catch (error) {
      console.log("ImagePicker Error:", error);
    }
  };

  const getMessages = async () => {
    if (!chatId) {
      console.log("Chat ID is null, skipping message fetch.");
      return; // Skip fetching messages if chatId is null
    }

    try {
      const response = await axios.get(
        `http://localhost:8000/v1/messages/${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data.payload);
      setMessages(response.data.payload); // Assuming the response contains the messages
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getMessages();
    }
  }, [token, chatId]);

  const navigation = useNavigation();
  const attachmentModalRef = useRef(null);

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

  const handleLongPress = (msg) => {
    setSelectedMessage(msg);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMessage(null);
    setMessage("");
  };

  const handleEditMessage = () => {
    if (selectedMessage) {
      setMessage(selectedMessage.text);
      setShowModal(false);
    }
  };

  const handleAttachmentSelect = (type) => {
    console.log(`Selected attachment type: ${type}`);

    if (attachmentModalRef.current) {
      attachmentModalRef.current.close();
    }
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    if (isToday(date)) {
      // If the date is today, return only the time
      return format(date, "HH:mm"); // 24-hour format
    } else {
      // If the date is not today, return the date and time
      return format(date, "dd/MM/yyyy HH:mm"); // Date and time
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView className="bg-white-normal h-full mt-12 my-4">
            <View className="flex-row items-center p-4">
              <View className="flex-row gap-3 items-center w-[75%]">
                <AntDesign
                  name="left"
                  size={24}
                  color="#546881"
                  onPress={() => router.push("/chat")}
                />
                <View className="flex-row items-center ml-2 flex-1">
                  <Image
                    source={{
                      uri: contact.image,
                    }}
                    className="w-10 h-10 rounded-full"
                  />
                  <View className="ml-2 flex-1">
                    <Text className="text-[#6890BF] font-axiformaBlack capitalize">
                      @{contact?.userName}
                    </Text>
                    {isTyping && (
                      <View className="flex-row items-center justify-start mt-1">
                        <Text className="text-gray-500 font-axiformaRegular text-sm">
                          {contact.userName} is typing...
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              {/* Adjusted icons container */}
              <View className="flex-row gap-4 items-center">
                <AntDesign name="videocamera" size={24} color="#7A91F9" />
                <Ionicons name="call-outline" size={24} color="#7A91F9" />
                <Entypo
                  name="dots-three-vertical"
                  size={24}
                  color="#7A91F9"
                  onPress={() => console.log("More options")}
                />
              </View>
            </View>

            <ScrollView>
              <DatingTips
                showTips={() => setShowTips(true)}
                closeTips={() => setShowTips(false)}
                tips={showTips}
                userName={contact?.userName}
                accountType={contact?.accountType}
                gender={contact?.gender}
              />
            </ScrollView>

            {!showTips && (
              <ScrollView
                className="flex-2 px-4 h-[60vh]"
                ref={messagesScrollViewRef}
                onContentSizeChange={() =>
                  messagesScrollViewRef.current.scrollToEnd({ animated: true })
                }
              >
                {messages.map((msg, index) => {
                  const messageDate = new Date(msg.createdAt);
                  const showDateHeader =
                    index === 0 ||
                    new Date(messages[index - 1].createdAt).toDateString() !==
                      messageDate.toDateString();

                  return (
                    <View key={msg._id}>
                      {showDateHeader && (
                        <Text className="text-center text-gray-400 my-2 font-axiformaRegular">
                          {isToday(messageDate)
                            ? format(messageDate, "dd/MM/yyyy")
                            : format(messageDate, "dd/MM/yyyy HH:mm")}
                        </Text>
                      )}
                      <TouchableOpacity
                        onLongPress={() => handleLongPress(msg)}
                      >
                        <View
                          className={`my-2 flex-row items-end ${
                            msg.senderId === user._id
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <View
                            className={`p-3 rounded-lg ${
                              msg.text
                                ? msg.senderId === user._id
                                  ? "bg-[#5C6DBB] rounded-tr-[40px] rounded-tl-[40px] rounded-br-[4px] rounded-bl-[40px] pt-6 px-4"
                                  : "bg-[#D6DDFD] rounded-tr-[40px] rounded-tl-[40px] rounded-br-[40px] rounded-bl-[4px] pt-6 px-4"
                                : "bg-transparent"
                            }`}
                          >
                            {msg.image ? (
                              <Image
                                source={{ uri: msg.image }}
                                className="w-[280px] h-[160px]"
                                resizeMode="cover"
                              />
                            ) : (
                              <Text
                                className={`${
                                  msg.senderId === user._id
                                    ? "text-[#ffff]"
                                    : "text-[#3D4C5E]"
                                } font-axiformaRegular`}
                              >
                                {msg.text}
                              </Text>
                            )}
                            <View className="flex-row items-center justify-end">
                              <Text
                                className={`${
                                  msg.senderId === user._id
                                    ? "text-[#fff]"
                                    : "text-gray-500"
                                } text-xs mr-2 font-axiformaRegular mt-2`}
                              >
                                {formatMessageTime(msg.createdAt)}
                              </Text>
                            </View>
                          </View>
                        </View>
                        {msg.senderId === user._id && (
                          <View className="self-end">
                            <Ionicons
                              name={
                                msg.status === "read"
                                  ? "checkmark-done"
                                  : msg.status === "delivered"
                                  ? "checkmark"
                                  : "checkmark-outline"
                              }
                              size={18}
                              color="#9941EE"
                            />
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            )}
            <Modal visible={showModal} transparent={true} animationType="slide">
              <View className="flex-1 justify-center items-center bg-[#1b1b1ba0] bg-opacity-50">
                <View className="w-4/5 bg-white-normal p-4 rounded-lg">
                  {selectedMessage && (
                    <>
                      <TouchableOpacity onPress={handleEditMessage}>
                        <Text className="text-base text-[#3D4C5E] mb-3 font-axiformaRegular">
                          Edit Message
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => console.log("Delete message")}
                      >
                        <Text className="text-base text-[#3D4C5E] mb-3 font-axiformaRegular">
                          Delete Message
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => console.log("React with emoji")}
                      >
                        <Text className="text-base text-[#3D4C5E] mb-3 font-axiformaRegular">
                          React With Emoji
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                  <TouchableOpacity
                    onPress={handleCloseModal}
                    className="self-end"
                  >
                    <Text className="text-base text-red-500 mt-4">Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View className="flex-row items-center justify-between w-[93%] border-2 border-[#F3F9FF] bg-white-normal p-4 rounded-md self-center mb-2 mx-4">
              <View className="flex-row items-center gap-4 flex-1">
                <Entypo
                  name="attachment"
                  size={24}
                  color="#B2BBC6"
                  onPress={() => setShowAttachmentModal(true)}
                />
                <TextInput
                  className="text-[#3D4C5E] font-axiformaRegular flex-1"
                  placeholder="Type a Message..."
                  multiline={true}
                  textAlignVertical="top"
                  value={message}
                  onChangeText={handleTyping}
                />
              </View>

              <View className="absolute bottom-0 left-0 right-0 flex-col items-center w-[93%] self-center mb-2 mx-4">
                <Modal
                  visible={showAttachmentModal}
                  transparent={true}
                  animationType="slide"
                  onRequestClose={() => setShowAttachmentModal(false)}
                >
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setShowAttachmentModal(false)}
                    className="flex-1 justify-end items-center bg-[#1b1b1ba0] bg-opacity-50"
                  >
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => console.log("Pressed")}
                      className="w-[90%] bg-white-normal p-6 rounded-lg items-center"
                    >
                      <View className="flex-row items-center justify-between w-[90%] mb-2">
                        <View className="flex-col items-center mb-4">
                          <TouchableOpacity
                            className="justify-center items-center w-12 h-12 rounded-full bg-[#FBF7F7] border border-[#F3E5E7]"
                            onPress={() => handleAttachmentSelect("Audio")}
                          >
                            <Ionicons
                              name="headset"
                              size={30}
                              color="#D8ACB2"
                            />
                          </TouchableOpacity>
                          <Text className="text-center mt-2 font-axiformaRegular text-[#3D4C5E]">
                            Audio
                          </Text>
                        </View>

                        <View className="flex-col items-center mb-4">
                          <TouchableOpacity
                            className="px-4 py-2 rounded-full justify-center items-center bg-[#FDEFEA] border border-[#FACDBE]"
                            onPress={() => handleAttachmentSelect("Camera")}
                          >
                            <AntDesign
                              name="camera"
                              size={30}
                              color="#EE5D2D"
                            />
                          </TouchableOpacity>
                          <Text className="text-center mt-2 font-axiformaRegular text-[#3D4C5E]">
                            Camera
                          </Text>
                        </View>

                        <View className="flex-col items-center mb-4">
                          <TouchableOpacity
                            className="px-4 py-2 rounded-full justify-center items-center bg-[#F2F4FE] border border-[#D6DDFD]"
                            onPress={() => handleAttachmentSelect("Document")}
                          >
                            <Ionicons
                              name="document"
                              size={30}
                              color="#7A91F9"
                            />
                          </TouchableOpacity>
                          <Text className="text-center mt-2 font-axiformaRegular text-[#3D4C5E]">
                            Document
                          </Text>
                        </View>
                      </View>
                      <View className="flex-row items-center justify-between w-[90%]">
                        <View className="flex-col items-center mb-4">
                          <TouchableOpacity
                            className="px-4 py-2 rounded-full justify-center items-center  bg-[#FFF7EE] border border-[#FFE7CA]"
                            onPress={handleImageSelect}
                          >
                            <Ionicons name="image" size={30} color="#FFB053" />
                          </TouchableOpacity>
                          <Text className="text-center mt-2 font-axiformaRegular text-[#3D4C5E]">
                            Gallery
                          </Text>
                        </View>
                        <View className="flex-col items-center mb-4">
                          <TouchableOpacity
                            className="px-4 py-2 rounded-full justify-center items-center  bg-[#B1C3FF] border border-[#F7F9FF]"
                            onPress={() => handleAttachmentSelect("Gallery")}
                          >
                            <Ionicons
                              name="location"
                              size={30}
                              color="#E7ECFF"
                            />
                          </TouchableOpacity>
                          <Text className="text-center mt-2 font-axiformaRegular text-[#3D4C5E]">
                            Location
                          </Text>
                        </View>
                        <View className="flex-col items-center mb-4">
                          <TouchableOpacity
                            className="px-4 py-2 rounded-full justify-center items-center  bg-[#FFF3F1] border border-[#FFD9D4]"
                            onPress={() =>
                              handleAttachmentSelect("VoiceRecord")
                            }
                          >
                            <Ionicons name="mic" size={30} color="#FF8674" />
                          </TouchableOpacity>
                          <Text className="text-center mt-2 font-axiformaRegular text-[#3D4C5E]">
                            Voice Record
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </TouchableOpacity>
                </Modal>
              </View>

              <View className="flex-row items-center gap-4 ml-2">
                {message.length === 0 ? (
                  <>
                    <AntDesign name="camera" size={24} color="#B2BBC6" />
                    <MaterialIcons
                      name="keyboard-voice"
                      size={24}
                      color="#9941EE"
                      onPress={() => console.log("Record voice")}
                    />
                  </>
                ) : (
                  <TouchableOpacity onPress={sendMessage}>
                    <Ionicons name="send" size={24} color="#9941EE" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default Conversation;
