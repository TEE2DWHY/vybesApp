import { useState, useEffect, useRef, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import DatingTips from "../components/DatingTips";
import { connectSocket } from "../../../../config/socket";
import { useToken } from "../../../../hooks/useToken";
import axios from "axios";
import { useAccount } from "../../../../hooks/useAccount";
import * as Notifications from "expo-notifications";
import { Audio } from "expo-av";
import Header from "./components/ChatHeader";
import Messages from "./components/Messages";
import MessageModal from "./components/MessageModal";
import InputArea from "./components/InputArea";
import AttachmentModal from "./components/AttachmentModal";
import Camera from "../camera";

// Notification configuration
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

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
  const [socket, setSocket] = useState(null);
  const [contact, setContact] = useState({});
  const [chat, setChat] = useState();
  const [chatId, setChatId] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const messagesScrollViewRef = useRef();
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const recordingIntervalRef = useRef(null);
  const [sound, setSound] = useState();
  const [playingMessageId, setPlayingMessageId] = useState(null);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    messagesScrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleTyping = (text) => {
    setMessage(text);
    if (text) {
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
    const newSocket = connectSocket(user?._id);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });

    newSocket.on("typing", (data) => {
      if (data?.recipientId === userId) {
        setIsTyping(true);
      }
    });

    newSocket.on("stopTyping", (data) => {
      if (data?.recipientId === userId) {
        setIsTyping(false);
      }
    });

    newSocket.on("getMessage", (res) => {
      if (chatId === res.chatId) {
        setMessages((prev) => [...prev, res]);
        Notifications.scheduleNotificationAsync({
          content: {
            title: "Vybes App New Message",
            body: res.text,
          },
          trigger: null,
        });
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user, chatId]);

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission for notifications was not granted.");
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `https://vybesapi.onrender.com/v1/user/get-user-by-id/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setContact(response.data?.payload.user);
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    };
    if (token) {
      getUser();
    }
  }, [token]);

  const createChat = async () => {
    try {
      const response = await axios.post(
        "https://vybesapi.onrender.com/v1/chat",
        {
          recipientId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChatId(response.data.payload._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getChat = async () => {
    if (!chatId) {
      console.log("Chat ID is null , skipping message fetch.");
      return;
    }
    try {
      const response = await axios.get(
        `https://vybesapi.onrender.com/v1/chat/find/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

  const sendMessage = async () => {
    if (!chatId) {
      console.log("Chat ID is null, cannot send message.");
      return;
    }
    if (!socket || !socket.connected) {
      console.log("Socket is not connected, cannot send message.");
      return;
    }
    try {
      const response = await axios.post(
        "https://vybesapi.onrender.com/v1/messages/send-message",
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
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
      messagesScrollViewRef.current?.scrollToEnd({ animated: true });
      socket.emit("sendMessage", { ...newMessage, recipientId: userId });
      console.log("Emitted message to recipient:", newMessage);
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async () => {
    if (!chatId) {
      console.log("Chat ID is null, skipping message fetch.");
      return;
    }
    try {
      const response = await axios.get(
        `https://vybesapi.onrender.com/v1/messages/${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(response.data.payload);
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

  useEffect(() => {
    const initRecording = new Audio.Recording();
    setRecording(initRecording);
  }, []);

  async function startRecording() {
    if (isRecording) {
      console.log("Recording is already in progress.");
      return;
    }

    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
        setIsRecording(true);
        setRecordingDuration(0);
        recordingIntervalRef.current = setInterval(() => {
          setRecordingDuration((prev) => prev + 1);
        }, 1000);
      }
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  }

  async function stopRecording() {
    setIsRecording(false);
    clearInterval(recordingIntervalRef.current);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecording(null);
    setRecordingDuration(0);
    return uri;
  }

  const sendVoiceRecording = async () => {
    const uri = await stopRecording();
    console.log(uri);
    if (!uri) {
      console.log("No recording available to send.");
      return;
    }

    try {
      const response = await axios.post(
        "https://vybesapi.onrender.com/v1/messages/send-message",
        {
          chatId: chatId,
          receiverId: userId,
          audio: uri,
          duration: recordingDuration,
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
      setMessages((prev) => [...prev, newMessage]);
      messagesScrollViewRef.current?.scrollToEnd({ animated: true });
      socket.emit("sendMessage", { ...newMessage, recipientId: userId });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const playAudio = async (uri) => {
    if (sound) {
      await sound.playFromPositionAsync(playbackPosition * 1000);
      setIsPlaying(true);
    } else {
      const { sound: newSound } = await Audio.Sound.createAsync({ uri });
      setSound(newSound);
      await newSound.playFromPositionAsync(playbackPosition * 1000);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isPlaying) {
          setPlaybackPosition(status.positionMillis / 1000);
        } else {
          setIsPlaying(false);
        }

        if (status.didJustFinish) {
          setIsPlaying(false);
          setPlayingMessageId(null);
          setPlaybackPosition(0);
          newSound.unloadAsync();
          setSound(null);
        }
      });
    }
  };

  const pauseAudio = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
      const status = await sound.getStatusAsync();
      setPlaybackPosition(status.positionMillis / 1000);
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleAttachmentSelect = (type) => {
    if (attachmentModalRef.current) {
      attachmentModalRef.current.close();
    }
  };

  const handleShowCamera = () => {
    setShowCamera(true);
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView className="bg-white-normal h-full pt-12">
            {!showCamera ? (
              <>
                <Header
                  onBackPress={() => router.push("/chat")}
                  onUserPress={() => router.push(`/home/user/${contact?._id}`)}
                  contact={contact}
                  isTyping={isTyping}
                />
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

                <Messages
                  showTips={showTips}
                  user={user}
                  messages={messages}
                  pauseAudio={pauseAudio}
                  playAudio={playAudio}
                  sound={sound}
                  setIsPlaying={setIsPlaying}
                  setPlayingMessageId={setPlayingMessageId}
                  setPlaybackPosition={setPlaybackPosition}
                  playbackPosition={playbackPosition}
                  playingMessageId={playingMessageId}
                  formatDuration={formatDuration}
                  onLongPress={handleLongPress}
                  messagesScrollViewRef={messagesScrollViewRef}
                />

                <MessageModal
                  showModal={showModal}
                  setShowModal={setShowModal}
                  selectedMessage={selectedMessage}
                  setSelectedMessage={setSelectedMessage}
                  setMessage={setMessage}
                />

                <InputArea
                  message={message}
                  setMessage={setMessage}
                  sendMessage={sendMessage}
                  startRecording={startRecording}
                  stopRecording={stopRecording}
                  sendVoiceRecording={sendVoiceRecording}
                  handleTyping={handleTyping}
                  isRecording={isRecording}
                  setShowAttachmentModal={setShowAttachmentModal}
                  recordingDuration={recordingDuration}
                  setShowCamera={handleShowCamera}
                />

                <AttachmentModal
                  handleAttachmentSelect={handleAttachmentSelect}
                  setShowAttachmentModal={setShowAttachmentModal}
                  showAttachmentModal={showAttachmentModal}
                />
              </>
            ) : (
              <Camera
                chatId={chatId}
                userId={userId}
                token={token}
                socket={socket}
                user={user}
                setMessages={setMessages}
                messagesScrollViewRef={messagesScrollViewRef}
                setShowCamera={setShowCamera}
              />
            )}
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default Conversation;
