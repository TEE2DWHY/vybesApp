import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StatusBar } from "expo-status-bar";
import { formatNumberWithCommas } from "../../../utils/formatNumber";
import { router } from "expo-router";
import paymentOptions from "../../../assets/images/paymentOptions.png";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { Paystack } from "react-native-paystack-webview";
import { useAccount } from "../../../hooks/useAccount";
import { useToken } from "../../../hooks/useToken";
import axios from "axios";

const Deposit = () => {
  const publicKey = process.env.EXPO_PUBLIC_PAYSTACK_API_PUBLIC_KEY;
  const [selectedMethod, setSelectedMethod] = useState("Bank Transfer");
  const paymentMethods = ["Bank Transfer", "Card", "Stripe", "Quickteller"];
  const [value, setValue] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showPaystackModal, setShowPaystackModal] = useState(false);
  const [error, setError] = useState("");
  const { user, refetchUser } = useAccount();
  const token = useToken();

  const [cardsData, setCardsData] = useState({
    cardOne: "",
    cardTwo: "",
  });

  const formatNumber = (value) => {
    if (!value || value === 0) return "0";

    const formatter = new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    return formatter.format(value);
  };

  const handleChange = (text) => {
    const cleanedText = text.replace(/[^0-9.]/g, "");
    setValue(formatNumberWithCommas(cleanedText));
  };

  const handleAddMoneyNow = () => {
    const cleanedValue = value.replace(/,/g, "");
    const numericValue = Number(cleanedValue);
    if (isNaN(numericValue) || numericValue === 0) {
      return setError("Please Enter A Valid Amount");
    }
    if (numericValue < 1000) {
      return Alert.alert("Note", "Minimum Deposit Amount is 1000 Naira");
    }
    const availableBalance = user?.walletBalance / 0.005;
    if (numericValue > availableBalance) {
      return Alert.alert("Error", "Insufficient Balance");
    }

    setShowConfirmationModal(true);
  };

  const handleProceed = () => {
    setShowConfirmationModal(false);
    setShowPaystackModal(true);
  };

  const handlePaystackSuccess = async (response) => {
    try {
      const { status, data } = response;
      const transactionRef = data?.transactionRef;
      const reference = transactionRef?.reference;
      if (status === "success" && reference) {
        const depositAmount = parseFloat(value.replace(/,/g, ""));
        if (isNaN(depositAmount) || depositAmount <= 0) {
          Alert.alert("Invalid deposit amount.");
          return;
        }

        const depositData = {
          depositAmount: depositAmount,
          paymentReference: reference,
        };

        const backendResponse = await axios.post(
          "https://vybesapi.onrender.com/v1/transaction/deposit",
          depositData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (backendResponse.status === 200) {
          Alert.alert(
            "Success",
            "Deposit Successful and Vybe Coins credited! Redirecting..."
          );
          // console.log(backendResponse.data);
          await refetchUser();
          setTimeout(() => {
            router.push(
              `/profile/deposit/${backendResponse.data.payload.transaction.transactionId}`
            );
          }, 3000);
        } else {
          Alert.alert("Error", "Deposit failed, please try again.");
        }
      } else {
        Alert.alert("Alert", "Payment failed, please try again.");
      }
    } catch (error) {
      console.error("Error during Paystack success:", error);
      Alert.alert("Error", "Error occurred while processing payment.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white-normal mt-6">
      <ScrollView className="mt-4">
        <View className="flex-row justify-between items-center px-4 mt-6">
          <AntDesign
            name="left"
            size={24}
            color="#B2BBC6"
            onPress={() => router.back()}
          />
          <View className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              source={{
                uri: user?.image,
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        </View>

        <View className="flex-row items-center justify-center bg-[#361753] py-4 mt-5 w-full">
          <Text className="text-base text-white-normal font-axiformaRegular mr-2 text-center">
            Deposit
          </Text>
          <AntDesign name="plussquareo" size={24} color="#fff" />
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
                className={`font-medium font-axiformaRegular ${
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
                  onKeyPress={() => setError("")}
                />
              </View>
              <Text className="mt-2 text-[#909DAD] text-right font-axiformaRegular">
                Min (NGN) 1000.00
              </Text>
            </View>

            <Text className="mt-3 text-gray-700 font-medium text-base px-4 font-axiformaRegular">
              Balance (₦) {formatNumber(user?.walletBalance / 0.005)}
            </Text>
            {error && (
              <Text className="text-center text-red-500 font-axiformaRegular mt-6 mb-2">
                {error}
              </Text>
            )}
            <TouchableOpacity
              className={`mt-6 bg-purple-500 py-3 rounded-3xl items-center mx-4 ${
                !value && "opacity-30"
              }`}
              onPress={handleAddMoneyNow}
            >
              <Text className="text-white-normal font-semibold text-base font-axiformaRegular">
                Add Money Now
              </Text>
            </TouchableOpacity>

            <View className="mt-8 bg-white-normal border border-[#eeeeef] rounded-lg p-4 mx-4 mb-6">
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
                  className="flex-row mb-2 items-center bg-[#fff]"
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

            {/* Confirmation Modal */}
            <Modal
              visible={showConfirmationModal}
              transparent
              animationType="slide"
              onRequestClose={() => setShowConfirmationModal(false)}
            >
              <View className="flex-1 justify-center items-center bg-[#1b1b1b67] bg-opacity-50">
                <View className="bg-white-normal rounded-lg w-[90%] border-2 border-gray-50 py-4 px-4">
                  <Text className="text-gray-700 font-axiformaMedium text-base mb-4 capitalize mt-2 text-center">
                    You are about deposit {value} Naira to your Vybes Account.
                  </Text>
                  <TouchableOpacity
                    className="bg-blue-normal py-2 rounded-lg mb-4 "
                    onPress={handleProceed}
                  >
                    <Text className="text-white-normal font-semibold text-base font-axiformaRegular text-center">
                      Proceed
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setShowConfirmationModal(false)}
                    className="bg-red-400 py-2 rounded-lg"
                  >
                    <Text className="text-white-normal font-semibold text-base font-axiformaRegular text-center">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/* Paystack Modal */}
            {showPaystackModal && publicKey && (
              <Paystack
                showPayButton={false}
                paystackKey={publicKey}
                amount={parseFloat(value.replace(/,/g, ""))}
                billingEmail={user?.email}
                billingMobile={user?.phoneNumber}
                billingName={user?.fullName}
                activityIndicatorColor="#006BFF"
                onSuccess={handlePaystackSuccess}
                onCancel={() => {
                  Alert.alert("Error", "User Canclled Payment.");
                  setShowPaystackModal(false);
                }}
                autoStart={true}
                channels={[
                  "bank_transfer",
                  "bank",
                  "card",
                  "ussd",
                  "apple_pay",
                  "mobile_money",
                  "eft",
                ]}
                onClose={() => setShowPaystackModal(false)}
              />
            )}
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
              Balance (₦) {formatNumber(user?.walletBalance / 0.005)}
            </Text>

            <TouchableOpacity
              className={`mt-10 bg-purple-500 py-3 rounded-3xl items-center mx-4 ${
                !value && "opacity-30"
              }`}
            >
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
                  className="flex-row mb-2 items-center bg-[#fff]"
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
      <StatusBar style="dark" backgroundColor="#fff" />
    </SafeAreaView>
  );
};

export default Deposit;
