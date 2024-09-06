import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const deposit = () => {
  const [selectedMethod, setSelectedMethod] = useState("Bank Transfer");
  const paymentMethods = ["Bank Transfer", "Card", "Stripe", "Quickteller"];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4 mt-4">
        <View className="flex-row justify-between items-center">
          <AntDesign name="left" size={24} color="#B2BBC6" />
          <View className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              source={{
                uri: "https://plus.unsplash.com/premium_photo-1673792686302-7555a74de717?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        </View>

        <Text className="text-2xl font-semibold text-gray-900 mt-5">
          Deposit
        </Text>

        <View className="flex-row justify-between mt-5">
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method}
              onPress={() => setSelectedMethod(method)}
              className={`py-2 px-2 rounded-lg ${
                selectedMethod === method ? "bg-[#055582]" : "bg-gray-200"
              }`}
            >
              <Text
                className={`font-medium ${
                  selectedMethod === method
                    ? "text-white-normal"
                    : "text-gray-800"
                }`}
              >
                {method}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="mt-5 p-4 rounded-lg bg-gray-50 border border-gray-300">
          <Text className="text-gray-700 font-medium mb-2">Amount</Text>
          <View className="flex-row items-center px-2 py-3 bg-white rounded-lg border border-gray-300">
            <MaterialIcons name="attach-money" size={24} color="#47586E" />
            <TextInput
              placeholder="Enter amount"
              keyboardType="numeric"
              className="flex-1 ml-2 text-base text-gray-900"
            />
          </View>
          <Text className="mt-2 text-gray-400">Min (NGN) 1000.00</Text>
        </View>

        <Text className="mt-3 text-gray-700 font-medium text-lg">
          Balance (₦) 500,000.00
        </Text>

        <TouchableOpacity className="mt-6 bg-purple-100 py-3 rounded-lg items-center">
          <Text className="text-purple-900 font-semibold text-lg">
            Add Money Now
          </Text>
        </TouchableOpacity>

        {/* Top Up Steps */}
        <View className="mt-8 p-4 bg-white rounded-lg border border-gray-300">
          <Text className="text-gray-700 font-semibold text-lg mb-4">
            Top Up Steps
          </Text>
          {[
            "Enter The Amount You Want To Deposit And Click 'The Add Money Now' Button.",
            "You Will Be Given A Temporary Transfer Account (Expires After 1 Hour).",
            "Transfer Money To The Account Via Your Online Banking / Mobile App Or USSD.",
            "Check Your Transaction History In Vybes. If The Deposit Doesn’t Credit Within 24 Hours, Please Contact Your Bank.",
          ].map((step, index) => (
            <View key={index} className="flex-row mb-2 items-start">
              <Text className="text-gray-700 font-medium mr-2">
                {index + 1}.
              </Text>
              <Text className="text-gray-700 text-base">{step}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
    </SafeAreaView>
  );
};

export default deposit;
