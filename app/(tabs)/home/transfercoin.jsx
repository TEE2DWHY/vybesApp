import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import unlocked from "../../../assets/images/unlocked.webp";

// Notification configuration
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const TransferCoin = () => {
  const [showModal, setShowModal] = useState(false);
  const [accountHandle, setAccountHandle] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission for notifications was not granted.");
    }
  };

  useEffect(() => {
    requestNotificationPermission();
    registerNotificationCategories();
  }, []);

  const showNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Transfer Initiated!",
        body: `You have initiated a transfer of ${transferAmount} Vybes coins to ${accountHandle}.`,
      },
      trigger: null,
    });
  };

  const handleTransfer = () => {
    const amount = Number(transferAmount);
    if (!accountHandle.trim() || isNaN(amount) || amount <= 0) {
      Alert.alert(
        "Please specify a valid account handle and Vybes coin to be sent."
      );
      return;
    }
    setShowModal(true);
    showNotification();
  };

  const transferNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Transfer Success!",
        body: `Transfer of ${transferAmount} Vybes coins to ${accountHandle} is successful.`,
        sound: "default",
        data: { accountHandle, transferAmount },
        android: {
          channelId: "default",
          color: "#9a41ee",
          actions: [
            { identifier: "view-details", title: "View Details" },
            { identifier: "chat-dhemmex", title: "Chat with Dhemmex" },
          ],
        },
        ios: {
          categoryIdentifier: "transferCategory",
        },
      },
      trigger: null,
    });
  };

  // Registering notification categories for iOS
  const registerNotificationCategories = async () => {
    await Notifications.setNotificationCategoryAsync("transferCategory", [
      {
        identifier: "view-details",
        buttonTitle: "View Details",
        options: { opensAppToForeground: true },
      },
      {
        identifier: "chat-dhemmex",
        buttonTitle: "Chat with Dhemmex",
        options: { opensAppToForeground: true },
      },
    ]);
  };

  // Listener for notification responses
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const { actionIdentifier } = response;
        switch (actionIdentifier) {
          case "view-details":
            console.log("View Details action pressed");
            // Navigate to details screen
            break;
          case "chat-dhemmex":
            console.log("Chat with Dhemmex action pressed");
            // Open chat screen
            break;
          default:
            break;
        }
      }
    );

    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex-row items-center justify-between mt-2 px-6">
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            style={{ color: "#546881" }}
            onPress={() => router.push("/home/userprofile")}
          />
          <TouchableOpacity
            className="w-3/5 flex-row items-center justify-center bg-[#7A91F9] p-4 rounded-md"
            onPress={() => router.push("/profile/txDashboard")}
          >
            <View className="flex-row items-center">
              <TouchableOpacity onPress={() => router.push("/home")}>
                <FontAwesome5 name="coins" size={24} color="#fff" />
              </TouchableOpacity>
              <Text className="font-axiformaBlack text-sm text-white-normal ml-2">
                Bal
              </Text>
            </View>
            <Text className="font-axiformaBlack text-sm text-white-normal ml-4">
              50 Vybes Coin
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-center bg-[#361753] py-4 mt-5 w-full">
          <Text className="text-base text-white-normal font-axiformaRegular mr-2 text-center">
            Transfer Coin
          </Text>
          <FontAwesome5 name="coins" size={24} color="#fff" />
        </View>

        {accountHandle.trim() && transferAmount.trim() && (
          <View className="bg-[#F2F4FE] mt-8 p-4 w-[90%] self-center rounded-2xl">
            <Text className="text-[#090B0E] font-axiformaRegular text-center leading-6 capitalize text-base">
              You are about to initiate a transfer of {transferAmount} Vybes
              coin to {accountHandle}
            </Text>
          </View>
        )}

        <View className="mt-8 p-y2 px-4">
          <Text className="text-gray-700 font-medium mb-2 font-axiformaRegular">
            Account Handle
          </Text>
          <View className="flex-row justify-between items-center p-4 rounded-lg shadow border border-gray-200">
            <View className="flex-row items-center">
              <AntDesign name="user" size={24} color="#47586E" />
              <TextInput
                className="ml-2 text-gray-800 text-sm font-medium font-axiformaRegular mt-[-2px]"
                placeholder="Enter account name here"
                value={accountHandle}
                onChangeText={setAccountHandle}
              />
            </View>
            <TouchableOpacity>
              <AntDesign name="closecircleo" size={20} color="#B2BBC6" />
            </TouchableOpacity>
          </View>
          <Text className="mt-3 text-gray-700 font-medium text-base px-4 font-axiformaRegular text-right">
            Available Balance:{" "}
            <Text className="font-axiformaBlackItalic">5,000 Vybes Coin</Text>
          </Text>
          <View className="flex-row items-center px-2 py-3 bg-white rounded-lg border border-[#E9E9EB] mt-6">
            <TextInput
              placeholder="Enter Amount of Vybe Coin to Transfer"
              keyboardType="numeric"
              value={transferAmount}
              onChangeText={(text) =>
                setTransferAmount(text.replace(/[^0-9]/g, ""))
              }
              className="flex-1 ml-2 text-base text-gray-900 font-axiformaRegular"
            />
          </View>
          <TouchableOpacity
            className="mt-10 bg-purple-500 py-3 rounded-3xl items-center mx-4"
            onPress={handleTransfer}
          >
            <Text className="text-white-normal font-semibold text-lg font-axiformaRegular">
              Transfer
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="fade"
          visible={showModal}
          transparent={true}
          onRequestClose={() => setShowModal(false)}
        >
          <View className="flex-1 justify-center items-center bg-[#1b1b1ba0] bg-opacity-50">
            <View className="bg-white-normal rounded-2xl mt-8 mb-4 border border-[#E9E9EB] w-[90%] shadow-lg">
              <View className="flex-row items-center justify-center">
                <ImageBackground
                  source={{
                    uri: "https://images.unsplash.com/photo-1627130596911-985450bd4d63?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  }}
                  className="w-full h-[300px] overflow-hidden rounded-t-2xl"
                  resizeMode="cover"
                  blurRadius={5}
                />
                <View className="absolute bg-white-normal rounded-full p-1">
                  <Image
                    source={unlocked}
                    className="w-16 h-16 rounded-2xl"
                    resizeMode="cover"
                  />
                </View>

                <View className="self-end absolute top-2 right-2 rounded-full bg-purple-normal p-1">
                  <AntDesign
                    name="close"
                    size={16}
                    color="#fff"
                    onPress={() => setShowModal(false)}
                  />
                </View>
              </View>

              <Text className="text-center font-axiformaBlack text-lg text-[#333333] capitalize mt-6">
                Coin transfer confirmed
              </Text>
              <Text className="text-center text-sm my-2 text-[#47586E] font-axiformaRegular leading-6 px-4">
                Now that you've transferred{" "}
                <Text className="text-purple-normal">
                  {transferAmount} Vybes Coins
                </Text>
                , you can chat with{" "}
                <Text className="text-purple-normal">{accountHandle}</Text>,
                view her stories, and you're already matched.
              </Text>

              <TouchableOpacity
                className="bg-[#9a41ee] py-3 px-5 rounded-full self-center mt-6 mb-4"
                onPress={() => {
                  transferNotification();
                  setShowModal(false);
                  router.push("/profile/transferDetails");
                }}
              >
                <Text className="font-axiformaBlack text-white-normal text-sm">
                  Continue
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

export default TransferCoin;
