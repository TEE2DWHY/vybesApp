import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native";

const Transactions = () => {
  const [activeTab, setActiveTab] = useState("Withdrawal");

  const withdrawalData = [
    {
      id: 1,
      type: "Withdrawal",
      amount: "-#500,000",
      date: "12-03-2024 16:09",
    },
    {
      id: 2,
      type: "Withdrawal",
      amount: "-#500,000",
      date: "12-03-2024 16:09",
    },
    {
      id: 3,
      type: "Withdrawal",
      amount: "-#500,000",
      date: "12-03-2024 16:09",
    },
    {
      id: 4,
      type: "Withdrawal",
      amount: "-#500,000",
      date: "12-03-2024 16:09",
    },
    {
      id: 5,
      type: "Withdrawal",
      amount: "-#500,000",
      date: "12-03-2024 16:09",
    },
  ];

  const depositData = [
    { id: 1, type: "Deposit", amount: "+#500,000", date: "12-03-2024 16:09" },
    { id: 2, type: "Deposit", amount: "+#500,000", date: "12-03-2024 16:09" },
    { id: 3, type: "Deposit", amount: "+#500,000", date: "12-03-2024 16:09" },
    { id: 4, type: "Deposit", amount: "+#500,000", date: "12-03-2024 16:09" },
    { id: 5, type: "Deposit", amount: "+#500,000", date: "12-03-2024 16:09" },
  ];

  const convertedCoinsData = [
    {
      id: 1,
      type: "Deposit",
      amount: "+50 VybeCoins ",
      date: "12-03-2024 16:09",
    },
    {
      id: 2,
      type: "Deposit",
      amount: "+50 VybeCoins ",
      date: "12-03-2024 16:09",
    },
    {
      id: 3,
      type: "Deposit",
      amount: "+50 VybeCoins ",
      date: "12-03-2024 16:09",
    },
    {
      id: 4,
      type: "Deposit",
      amount: "+50 VybeCoins ",
      date: "12-03-2024 16:09",
    },
    {
      id: 5,
      type: "Deposit",
      amount: "+50 VybeCoins ",
      date: "12-03-2024 16:09",
    },
  ];

  const receivedCoinsData = [
    {
      id: 1,
      to: "@Adetola_123",
      amount: "+50 Vybe Coin",
      date: "12-03-2024 16:09",
    },
    {
      id: 2,
      to: "@Adetola_123",
      amount: "+40 Vybe Coin",
      date: "13-03-2024 09:09",
    },
    {
      id: 3,
      to: "@Adetola_123",
      amount: "+250 Vybe Coin",
      date: "14-03-2024 11:09",
    },
    {
      id: 4,
      to: "@Adetola_123",
      amount: "+100 Vybe Coin",
      date: "15-03-2024 17:09",
    },
    {
      id: 5,
      to: "@Adetola_123",
      amount: "+1710 Vybe Coin",
      date: "16-03-2024 20:09",
    },
    {
      id: 6,
      to: "@Adetola_123",
      amount: "+120 Vybe Coin",
      date: "17-03-2024 21:09",
    },
    {
      id: 7,
      to: "@Adetola_123",
      amount: "+10 Vybe Coin",
      date: "18-03-2024 22:09",
    },
  ];

  const transferredCoinsData = [
    {
      id: 1,
      to: "@Adetola_123",
      amount: "-50 Vybe Coin",
      date: "12-03-2024 16:09",
    },
    {
      id: 2,
      to: "@Adetola_123",
      amount: "-40 Vybe Coin",
      date: "13-03-2024 09:09",
    },
    {
      id: 3,
      to: "@Adetola_123",
      amount: "-250 Vybe Coin",
      date: "14-03-2024 11:09",
    },
    {
      id: 4,
      to: "@Adetola_123",
      amount: "-100 Vybe Coin",
      date: "15-03-2024 17:09",
    },
    {
      id: 5,
      to: "@Adetola_123",
      amount: "-1710 Vybe Coin",
      date: "16-03-2024 20:09",
    },
    {
      id: 6,
      to: "@Adetola_123",
      amount: "-120 Vybe Coin",
      date: "17-03-2024 21:09",
    },
    {
      id: 7,
      to: "@Adetola_123",
      amount: "-10 Vybe Coin",
      date: "18-03-2024 22:09",
    },
  ];

  const renderTransactions = (data, type) => (
    <View>
      <Text className="capitalize bg-[#F3F9FF] text-[#546881] mt-4 py-2 font-axiformaRegular">
        March 12 - March 19 2024
      </Text>
      <View className="mt-4 border-2 rounded-xl p-4 border-[#F3F9FF] bg-white-normal h-fit">
        {data.map((transaction) => (
          <View
            key={transaction.id}
            className="flex-row justify-between mb-8 border-b pb-1 border-[#EEF6FF]"
          >
            <View className="gap-4">
              <Text className={`font-axiformaBlack text-[#3D4C5E]`}>
                {type}
              </Text>
              {(type === "Transferred Coins" || type === "Received Coins") && (
                <Text className="text-purple-normal font-axiformaRegular text-xs">
                  {data === transferredCoinsData ? "to" : "from"}{" "}
                  {transaction.to}
                </Text>
              )}
              <Text className="text-[#909DAD] font-axiformaRegular text-xs">
                {transaction.date}
              </Text>
            </View>
            <View>
              <Text
                className={`${
                  data === convertedCoinsData
                    ? "text-[#02B784] text-xs"
                    : data === transferredCoinsData ||
                      data === receivedCoinsData
                    ? "text-[#8BC0FE] text-base"
                    : "text-[#FFB053] text-base"
                } font-axiformaBlack`}
              >
                {transaction.amount}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <>
      <SafeAreaView className="mt-10">
        <ScrollView>
          <View className="flex-row justify-between">
            <View>
              <Text className="text-[#3D4C5E] text-xl font-axiformaBlack">
                Transactions History
              </Text>
              <Text className="capitalize text-[#B2BBC6] mt-4 font-axiformaRegular">
                filter using date ranges
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
          >
            <View className="flex-row items-center gap-6 border-b border-[#DBEBFF] pb-3">
              <Text
                className={`${
                  activeTab === "Withdrawal"
                    ? "text-[#3D4C5E]"
                    : "text-[#B2BBC6]"
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

          {activeTab === "Withdrawal" &&
            renderTransactions(withdrawalData, "Withdrawal")}
          {activeTab === "Deposit" &&
            renderTransactions(depositData, "Deposit")}
          {activeTab === "Transferred Coins" &&
            renderTransactions(transferredCoinsData, "Transferred Coins")}
          {activeTab === "Received Coins" &&
            renderTransactions(receivedCoinsData, "Received Coins")}
          {activeTab === "Converted Coins" &&
            renderTransactions(convertedCoinsData, "Converted Money To Coins")}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Transactions;
