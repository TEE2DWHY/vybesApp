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
import { StatusBar } from "expo-status-bar";
import { formatNumberWithCommas } from "../../../utils/formatNumber";
import { router } from "expo-router";
import paymentOptions from "../../../assets/images/paymentOptions.png";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";

const deposit = () => {
  const [selectedMethod, setSelectedMethod] = useState("Bank Transfer");
  const paymentMethods = ["Bank Transfer", "Card", "Stripe", "Quickteller"];
  const [value, setValue] = useState("");
  const [cardsData, setCardsData] = useState({
    cardOne: "",
    cardTwo: "",
  });

  const handleChange = (text) => {
    const cleanedText = text.replace(/[^0-9.]/g, "");
    setValue(formatNumberWithCommas(cleanedText));
  };

  return (
    <SafeAreaView className="flex-1 bg-white-normal mt-10">
      <ScrollView className="mt-4 ">
        <View className="flex-row justify-between items-center px-4 mt-6">
          <AntDesign
            name="left"
            size={24}
            color="#B2BBC6"
            onPress={() => router.push("/profile")}
          />
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
                selectedMethod === method ? "bg-[#055582]" : "bg-[#eeeeef]"
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

        {selectedMethod === "Bank Transfer" && (
          <>
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

            <View className="mt-8 bg-white-normal border border-[#eeeeef] rounded-lg p-4 mx-4">
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
          </>
        )}

        {selectedMethod === "Card" && (
          <>
            <Image
              source={paymentOptions}
              resizeMode="contain"
              className="self-center w-[208px] h-[108px]"
            />
            <View className="bg-[#DBEBFF] w-[90%] p-4 rounded-md self-center">
              <View className="flex-row items-center px-2 py-3 bg-white rounded-lg border border-[#6F9ACB] mb-4">
                <View className="flex-row items-center flex-1">
                  <Entypo name="wallet" size={24} color="black" />
                  <TextInput
                    placeholder="********1234"
                    keyboardType="numeric"
                    onChangeText={(value) =>
                      setCardsData((prev) => ({ ...prev, cardOne: value }))
                    }
                    value={cardsData.cardOne}
                    className=" ml-2 text-base text-gray-900 font-axiformaRegular"
                  />
                </View>
                {cardsData.cardOne && (
                  <MaterialIcons
                    name="cancel"
                    size={20}
                    color="#B2BBC6"
                    onPress={() => setCardsData({ ...cardsData, cardOne: "" })}
                  />
                )}
              </View>
              <View className="flex-row items-center px-2 py-3 bg-white rounded-lg border border-[#6F9ACB] mb-4">
                <View className="flex-row items-center flex-1 ">
                  <Entypo name="wallet" size={24} color="black" />
                  <TextInput
                    placeholder="********1234"
                    keyboardType="numeric"
                    onChangeText={(value) =>
                      setCardsData((prev) => ({ ...prev, cardTwo: value }))
                    }
                    value={cardsData.cardTwo}
                    className="ml-2 text-base text-gray-900 font-axiformaRegular"
                  />
                </View>
                {cardsData.cardTwo && (
                  <MaterialIcons
                    name="cancel"
                    size={20}
                    color="#B2BBC6"
                    onPress={() => setCardsData({ ...cardsData, cardTwo: "" })}
                  />
                )}
              </View>
              <Text className="self-center text-[#7DADE5] text-base font-axiformaRegular my-4">
                + Add New Card
              </Text>
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

            <TouchableOpacity className="mt-10 bg-purple-500 py-3 rounded-3xl items-center mx-4">
              <Text className="text-white-normal font-semibold text-lg font-axiformaRegular">
                Add Money Now
              </Text>
            </TouchableOpacity>

            <View className="mt-8 mb-6 bg-white-normal border border-[#eeeeef] rounded-lg p-4 mx-4">
              <Text className="text-[#151A20] font-semibold text-xl mb-4 font-axiformaBlack text-center">
                Guides On How To Add Money Using Card
              </Text>
              {[
                "Minimum Deposit Of NGN 1000.00 Per Transaction",
                "Maximum Deposit Of 9,999,999.00 Per Transaction",
                "Any Card Details You Choose To Save Are Encrypted.",
                "We Do Not Store Your Cvv",
                "We Would Ask You To Input Your Vybes Pin Anytime You Want To Use Your Card.",
                "We Do Not Share Your Payment Information.",
                "If You Have Any Issues, Pls Contact Customer Service.",
                "Deposit Is Free, There Are No Transaction Fees.",
              ].map((step, index) => (
                <View
                  key={index}
                  className="flex-row mb-2 items-center bg-[#FFFFFF]"
                >
                  <Text className="text-gray-700 font-medium mr-2 font-axiformaRegular">
                    {index + 1}.
                  </Text>
                  <Text className="text-gray-700 font-axiformaRegular leading-5">
                    {step}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
    </SafeAreaView>
  );
};

export default deposit;
