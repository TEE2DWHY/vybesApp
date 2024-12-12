import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import { useToken } from "../../../../hooks/useToken";
import { format, formatDate } from "date-fns";
import { router } from "expo-router";
import { Spinner } from "../../../../components/Spinner";

const Transactions = () => {
  const [activeTab, setActiveTab] = useState("Withdrawal");
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useToken();

  useEffect(() => {
    const getTransactions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:8000/v1/transaction/type?transactionType=${activeTab}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setTransactions(response.data.payload.transactions || []);
      } catch (error) {
        setError(error.response?.data?.message);
        // console.error(error.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (token) {
      getTransactions();
    }
  }, [token, activeTab]);

  const renderTransactions = (data, type) => (
    <View className="mb-12">
      <View className="bg-[#6da1d6] mt-4 py-3 font-axiformaRegular w-3/5 px-2 rounded-md">
        <Text className="capitalize text-[#fff] text-center font-axiformaBook">
          March 12 - March 19 2024
        </Text>
      </View>
      <View className="mt-4 border-2 rounded-xl p-4 border-[#F3F9FF] bg-white-normal h-fit">
        {data.map((transaction) => (
          <View
            key={transaction._id}
            className="flex-row justify-between mb-8 border-b pb-1 border-[#EEF6FF]"
          >
            <View className="gap-4">
              <Text className="font-axiformaBlack text-[#3D4C5E]">{type}</Text>
              {(type === "Transferred Coins" || type === "Received Coins") && (
                <TouchableOpacity
                  onPress={() =>
                    router.push(`/home/user/${transaction?.receiverId}`)
                  }
                >
                  <Text className="text-purple-normal font-axiformaRegular text-xs">
                    {type === "Transferred Coins" ? "to" : "from"}{" "}
                    {transaction.receiver}
                  </Text>
                </TouchableOpacity>
              )}
              <Text className="text-[#909DAD] font-axiformaRegular text-xs">
                {format(transaction.createdAt, "dd-MM-yyyy")}
                {"   "}
                {format(transaction.createdAt, "HH:mm")}
              </Text>
            </View>
            <View>
              <Text
                className={`${
                  type === "Converted Coins"
                    ? "text-[#02B784] text-xs"
                    : type === "Transferred Coins" || type === "Received Coins"
                    ? "text-[#8BC0FE] text-base"
                    : "text-[#FFB053] text-base"
                } font-axiformaBlack`}
              >
                {type === "Deposit"
                  ? "+"
                  : type === "Transferred Coins"
                  ? "-"
                  : " "}{" "}
                {`${type === "Deposit" ? "#" : ""}${transaction.amount} ${
                  type === "Transferred Coins" ? "Vybe Coin" : ""
                }`}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="mt-10">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between">
          <View>
            <Text className="text-[#3D4C5E] text-xl font-axiformaBlack">
              Transactions History
            </Text>
            <Text className="capitalize text-[#B2BBC6] mt-4 font-axiformaRegular">
              Filter using date ranges
            </Text>
          </View>
          <View className="flex-row">
            <Text className="capitalize text-[#B2BBC6] mt-2 font-axiformaRegular">
              1 Week
            </Text>
            <TouchableOpacity>
              <Feather
                name="sliders"
                size={20}
                style={{
                  color: "#8BC0FE",
                  marginLeft: 10,
                  marginTop: 4,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          className="flex-row mt-10"
          showsHorizontalScrollIndicator={false}
          horizontal
        >
          <View className="flex-row items-center gap-6 border-b border-[#DBEBFF] pb-3">
            <Text
              className={`${
                activeTab === "Withdrawal" ? "text-[#3D4C5E]" : "text-[#B2BBC6]"
              } font-axiformaRegular font-[14px]`}
              onPress={() => setActiveTab("Withdrawal")}
            >
              Withdrawal
            </Text>
            <Text
              className={`${
                activeTab === "Deposit" ? "text-[#3D4C5E]" : "text-[#B2BBC6]"
              } font-axiformaRegular font-[14px]`}
              onPress={() => setActiveTab("Deposit")}
            >
              Deposit
            </Text>
            <Text
              className={`${
                activeTab === "Transferred Coins"
                  ? "text-[#3D4C5E]"
                  : "text-[#B2BBC6]"
              } font-axiformaRegular font-[14px]`}
              onPress={() => setActiveTab("Transferred Coins")}
            >
              Transferred Coins
            </Text>
            <Text
              className={`${
                activeTab === "Received Coins"
                  ? "text-[#3D4C5E]"
                  : "text-[#B2BBC6]"
              } font-axiformaRegular font-[14px]`}
              onPress={() => setActiveTab("Received Coins")}
            >
              Received Coins
            </Text>
            <Text
              className={`${
                activeTab === "Converted Coins"
                  ? "text-[#3D4C5E]"
                  : "text-[#B2BBC6]"
              } font-axiformaRegular font-[14px]`}
              onPress={() => setActiveTab("Converted Coins")}
            >
              Converted Coins
            </Text>
          </View>
        </ScrollView>

        {isLoading ? (
          <View className="flex-1 justify-center items-center h-[40vh]">
            <Spinner />
          </View>
        ) : error ? (
          <Text className="text-purple-normal text-center mt-20 font-axiformaRegular capitalize text-sm leading-6">
            {error}
          </Text>
        ) : (
          renderTransactions(transactions, activeTab)
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Transactions;
