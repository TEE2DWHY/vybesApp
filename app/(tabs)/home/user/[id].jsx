import React, { useEffect, useState, useRef } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  Animated,
  SafeAreaView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import locked from "../../../../assets/images/locked.png";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as LocalAuthentication from "expo-local-authentication";
import lockChats from "../../../../assets/images/lockchats.png";
import useFetch from "../../../../hooks/useFetch";
import { userInstance } from "../../../../config/axios";
import { useToken } from "../../../../hooks/useToken";
import { handleCall } from "../../../../utils/handleCall";
import axios from "axios";
import { useAccount } from "../../../../hooks/useAccount";
import { formatDistanceToNow } from "date-fns";

const UserProfile = () => {
  const params = useLocalSearchParams();
  const { id } = params;
  const token = useToken();
  const { user } = useAccount();
  const [isSubscribed, setIsSubscribed] = useState(null);
  const [storiesData, setStoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storiesMessage, setStoriesMessage] = useState("");

  const {
    payload,
    isLoading,
    message,
    error,
    setPayload,
    fetchData: getUser,
  } = useFetch({
    fn: userInstance,
    endpoint: `/get-user-by-id/${id}`,
    token: token,
  });

  useEffect(() => {
    if (token) {
      const fetchUsers = async () => {
        await getUser();
      };
      fetchUsers();
      setPayload(payload?.user);
    }
  }, [getUser]);

  const getAllSubscribers = async () => {
    try {
      const response = await axios.get(
        `https://vybesapi.onrender.com/v1/user/is-subscribed/${user?._id}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsSubscribed(response.data?.payload);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    if (token) {
      getAllSubscribers();
    }
  }, [token]);

  const getAllStories = async () => {
    try {
      if (!token) return;
      const response = await axios.get(
        `https://vybesapi.onrender.com/v1/story/get-all-user-stories/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStoriesMessage(response.data?.message);
      setStoriesData(response.data.payload || []);
    } catch (error) {
      console.error("Error fetching stories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllStories();
  }, [token]);

  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("My Stories");
  const animatedValue = useRef(new Animated.Value(0)).current;

  const colors = ["#800080", "#4B0082"];

  useEffect(() => {
    const startAnimation = () => {
      animatedValue.setValue(0);
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: false,
        })
      ).start();
    };

    startAnimation();
  }, [animatedValue]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: colors,
  });

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []);

  // Function to handle Biometric Authentication
  const handleBiometricAuth = async () => {
    try {
      const savedBiometrics = await LocalAuthentication.isEnrolledAsync();

      if (!savedBiometrics) {
        return Alert.alert(
          "Biometric record not found",
          "Please verify your identity with your password",
          [{ text: "OK" }]
        );
      }

      const biometricTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

      if (
        biometricTypes.includes(
          LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
        )
      ) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Authenticate with Face ID",
          cancelLabel: "Cancel",
          fallbackLabel: "Use Passcode",
          disableDeviceFallback: false,
        });

        if (result.success) {
          Alert.alert(
            "Authentication Success",
            "You are successfully authenticated."
          );
        } else {
          Alert.alert("Authentication Failed", "Please try again.");
        }
      } else {
        Alert.alert(
          "Face ID not supported",
          "Your device does not support Face ID."
        );
      }
    } catch (error) {
      console.error("Biometric authentication error:", error);
    }
  };

  const formatPostedTime = (createdAt) => {
    try {
      return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
    } catch (error) {
      console.error("Error formatting date:", error.message);
      return "Unknown time";
    }
  };

  return (
    <SafeAreaView className="mt-10">
      <ScrollView className="px-4">
        <View className="mt-4">
          <AntDesign
            name="left"
            size={24}
            color="black"
            onPress={() => router.push("/home")}
          />
          <View className="bg-white-normal rounded-2xl p-4 my-10 border-2 border-[#DEEDFF] shadow-md">
            <View className="flex-row items-center justify-center border border-gray-100 p-4 rounded-2xl">
              <Text className="text-purple-normal font-axiformaRegular capitalize text-base">
                @{payload?.user?.userName}
              </Text>
              <View className="bg-[#D9F3F1] rounded-full py-2 px-6 ml-4 border-[#6BADA9] border flex-row items-center">
                <Text className="text-[#2F4C4A] mr-1 font-axiformaBlack capitalize">
                  {payload?.user?.accountType}
                </Text>
                <Ionicons
                  name="checkmark-done-circle-outline"
                  size={24}
                  color="#6F9ACB"
                />
              </View>
            </View>
            <View className="relative self-center flex-row items-center justify-center w-[180px] h-[180px]">
              <Image
                source={{
                  uri: payload?.user?.image,
                }}
                className="w-full h-full rounded-full self-center mt-8 object-center border-[#F0E3FC] border-4"
                resizeMode="cover"
              />
              <Animated.View
                style={{
                  backgroundColor,
                  borderRadius: 9999,
                  width: 20,
                  height: 20,
                  position: "absolute",
                  bottom: 0,
                  right: 16,
                  zIndex: 9999,
                }}
              />
            </View>

            <View className="flex-row items-center justify-center border border-[#EEF6FF] mt-6 p-4 rounded-2xl">
              <Text className="text-[#3D4C5E] font-axiformaRegular capitalize text-sm text-center">
                {payload?.user?.bio}
              </Text>
            </View>
            <ScrollView
              className="gap-2 mt-6 border-b border-[#DBEBFF] pb-4"
              contentContainerStyle={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <View className="bg-[#B1C3FF] text-[#3E4459] rounded-md p-3">
                <Text className="font-axiformaRegular">20 miles away</Text>
              </View>
              <View className="bg-[#F3E5E7] rounded-md p-3 border-[#4C3C3E]">
                <Text className="font-axiformaRegular text-[#4C3C3E]">
                  80% Match
                </Text>
              </View>
              <View className="bg-[#FFB053] p-3 rounded-md">
                <Text className="font -axiformaRegular text-[#593E1D]">
                  4.8 Rating
                </Text>
              </View>
            </ScrollView>
          </View>

          <View className="flex-row justify-between mt-4 mb-2">
            <View className="flex-row items-center gap-8 border-b border-[#D6DDFD]  w-fit">
              <View
                className={`${
                  activeTab === "My Stories"
                    ? "border-b-[4px] border-[#7A91F9]"
                    : ""
                }`}
              >
                <Text
                  className={`text-base font-axiformaBlack pb-2 text-[#3D4C5E]`}
                  onPress={() => setActiveTab("My Stories")}
                >
                  My Stories
                </Text>
              </View>
              <TouchableOpacity
                className={`${
                  activeTab === "My Media"
                    ? "border-b-[4px] border-[#7A91F9]"
                    : ""
                }`}
                onPress={() => {
                  Alert.alert("Note", "Media section is in development");
                  setActiveTab("My Media");
                }}
              >
                <Text
                  className={`text-base font-axiformaBlack pb-2 text-[#3D4C5E]`}
                >
                  My Media
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Feather name="settings" size={24} color="#909DAD" />
            </View>
          </View>
          <View className="flex-row flex-wrap justify-between mt-2 border border-[#E9E9EB] rounded-lg p-3 bg-white-normal">
            {storiesMessage === "User has no story" ? (
              <View className="flex-row items-center justify-center w-full">
                <Text className="font-axiformaRegular text-gray-500 text-center">
                  No user story found.
                </Text>
              </View>
            ) : (
              storiesData.map((story, index) => {
                const isLocked = !isSubscribed && index >= 2;
                return (
                  <TouchableOpacity
                    key={story._id}
                    disabled={isLocked}
                    className="w-[49%] mb-4"
                    onPress={() =>
                      !isLocked && router.push(`/home/story/${story._id}`)
                    }
                  >
                    <Image
                      source={{ uri: story.media }}
                      className="w-full h-[220px] rounded-md"
                      resizeMode="cover"
                    />
                    {isLocked && (
                      <View className="absolute inset-0 bg-[#361753b9] rounded-md justify-center items-center h-full w-full">
                        <Feather name="lock" size={32} color="#ffffff" />
                      </View>
                    )}
                    <View className="bg-[#9a41eea6] py-3 px-2 rounded-xl absolute bottom-3 text-left mx-1">
                      <Text className="text-white-normal font-axiformaBlack text-center text-[11px]">
                        Posted {formatPostedTime(story.createdAt)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </View>

          {!isSubscribed && (
            <View className="bg-white-normal rounded-lg p-4 mt-8 mb-4 border border-[#E9E9EB]">
              <Text className="text-center font-axiformaBlack text-lg text-[#333333]">
                Instant Match
              </Text>
              <Text className="text-center text-sm my-2 text-[#47586E] font-axiformaRegular leading-6">
                Get matched with {payload?.user?.userName}, view all stories,
                unlock chat and calls instantly with a monthly subscription of{" "}
                <Text className="text-[#7A91F9]">
                  {payload?.user?.premiumRate} Vybes Coins
                </Text>
                .
              </Text>
              <Image
                source={locked}
                className="w-40 h-40 self-center"
                resizeMode="contain"
              />
              <TouchableOpacity
                className="bg-[#9a41ee] py-3 px-5 rounded-full self-center mt-2 shadow-md"
                onPress={() => setShowModal(true)}
              >
                <Text className="text-white-normal text-center font-axiformaRegular p-1">
                  Proceed to Make Payment
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View className="flex-col mt-4 mb-4 bg-white-normal border-2 border-[#DEEDFF] py-12 px-6 rounded-md">
            <View className="flex-row justify-between">
              <TouchableOpacity
                className="bg-purple-normal w-2/5 py-3 rounded-full mr-2 flex-row items-center justify-center gap-2"
                onPress={() => {
                  if (!isSubscribed) {
                    return Alert.alert(
                      "Note",
                      `Subscribe to ${payload?.user?.userName}'s to access this feature.`
                    );
                  }
                  // router.push()
                }}
              >
                <Entypo name="chat" size={24} color="#ffff" />
                <Text className="text-white-normal text-center font-axiformaRegular text-base">
                  Chat
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-white-normal w-2/5 py-3 rounded-full ml-2 border border-[#F0E3FC] flex-row items-center justify-center gap-2"
                onPress={() => {
                  if (!isSubscribed) {
                    return Alert.alert(
                      "Note",
                      `Subscribe to ${payload?.user?.userName}'s to access this feature.`
                    );
                  }
                  handleCall(payload?.user?.phoneNumber);
                }}
              >
                <Ionicons name="call-sharp" size={24} color="#a241ee" />
                <Text className="text-purple-normal text-center font-axiformaRegular text-base">
                  Call
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center justify-between border border-[#EEF6FF] rounded-md p-4 mt-6">
              <View className="flex-row items-center gap-2">
                <Image
                  source={lockChats}
                  className="w-8 h-8"
                  resizeMode="contain
                  "
                />
                <Text className="font-axiformaRegular text-base text-[#3D4C5E]">
                  Lock Chats
                </Text>
              </View>

              <FontAwesome5
                name="fingerprint"
                size={24}
                color="#909DAD"
                onPress={handleBiometricAuth}
              />
            </View>
          </View>

          <View className="mt-4 bg-white-normal border-2 border-white-normal p-4 rounded-md mb-8">
            <Text className="text-base font-axiformaRegular pb-4 border-b border-[#DBEBFF]">
              My Interests and Personality
            </Text>
            <View className="flex-row flex-wrap mt-2">
              {payload?.user?.hobbies.map((hobby, index) => {
                const colors = [
                  "bg-purple-100",
                  "bg-red-100",
                  "bg-blue-100",
                  "bg-green-100",
                  "bg-yellow-100",
                ];
                const bgColor = colors[index % colors.length];
                return (
                  <View
                    className={`${bgColor} px-4 m-1 rounded-full py-4`}
                    key={index}
                  >
                    <Text className="font-axiformaRegular capitalize">
                      {hobby}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        <Modal
          visible={showModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowModal(false)}
        >
          <View className="flex-1 justify-center items-center bg-[#1b1b1ba0] bg-opacity-50">
            <View className="bg-white-normal rounded-2xl p-4 mt-8 mb-4 border border-[#E9E9EB] w-[90%] shadow-lg">
              <View className="self-end">
                <AntDesign
                  name="close"
                  size={24}
                  color="#47586E"
                  onPress={() => setShowModal(false)}
                />
              </View>
              <Text className="text-center font-axiformaBlack text-lg text-[#333333] mt-2">
                Instant Match
              </Text>
              <Text className="text-center text-sm my-2 text-[#47586E] font-axiformaRegular leading-6">
                Get exclusive access to chat, calls, and instant matching with{" "}
                <Text className="capitalize">{payload?.user?.userName}</Text>{" "}
                for{" "}
                <Text className="text-[#7A91F9]">
                  {payload?.user?.premiumRate} Vybes Coins
                </Text>
                .
              </Text>
              <Image
                source={locked}
                className="w-32 h-32 self-center"
                resizeMode="contain"
              />
              <TouchableOpacity className="bg-[#9a41ee] py-3 px-5 rounded-full self-center mt-2 shadow-md mb-4">
                <Text
                  className="text-white-normal text-center font-axiformaRegular p-1"
                  onPress={() => {
                    setShowModal(false);
                    router.push(`/home/transfer/${id}`);
                  }}
                >
                  Proceed to Transfer Coin
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <StatusBar style="dark" backgroundColor="#fff" />
    </SafeAreaView>
  );
};

export default UserProfile;
