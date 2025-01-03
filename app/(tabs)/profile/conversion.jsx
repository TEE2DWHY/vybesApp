import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAccount } from "../../../hooks/useAccount";
import axios from "axios";
import { useToken } from "../../../hooks/useToken";

const Conversion = () => {
  const [activeTab, setActiveTab] = useState("convert");
  const { user, refetchUser } = useAccount();
  const [amount, setAmount] = useState("");
  const [coinsConverted, setCoinsConverted] = useState(null);
  const [transferAmount, setTransferAmount] = useState("");
  const [receiverHandle, setReceiverHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const token = useToken();

  const convertCoin = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      Alert.alert("Error", "Please enter a valid amount.");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        "https://vybesapi.onrender.com/v1/user/convert-coin",
        { amount: amount },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCoinsConverted(response.data.payload.coins);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Error converting coins, please try again.");
      console.log(error);
    }
  };

  const handleTransfer = async () => {
    if (
      !transferAmount ||
      !receiverHandle ||
      isNaN(transferAmount) ||
      transferAmount <= 0
    ) {
      Alert.alert("Error", "Please enter a valid amount and receiver handle.");
      return;
    }
    setLoading(true);
    if (user?.walletBalance < transferAmount) {
      setLoading(false);
      return Alert.alert("Error", "Insufficient Balance");
    }

    try {
      const response = await axios.post(
        "https://vybesapi.onrender.com/v1/user/transfer-coin",
        {
          amountToSend: transferAmount,
          receiverUserName: receiverHandle,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      setLoading(false);
      Alert.alert("Success", `Transfer to ${receiverHandle} is successful!`);
      await refetchUser();
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Error making transfer, please try again.");
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white-normal pt-4">
      <ScrollView className="mt-10">
        <View className="flex-row justify-between items-center px-3">
          <AntDesign
            name="left"
            size={24}
            color="#B2BBC6"
            onPress={() => router.push("/profile/txDashboard")}
          />
          <View className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              source={{ uri: user?.image }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        </View>

        <View className="flex-row items-center justify-center bg-[#361753] py-4 mt-5 w-full">
          <Text className="text-base text-white-normal font-axiformaRegular mr-2 text-center">
            Convert to Vybe Coin
          </Text>
          <FontAwesome6 name="arrows-rotate" size={20} color="white" />
        </View>

        <View className="flex-row items-center justify-center gap-4 mt-2 w-full px-6">
          <TouchableOpacity
            className={`rounded-lg ${
              activeTab === "convert"
                ? "bg-[#FFB053]"
                : "bg-transparent border  border-[#B2BBC6]"
            } p-4`}
            onPress={() => setActiveTab("convert")}
          >
            <Text
              className={`${
                activeTab === "convert"
                  ? "font-axiformaMedium"
                  : "text-[#B2BBC6] font-axiformaRegular"
              }`}
            >
              Convert to Vybe Coin
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`rounded-lg ${
              activeTab === "transfer"
                ? "bg-[#FFB053]"
                : "bg-transparent border border-[#B2BBC6]"
            } p-4`}
            onPress={() => setActiveTab("transfer")}
          >
            <Text
              className={`${
                activeTab === "transfer"
                  ? "font-axiformaMedium"
                  : "text-[#B2BBC6] font-axiformaRegular"
              }`}
            >
              Transfer Coin
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "convert" && (
          <>
            <View className="mt-6 px-2">
              <View className="bg-white p-4">
                <Text className="font-axiformaRegular mb-2">
                  Amount (NGN) to be converted to coin
                </Text>
                <View className="flex-row p-4 rounded-lg shadow border border-gray-200">
                  <View className="flex-row items-center">
                    <FontAwesome6 name="naira-sign" size={20} color="#546881" />
                    <TextInput
                      className="text-gray-800 text-sm font-medium font-axiformaRegular mt-[-5px] ml-4"
                      placeholder="Enter amount here"
                      keyboardType="numeric"
                      onChangeText={(text) => {
                        const cleanedText = text.replace(/[^0-9.]/g, "");
                        if ((cleanedText.match(/\./g) || []).length <= 1) {
                          setAmount(cleanedText);
                          const convertedCoins =
                            parseFloat(cleanedText) * 0.005;
                          setCoinsConverted(convertedCoins);
                        }
                      }}
                      value={amount}
                    />
                  </View>
                </View>
              </View>

              <View className="self-center my-4 bg-purple-darker w-14 h-14  p-1 rounded-full justify-center items-center">
                <FontAwesome6
                  name="arrows-left-right-to-line"
                  size={18}
                  color="#fff"
                />
              </View>

              <View className="bg-white p-4">
                <Text className="capitalize font-axiformaRegular mb-2">
                  Total coins converted
                </Text>
                <View className="flex-row p-4 rounded-lg shadow border border-gray-200">
                  <View className="flex-row items-center">
                    <FontAwesome5 name="coins" size={24} color="#9941EE" />
                    <TextInput
                      className=" text-gray-800 text-sm font-medium font-axiformaRegular mt-[-5px] ml-4"
                      placeholder="Total Coin"
                      keyboardType="number-pad"
                      value={coinsConverted ? coinsConverted.toString() : ""}
                      editable={false}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View className="mt-8 px-6 mb-10">
              <TouchableOpacity
                className="bg-purple-normal py-4 rounded-full"
                onPress={convertCoin}
                disabled={loading}
              >
                <Text className="text-center text-white-normal text-lg font-semibold font-axiformaRegular ">
                  {loading ? "Converting..." : "Convert"}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {activeTab === "transfer" && (
          <>
            <View className="mt-6 px-2">
              <View className="bg-white p-4">
                <Text className="capitalize font-axiformaRegular mb-2">
                  Vyber account handle to be transferred to
                </Text>
                <View className="flex-row p-4 rounded-lg shadow border border-gray-200">
                  <View className="flex-row items-center">
                    <FontAwesome5 name="user" size={20} color="#546881" />
                    <TextInput
                      className=" text-gray-800 text-sm font-medium font-axiformaRegular mt-[-5px] ml-4 capitalize"
                      placeholder="@Temitayo_1234"
                      onChangeText={setReceiverHandle}
                      value={receiverHandle}
                    />
                  </View>
                </View>
              </View>

              <View className="self-center my-4 bg-[#FFB053] w-14 h-14 border-2 p-4 border-[#FFE7CA] rounded-full justify-center items-center">
                <MaterialCommunityIcons
                  name="bank-transfer"
                  size={24}
                  color="#090B0E"
                />
              </View>

              <View className="bg-white p-4">
                <Text className="capitalize font-axiformaRegular mb-2">
                  Amount to Transfer
                </Text>
                <View className="flex-row p-4 rounded-lg shadow border border-gray-200">
                  <View className="flex-row items-center">
                    <FontAwesome5 name="coins" size={24} color="#9941EE" />
                    <TextInput
                      className=" text-gray-800 text-sm font-medium font-axiformaRegular mt-[-5px] ml-4"
                      placeholder="Amount to transfer"
                      keyboardType="number-pad"
                      onChangeText={setTransferAmount}
                      value={transferAmount}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View className="mt-8 px-6 mb-10">
              <TouchableOpacity
                className="bg-purple-normal py-4 rounded-full"
                onPress={handleTransfer}
                disabled={loading}
              >
                <Text className="text-center text-white-normal text-lg font-semibold font-axiformaRegular ">
                  {loading ? "Transferring..." : "Make Transfer"}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
      <StatusBar style="dark" backgroundColor="#ffff" />
    </SafeAreaView>
  );
};

export default Conversion;
