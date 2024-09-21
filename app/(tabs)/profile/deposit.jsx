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
// import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { formatNumberWithCommas } from "../../../utils/formatNumber";

const deposit = () => {
  const [selectedMethod, setSelectedMethod] = useState("Bank Transfer");
  const paymentMethods = ["Bank Transfer", "Card", "Stripe", "Quickteller"];
  const [value, setValue] = useState("");

  const handleChange = (text) => {
    const cleanedText = text.replace(/[^0-9.]/g, "");
    setValue(formatNumberWithCommas(cleanedText));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="mt-4">
        <View className="flex-row justify-between items-center px-4">
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

        <View className="flex-row items-center  justify-center bg-[#361753] py-4 mt-5  w-full">
          <Text className="text-base text-white-normal font-axiformaRegular mr-2  text-center">
            Deposit
          </Text>
          <AntDesign name="plussquareo" size={24} color="#ffff" />
        </View>

        <View className="flex-row justify-between mt-10 px-4">
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method}
              onPress={() => setSelectedMethod(method)}
              className={`py-2 px-2 rounded-sm ${
                selectedMethod === method ? "bg-[#055582]" : "bg-[#DEDEE0]"
              }`}
            >
              <Text
                className={`font-medium  font-axiformaRegular ${
                  selectedMethod === method
                    ? "text-white-normal"
                    : "text-[#B2BBC6]"
                }`}
              >
                {method}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="mt-8 p-y2 px-4">
          <Text className="text-gray-700 font-medium mb-2 font-axiformaRegular">
            Amount
          </Text>
          <View className="flex-row items-center px-2 py-3 bg-white rounded-lg border border-[#E9E9EB]">
            <TextInput
              placeholder="Enter amount (NGN)"
              keyboardType="numeric"
              onChangeText={handleChange}
              value={value}
              className="flex-1 ml-2 text-base text-gray-900 font-axiformaRegular"
            />
          </View>
          <Text className="mt-2 text-[#909DAD] text-right font-axiformaRegular">
            Min (NGN) 1000.00
          </Text>
        </View>

        <Text className="mt-3 text-gray-700 font-medium text-base px-4 font-axiformaRegular">
          Balance (₦) 500,000.00
        </Text>

        <TouchableOpacity className="mt-6 bg-purple-500 py-3 rounded-3xl items-center mx-4">
          <Text className="text-white-normal font-semibold text-lg font-axiformaRegular">
            Add Money Now
          </Text>
        </TouchableOpacity>

        <View className="mt-8 bg-white-normal border border-white-normal rounded-lg p-4 mx-4">
          <Text className="text-[#151A20] font-semibold text-xl mb-4 font-axiformaBlack text-center">
            Top Up Steps
          </Text>
          {[
            "Enter The Amount You Want To Deposit And Click 'The Add Money Now' Button.",
            "You Will Be Given A Temporary Transfer Account (Expires After 1 Hour).",
            "Transfer Money To The Account Via Your Online Banking / Mobile App Or USSD.",
            "Check Your Transaction History In Vybes. If The Deposit Doesn’t Credit Within 24 Hours, Please Contact Your Bank.",
          ].map((step, index) => (
            <View
              key={index}
              className="flex-row mb-2 items-center bg-[#FFFFFF]"
            >
              <Text className="text-gray-700 font-medium mr-2 font-axiformaRegular">
                {index + 1}.
              </Text>
              <Text className="text-gray-700  font-axiformaRegular leading-5">
                {step}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
    </SafeAreaView>
  );
};

export default deposit;
