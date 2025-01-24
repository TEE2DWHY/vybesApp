import React, { useEffect, useState } from "react";
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
import { router, useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { Paystack } from "react-native-paystack-webview";
import { useAccount } from "../../../hooks/useAccount";
import { useToken } from "../../../hooks/useToken";
import axios from "axios";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import paid from "../../../assets/images/paid.png";

const BuyTicket = () => {
  const publicKey = process.env.EXPO_PUBLIC_PAYSTACK_API_PUBLIC_KEY;
  const [selectedMethod, setSelectedMethod] = useState("Bank Transfer");
  const paymentMethods = ["Bank Transfer", "Card", "Quickteller", "USSD"];
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showPaystackModal, setShowPaystackModal] = useState(false);
  const [error, setError] = useState("");
  const { user, refetchUser } = useAccount();
  const token = useToken();
  const { id, ticketType, ticketImage, ticketName, location } =
    useLocalSearchParams();
  const [ticketPrice, setTicketPrice] = useState(0);
  const [isTicketBought, setIsTicketBought] = useState(false);

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

  const handleAddMoneyNow = () => {
    const price = Number(ticketPrice);
    const availableBalance = user?.walletBalance / 0.005;
    if (price > availableBalance) {
      return Alert.alert("Error", "Insufficient Balance");
    }
    setShowConfirmationModal(true);
  };

  const handleProceed = () => {
    setShowConfirmationModal(false);
    setShowPaystackModal(true);
  };

  useEffect(() => {
    const getTicketPrice = async () => {
      try {
        const response = await axios.get(
          `https://vybesapi.onrender.com/v1/event/get-ticket-price/${id}/${ticketType}`
        );
        setTicketPrice(Number(response.data?.message?.price));
      } catch (error) {
        console.log(error?.response.data.message);
      }
    };
    if (token) {
      getTicketPrice();
    }
  }, [token]);

  const handlePaystackSuccess = async (response) => {
    try {
      const { status, data } = response;
      const transactionRef = data?.transactionRef;
      const reference = transactionRef?.reference;
      if (status === "success" && reference) {
        const response = await axios.post(
          `https://vybesapi.onrender.com/v1/event/generate-ticket/${id}`,
          {
            fullName: user?.fullName,
            email: user?.email,
            ticketName: ticketName,
            location: location,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setIsTicketBought(true);
      }
    } catch (error) {
      console.error(
        "Error during Paystack success:",
        error?.response.data.message
      );
      Alert.alert("Error", "Error occurred while processing payment.");
    }
  };
  return (
    <SafeAreaView className="flex-1 mt-6">
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

        <View className="flex-row items-center justify-center bg-[#2B3357] py-4 mt-5 w-full">
          <Text className="text-base text-white-normal font-axiformaRegular mr-2 text-center">
            Ticket Payment
          </Text>
          <Entypo name="ticket" size={20} color="#fff" />
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
                  onChangeText={setTicketPrice}
                  value={
                    ticketPrice
                      ? formatNumberWithCommas(ticketPrice.toString())
                      : ""
                  }
                  className="flex-1 ml-2 text-base text-gray-900 font-axiformaRegular"
                  onKeyPress={() => setError("")}
                  editable={false}
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
              className={`mt-10 mb-2 bg-purple-500 py-4 rounded-3xl items-center mx-4 w-[90%] self-center ${
                !ticketPrice && "opacity-30"
              }`}
              onPress={handleAddMoneyNow}
            >
              <Text className="text-white-normal font-semibold text-base font-axiformaRegular">
                Pay Now
              </Text>
            </TouchableOpacity>

            <View className="mt-8 bg-white-normal border border-[#eeeeef] rounded-xl p-4 mx-4 mb-6">
              <Text className="text-[#151A20] py-2 text-lg mb-4 font-axiformaMedium text-center">
                Important Details/Steps
              </Text>
              {[
                "Make Payment",
                "once payment for ticket is confirmed.",
                "within 30 minutes - 1hour your ticket would appear on your notifications / email.",
                "download your ticket .",
              ].map((step, index) => (
                <View
                  key={index}
                  className="flex-row mb-3 items-center bg-[#fff]"
                >
                  <Text className="text-gray-700  mr-2 font-axiformaMedium">
                    {index + 1}.
                  </Text>
                  <Text className="text-gray-700 font-axiformaMedium leading-5 capitalize">
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
                <View className="bg-white-normal p-4 rounded-lg w-[90%] border-2 border-gray-50 py-4 px-4">
                  <Text className="text-gray-700 font-medium text-base mb-4 font-axiformaRegular">
                    You are about to purchase a ticket from Vybes App.
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
                amount={ticketPrice}
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

        {/* {selectedMethod === "Card" && (
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
        )} */}

        {(selectedMethod === "Card" ||
          selectedMethod === "Quickteller" ||
          selectedMethod === "USSD") && (
          <ScrollView>
            <View className="my-20 flex-row items-center justify-center gap-2">
              <View>
                <MaterialCommunityIcons
                  name="parachute"
                  size={24}
                  color="#a241ee"
                />
              </View>
              <Text className="text-[#2B3357] text-base font-axiformaRegular">
                {`${selectedMethod} Payment Is Coming Soon...`}
              </Text>
            </View>
          </ScrollView>
        )}
        <Modal
          visible={isTicketBought}
          transparent={true}
          className="opacity-20"
          animationType="fade"
        >
          <TouchableOpacity
            className="items-center justify-center bg-[#1b1b1ba0] bg-opacity-50 h-full"
            onPress={() => setIsTicketBought(false)}
          >
            <View className="absolute rounded-xl py-8  bg-white-normal items-center w-[90%] h-fit shadow-slate-400">
              <Image
                source={paid}
                resizeMode="cover"
                className="rounded-full w-[100px] h-[100px]"
              />
              <Text className="text-[#7A91F9] text-2xl font-axiformaBlack text-center w-[80%] capitalize leading-6 mb-2">
                Payment Confirmed
              </Text>
              <Text className="capitalize text-[#546881] font-axiformaRegular text-[14px] text-center my-4 w-[60%] leading-6">
                you have successfuly payed for your ticket.
              </Text>
              <Image
                source={{ uri: ticketImage }}
                resizeMode="cover"
                className="rounded-lg w-[80%] h-[190px]"
              />
              <TouchableOpacity
                className="bg-purple-normal py-3 px-6 rounded-full mt-6"
                // onPress={switchTab}
              >
                <Text className="font-axiformaRegular text-white-normal text-lg">
                  Download Reciept
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
      <StatusBar style="dark" backgroundColor="#fff" />
    </SafeAreaView>
  );
};

export default BuyTicket;
