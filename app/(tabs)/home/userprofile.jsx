import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { storiesData } from "../../../data/data";
import locked from "../../../assets/images/locked.png";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as LocalAuthentication from "expo-local-authentication";
import lockChats from "../../../assets/images/lockchats.png";
import * as Linking from "expo-linking";

const UserProfile = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []);

  // Function to handle Biometric Authentication
  const handleBiometricAuth = async () => {
    try {
      // Check if biometrics are set up
      const savedBiometrics = await LocalAuthentication.isEnrolledAsync();

      if (!savedBiometrics) {
        return Alert.alert(
          "Biometric record not found",
          "Please verify your identity with your password",
          [{ text: "OK" }]
        );
      }

      // Check what type of biometric authentication is available
      const biometricTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

      if (
        biometricTypes.includes(
          LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
        )
      ) {
        // Authenticate with Face ID
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Authenticate with Face ID",
          cancelLabel: "Cancel",
          fallbackLabel: "Use Passcode",
          disableDeviceFallback: false, // Keep this to allow fallback to passcode in case Face ID fails
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

  const handleCall = () => {
    const phoneNumber = "+2349032533461";
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.warn("Phone number is not available.");
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  return (
    <SafeAreaView>
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
                @dhemmexroxy
              </Text>
              <View className="bg-[#D9F3F1] rounded-full py-2 px-6 ml-4 border-[#6BADA9] border flex-row items-center">
                <Text className="text-[#2F4C4A] mr-1 font-axiformaBlack">
                  Baddie
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
                  uri: "https://images.unsplash.com/photo-1627130596911-985450bd4d63?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                }}
                className="w-full h-full rounded-full self-center mt-8 object-center border-[#F0E3FC] border-4"
                resizeMode="cover"
              />
              <View className="rounded-full w-7 h-7 bg-purple-normal absolute bottom-0 right-2  z-9999"></View>
            </View>

            <View className="flex-row items-center justify-center border border-[#EEF6FF] mt-6 p-4 rounded-2xl">
              <Text className="text-[#3D4C5E] font-axiformaRegular capitalize text-base text-center">
                I love meeting new people and love exploring new things.
              </Text>
            </View>
            <View className="flex-row items-center  justify-between mt-6 border-b border-[#DBEBFF] pb-4">
              <View className="bg-[#B1C3FF] text-[#3E4459] rounded-md p-3">
                <Text className="font-axiformaRegular">20 miles away</Text>
              </View>
              <View className="bg-[#F3E5E7] rounded-md p-3 border-[#4C3C3E]">
                <Text className="font-axiformaRegular text-[#4C3C3E]">
                  80% Match
                </Text>
              </View>
              <View className="bg-[#FFB053] p-3 rounded-md">
                <Text className="font-axiformaRegular text-[#593E1D]">
                  4.8 Rating
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-row justify-between mt-4 mb-2">
            <View className="flex-row items-center gap-4">
              <Text className="text-base font-axiformaBlack">My Stories</Text>
              <Text className="text-base font-axiformaBlack">My Media</Text>
            </View>
            <View>
              <Feather name="settings" size={24} color="#909DAD" />
            </View>
          </View>
          <View className="flex-row flex-wrap justify-between mt-2 border border-[#E9E9EB] rounded-lg p-3">
            {storiesData.map((story, index) => (
              <TouchableOpacity
                key={story.id}
                // If story is locked, it should not be clickable
                disabled={story.locked}
                className="w-[49%] mb-4"
              >
                <Image
                  source={{ uri: story.imageUrl }}
                  className="w-full h-[220px] rounded-md"
                  resizeMode="cover"
                />

                {/* Show overlay and padlock if the story is locked */}
                {story.locked && (
                  <View className="absolute inset-0 bg-[#361753b9] rounded-md justify-center items-center h-full w-full">
                    <Feather name="lock" size={32} color="#ffffff" />
                  </View>
                )}
                <View className="bg-[#9a41eea6] py-3 px-2 rounded-xl absolute bottom-3 text-left mx-1">
                  <Text className="text-white-normal font-axiformaBlack text-center text-[11px]">
                    Posted {story.postedAt}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View className="bg-white-normal rounded-lg p-4 mt-8 mb-4 border border-[#E9E9EB]">
            <Text className="text-center font-axiformaBlack text-lg text-[#333333]">
              Instant Match
            </Text>
            <Text className="text-center text-sm my-2 text-[#47586E] font-axiformaRegular leading-6">
              Get matched with Dhemmex or unlock chat and calls instantly with a
              monthly subscription of{" "}
              <Text className="text-[#7A91F9]">60 Vybes Coins</Text>.
            </Text>
            <Image
              source={locked}
              className="w-40 h-40 self-center"
              resizeMode="contain"
            />
            <TouchableOpacity className="bg-[#9a41ee] py-3 px-5 rounded-full self-center mt-2 shadow-md">
              <Text
                className="text-white-normal text-center font-axiformaRegular p-1"
                onPress={() => setShowModal(true)}
              >
                Proceed to Make Payment
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-col mt-4 mb-4 bg-white-normal border-2 border-[#DEEDFF] py-12 px-6 rounded-md">
            <View className="flex-row justify-between">
              <TouchableOpacity className="bg-purple-normal w-2/5 py-3 rounded-full mr-2 flex-row items-center justify-center gap-2">
                <Entypo name="chat" size={24} color="#ffff" />
                <Text className="text-white-normal text-center font-axiformaRegular text-base">
                  Chat
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-white-normal w-2/5 py-3 rounded-full ml-2 border border-[#F0E3FC] flex-row items-center justify-center gap-2"
                onPress={handleCall}
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

          <View className="mt-4 bg-white-normal border-2 border-white-normal p-4 rounded-md">
            <Text className="text-lg font-axiformaBlack pb-4 border-b border-[#DBEBFF]">
              My Interests and Personality
            </Text>
            <View className="flex-row flex-wrap mt-2">
              <View className="bg-purple-100 py-2 px-4 m-1 rounded-full">
                <Text className="font-axiformaRegular">Takes Alcohol</Text>
              </View>
              <View className="bg-red-100 py-2 px-4 m-1 rounded-full">
                <Text className="font-axiformaRegular">Loves Football</Text>
              </View>
              <View className="bg-blue-100 py-2 px-4 m-1 rounded-full">
                <Text className="font-axiformaRegular">Loves Pet</Text>
              </View>
              <View className="bg-green-100 py-2 px-4 m-1 rounded-full">
                <Text className="font-axiformaRegular">
                  Available for Short Time
                </Text>
              </View>
              <View className="bg-yellow-100 py-2 px-4 m-1 rounded-full">
                <Text className="font-axiformaRegular">Aries</Text>
              </View>
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
                Get exclusive access to chat, calls, and instant matching with
                Dhemmex for{" "}
                <Text className="text-[#7A91F9]">60 Vybes Coins</Text>.
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
                    router.push("/home/transfercoin");
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
