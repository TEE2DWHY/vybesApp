import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { Spinner } from "../../../../components/Spinner";
import { useToken } from "../../../../hooks/useToken";
import { useAccount } from "../../../../hooks/useAccount";
import { handleCall } from "../../../../utils/handleCall";

const DepositDetails = () => {
  const params = useLocalSearchParams();
  const { transactionId } = params;
  const token = useToken();
  const [isLoading, setIsLoading] = useState(true);
  const [transactionData, setTransactionData] = useState(null);
  const { user } = useAccount();

  useEffect(() => {
    if (token && transactionId) {
      const getTransaction = async () => {
        try {
          const response = await axios.get(
            `https://vybesapi.onrender.com/v1/transaction/${transactionId.toString()}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
          setTransactionData(response.data);
        } catch (error) {
          console.error("Error fetching transaction details", error);
        } finally {
          setIsLoading(false);
        }
      };
      getTransaction();
    }
  }, [token, transactionId]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white mt-10">
        <View className="flex-1 justify-center items-center">
          <Spinner />
        </View>
      </SafeAreaView>
    );
  }

  if (!transactionData) {
    return (
      <SafeAreaView className="flex-1 bg-white mt-10">
        <View className="flex-1 justify-center items-center">
          <Text className="text-xl text-[#546881]">Transaction not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const {
    amount,
    status,
    createdAt,
    receiver,
    sender,
    transactionId: txId,
  } = transactionData.payload;

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date)) {
      return "Invalid Date";
    }
    return date.toLocaleString();
  };

  return (
    <SafeAreaView className="flex-1 bg-white mt-10">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="flex-row items-center justify-between mt-2 mx-4">
          <TouchableOpacity>
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              style={{ color: "#546881" }}
              onPress={() => router.push("/profile")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-center bg-[#7A91F9] p-4 rounded-md"
            onPress={() => console.log("Go to Balance")}
          >
            <FontAwesome5 name="coins" size={20} color="#fff" />
            <Text className="font-axiformaBlack text-sm text-white-normal ml-2">
              Bal
            </Text>
            <Text className="font-axiformaBlack text-sm text-white-normal ml-4">
              {user?.walletBalance} Vybes Coin
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mx-4 mt-12 p-6 bg-[#F9FAFB] rounded-lg shadow-md">
          <Text className="text-center font-axiformaBlack text-lg mb-4 text-[#3D4C5E]">
            Deposit Details
          </Text>

          <View className="flex-row justify-between items-center my-2">
            <Text className="font-axiformaRegular text-base text-[#546881]">
              Amount
            </Text>
            <Text className="font-axiformaBold text-base text-[#7A91F9]">
              +{amount * 0.005} Vybes Coin
            </Text>
          </View>

          <View className="flex-row justify-between items-center my-2">
            <Text className="font-axiformaRegular text-base text-[#546881]">
              Amount Funded (NGN)
            </Text>
            <Text className="font-axiformaBold text-base text-[#546881]">
              {amount} NGN
            </Text>
          </View>

          <View className="flex-row justify-between items-center my-2">
            <Text className="font-axiformaRegular text-base text-[#546881]">
              Status
            </Text>
            <Text className="font-axiformaBold text-base text-[#546881]">
              {status}
            </Text>
          </View>

          <View className="flex-row justify-between items-center my-2">
            <Text className="font-axiformaRegular text-base text-[#546881]">
              Date/Time
            </Text>
            <Text className="font-axiformaBold text-base text-[#546881]">
              {formatTimestamp(createdAt)} {/* Use the formatted timestamp */}
            </Text>
          </View>

          <View className="flex-row justify-between items-center my-2">
            <Text className="font-axiformaRegular text-base text-[#546881]">
              Type
            </Text>
            <Text className="font-axiformaBold text-base text-[#546881]">
              Deposit
            </Text>
          </View>

          <View className="flex-row justify-between items-center my-2">
            <Text className="font-axiformaRegular text-base text-[#546881]">
              Transaction No
            </Text>
            <Text className="font-axiformaBold text-base text-[#546881]">
              {transactionId}
            </Text>
          </View>

          <View className="flex-row justify-between items-center my-2">
            <Text className="font-axiformaRegular text-base text-[#546881]">
              Wallet Balance
            </Text>
            <Text className="font-axiformaBold text-base text-[#546881]">
              {user?.walletBalance} Vybe Coin
            </Text>
          </View>
        </View>

        <View className="items-center mt-14">
          <View className="flex-row items-center gap-2">
            <Text className="text-[#7A91F9] text-sm w-4/5 self-center text-center">
              Contact Our Customer Support For More Assistance
            </Text>
            <MaterialIcons
              name="arrow-forward-ios"
              size={18}
              style={{ color: "#7A91F9" }}
              onPress={() => console.log("Go Back")}
            />
          </View>

          <Text
            className="text-[#546881] text-sm mt-2"
            onPress={handleCall("090229717250")}
          >
            Call 090229717250
          </Text>
        </View>
      </ScrollView>
      <StatusBar style="dark" backgroundColor="#fff" />
    </SafeAreaView>
  );
};

export default DepositDetails;
