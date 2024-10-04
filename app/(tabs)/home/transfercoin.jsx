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

  return <SafeAreaView></SafeAreaView>;
};

export default TransferCoin;
