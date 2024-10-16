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
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import DatingTips from "./components/DatingTips";
import * as ImagePicker from "expo-image-picker";

const Conversation = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [message, setMessage] = useState("");
  const [showTips, setShowTips] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  // const [localStream, setLocalStream] = useState(null);
  // const [remoteStream, setRemoteStream] = useState(null);

  // const localVideoRef = useRef(null);
  // const remoteVideoRef = useRef(null);

  // useEffect(() => {
  //   const requestPermissions = async () => {
  //     try {
  //       const granted = await PermissionsAndroid.requestMultiple([
  //         PermissionsAndroid.PERMISSIONS.CAMERA,
  //         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  //       ]);
  //       if (
  //         granted["android.permission.CAMERA"] === "granted" &&
  //         granted["android.permission.RECORD_AUDIO"] === "granted"
  //       ) {
  //         console.log("Permissions granted");
  //       } else {
  //         console.log("Permissions denied");
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   };
  //   requestPermissions();

  //   return () => {
  //     if (localStream) {
  //       localStream.getTracks().forEach((track) => track.stop());
  //     }
  //     if (remoteStream) {
  //       remoteStream.getTracks().forEach((track) => track.stop());
  //     }
  //   };
  // }, []);

  // const startCall = async () => {
  //   // ... Implementation for getting your local media stream (camera and microphone)
  //   // ... Implement signaling logic to connect to the other user
  // };

  // const endCall = () => {
  //   setIsCalling(false);
  // };

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

  const [messages, setMessages] = useState([
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

  const handleSend = () => {
    if (message.trim()) {
      if (selectedMessage) {
        const updatedMessages = messages.map((msg) =>
          msg.id === selectedMessage.id
            ? { ...msg, text: message, time: getCurrentTime() }
            : msg
        );
        setMessages(updatedMessages);
        setSelectedMessage(null);
      } else {
        const newMessage = {
          id: messages.length + 1,
          sender: "me",
          text: message,
          time: getCurrentTime(),
          status: "sent",
        };
        setMessages([...messages, newMessage]);
      }
      setMessage("");
    }
  };

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

  return (
    <>
      <SafeAreaView className="bg-white-normal h-full mt-12">
        <View className="flex-row items-center justify-between p-4">
          <View className="flex-row gap-3 items-center">
            <AntDesign
              name="left"
              size={24}
              color="#546881"
              onPress={() => router.push("/chat")}
            />
            <View className="flex-row items-center ml-2">
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/women/3.jpg",
                }}
                className="w-10 h-10 rounded-full"
              />
              <Text className="ml-2 text-[#6890BF] font-axiformaBlack capitalize">
                @dhemmexroxy
              </Text>
            </View>
          </View>
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
        </View>

        <ScrollView>
          <DatingTips
            showTips={() => setShowTips(true)}
            closeTips={() => setShowTips(false)}
            tips={showTips}
          />
        </ScrollView>

        {!showTips && (
          <ScrollView className="flex-2 px-4">
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
                      msg.image
                        ? " bg-[#5C6DBB] rounded-tl-[4px]  rounded-tr-[20px]"
                        : msg.sender === "me"
                        ? "bg-[#5C6DBB] rounded-tr-[40px] rounded-tl-[40px] rounded-br-[4px] rounded-bl-[40px] pt-6 px-4"
                        : "bg-[#D6DDFD] rounded-tr-[40px] rounded-tl-[40px] rounded-br-[40px] rounded-bl-[4px] pt-6 px-4"
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
                        className={` ${
                          msg.sender === "me"
                            ? "text-[#ffff]"
                            : "text-[#3D4C5E]"
                        } font-axiformaRegular`}
                      >
                        {msg.text}
                      </Text>
                    )}
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
              <TouchableOpacity onPress={handleCloseModal} className="self-end">
                <Text className="text-base text-red-500 mt-4">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between w-[93%] border-2 border-[#F3F9FF] bg-white-normal p-4 rounded-md self-center mb-2 mx-4">
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
              onChangeText={setMessage}
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
                        <Ionicons name="headset" size={30} color="#D8ACB2" />
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
                        <AntDesign name="camera" size={30} color="#EE5D2D" />
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
                        <Ionicons name="document" size={30} color="#7A91F9" />
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
                        <Ionicons name="location" size={30} color="#E7ECFF" />
                      </TouchableOpacity>
                      <Text className="text-center mt-2 font-axiformaRegular text-[#3D4C5E]">
                        Location
                      </Text>
                    </View>
                    <View className="flex-col items-center mb-4">
                      <TouchableOpacity
                        className="px-4 py-2 rounded-full justify-center items-center  bg-[#FFF3F1] border border-[#FFD9D4]"
                        onPress={() => handleAttachmentSelect("VoiceRecord")}
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
              <TouchableOpacity onPress={handleSend}>
                <Ionicons name="send" size={24} color="#9941EE" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Conversation;
