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
  ActivityIndicator,
} from "react-native";
import * as Notifications from "expo-notifications";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import unlocked from "../../../../assets/images/unlocked.webp";
import { useAccount } from "../../../../hooks/useAccount";
import axios from "axios";
import { useToken } from "../../../../hooks/useToken";
import useFetch from "../../../../hooks/useFetch";
import { userInstance } from "../../../../config/axios";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Notification configuration
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Transfer = () => {
  const [showModal, setShowModal] = useState(false);
  const [accountHandle, setAccountHandle] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [isTransferLoading, setIsTransferLoading] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const { user, refetchUser } = useAccount();
  const [error, setError] = useState("");
  const token = useToken();
  const params = useLocalSearchParams();
  const { id } = params;

  const {
    payload,
    isLoading,
    message,
    error: getUserError,
    fetchData: getUser,
  } = useFetch({
    fn: userInstance,
    endpoint: `/get-user-by-id/${id}`,
    token: token,
    // param: { userId: id },
  });

  useEffect(() => {
    if (payload?.user) {
      setAccountHandle(payload?.user?.userName || "");
      setTransferAmount(payload?.user?.premiumRate || "");
    }
  }, [payload]);

  useEffect(() => {
    if (token) {
      const fetchUsers = async () => {
        await getUser();
      };
      fetchUsers();
    }
  }, [getUser]);

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

  const subscribe = async () => {
    try {
      const response = await axios.post(
        "https://vybesapi.onrender.com/v1/user/subscribe",
        {
          recipientId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTransfer = async () => {
    if (transferAmount > user?.walletBalance) {
      return setError("Insufficient Balance");
    }

    const amount = Number(transferAmount);
    if (!accountHandle.trim() || isNaN(amount) || amount <= 0) {
      Alert.alert(
        "Note",
        "Please specify a valid account handle and Vybes coin to be sent."
      );
      return;
    }

    setIsTransferLoading(true);
    try {
      const response = await axios.post(
        "https://vybesapi.onrender.com/v1/user/transfer-coin",
        {
          amountToSend: transferAmount,
          receiverUserName: accountHandle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await subscribe();
      setTransactionId(response?.data?.payload.tx.transactionId);
      setShowModal(true);
      showNotification();
      setError("");
      await refetchUser();
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setIsTransferLoading(false);
    }
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
    <SafeAreaView className="mt-12">
      <ScrollView>
        <View className="flex-row items-center justify-between mt-2 px-6">
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            style={{ color: "#546881" }}
            onPress={() => router.back()}
          />
          <TouchableOpacity
            className="w-3/5 flex-row items-center justify-center bg-[#7A91F9] p-3 rounded-md"
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
              {user?.walletBalance} Vybes Coin
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-center bg-[#361753] py-3 mt-5 w-full">
          <Text className="text-sm text-white-normal font-axiformaRegular mr-2 text-center">
            Transfer Coin
          </Text>
          <FontAwesome5 name="coins" size={24} color="#fff" />
        </View>

        {accountHandle && transferAmount && (
          <View className="bg-[#dde0ef] mt-8 py-2 px-6 w-[80%] self-center rounded-2xl">
            <Text className="text-[#4e565e] font-axiformaRegular text-center leading-6 capitalize text-sm">
              You are about to initiate a transfer of {transferAmount} Vybes
              coin to {accountHandle}
            </Text>
          </View>
        )}

        <View className="mt-12 p-y2 px-4">
          <Text className="text-gray-700 font-medium mb-2 font-axiformaRegular">
            Account Handle
          </Text>
          <View
            className="flex-row justify-between items-center p-4 rounded-lg border border-gray-200"
            style={{ width: "100%" }}
          >
            <View className="flex-row items-center flex-1">
              <AntDesign name="user" size={24} color="#47586E" />
              <TextInput
                className="ml-2 text-gray-800 text-base font-medium font-axiformaRegular flex-1 mt-[-10px]"
                placeholder="Enter recipient username here"
                value={accountHandle}
                onChangeText={(text) => {
                  setAccountHandle(text);
                  setError("");
                }}
                onKeyPress={() => setError("")}
              />
            </View>
            <TouchableOpacity>
              <AntDesign name="closecircleo" size={20} color="#B2BBC6" />
            </TouchableOpacity>
          </View>
          <Text className="mt-3 text-gray-700 font-medium text-sm px-4 font-axiformaRegular text-right">
            Available Balance :{" "}
            <Text className="font-axiformaMedium">
              {user?.walletBalance} Vybes Coin{" "}
              <MaterialCommunityIcons
                name="star-three-points"
                size={18}
                color={"#FF8674"}
              />
            </Text>
          </Text>
          <View className="flex-row items-center px-2 py-3 bg-white rounded-lg border border-[#E9E9EB] mt-6">
            <TextInput
              placeholder="Enter amount of vybe coin to transfer"
              keyboardType="numeric"
              value={transferAmount}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                setTransferAmount(numericValue);
                setError("");
              }}
              onKeyPress={() => setError("")}
              className="flex-1 ml-2 text-base text-gray-900 font-axiformaRegular"
            />
          </View>
          <Text className="text-red-600 font-axiformaRegular text-center mt-6">
            {error}
          </Text>
          <TouchableOpacity
            className="mt-4 bg-purple-500 py-3 rounded-3xl items-center mx-4 mb-12"
            onPress={handleTransfer}
          >
            {isTransferLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white-normal font-semibold text-lg font-axiformaMedium">
                Transfer
              </Text>
            )}
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
                    uri: payload?.user?.image,
                  }}
                  className="w-full h-[250px] overflow-hidden rounded-t-2xl"
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
                  router.push(`/profile/transfer/${transactionId}`);
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

export default Transfer;
