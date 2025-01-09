import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Feather from "@expo/vector-icons/Feather";
import axios from "axios";
import { router } from "expo-router";
import { useAccount } from "../../../hooks/useAccount";
import { useToken } from "../../../hooks/useToken";

const Withdraw = () => {
  const { user } = useAccount();
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [banks, setBanks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const token = useToken();

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get("https://nigerianbanks.xyz");
        setBanks(response.data);
      } catch (error) {
        console.error("Error fetching banks data", error);
        Alert.alert("Error", "Failed to load banks data");
      }
    };

    fetchBanks();
  }, []);

  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatNumber = (value) => {
    if (!value || value === 0) return "0";

    const formatter = new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    return formatter.format(value);
  };

  const handleSelectBank = (bankName, bankCode) => {
    setSelectedBank({ name: bankName, code: bankCode });
    setModalVisible(false);
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || !selectedBank || !accountNumber) {
      return Alert.alert(
        "Note",
        "Please provide all details to proceed with the withdrawal."
      );
    }
    console.log(user?.walletBalance * 0.005);
    if (user?.walletBalance < parseFloat(withdrawAmount)) {
      return setError("Insufficient Balance.");
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://vybesapi.onrender.com/v1/transaction/withdraw",
        {
          amount: withdrawAmount,
          bankCode: selectedBank.code,
          accountNumber,
          email: user?.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === "Withdrawal request successful") {
        alert("Withdrawal request successful!");
      } else {
        alert("Withdrawal failed: " + response.data.message);
      }
    } catch (error) {
      console.error(error.response.data.message);
      alert("An error occurred while processing your withdrawal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
              Withdraw To Bank
            </Text>
            <Feather name="arrow-up-right" size={24} color="#fff" />
          </View>

          <View className="mt-6 px-2">
            <View className="bg-white p-4">
              <View className="flex-row justify-between items-center mb-4 p-4 rounded-lg border border-gray-200">
                <View className="flex-row items-center">
                  <AntDesign name="home" size={24} color="#47586E" />
                  <Text className="ml-2 text-gray-800 text-sm font-medium font-axiformaRegular">
                    {selectedBank?.name || "Select Bank"}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  className="flex-row items-center"
                >
                  <Text className="text-blue-400 font-medium font-axiformaRegular mr-2">
                    Select Bank
                  </Text>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={20}
                    color="#909DAD"
                  />
                </TouchableOpacity>
              </View>

              <View className="flex-row justify-between items-center p-4 rounded-lg  border border-gray-200">
                <View className="flex-row items-center">
                  <AntDesign name="user" size={24} color="#47586E" />
                  <TextInput
                    className="ml-2 text-gray-800 text-sm font-medium font-axiformaRegular mt-[-5px]"
                    placeholder="Enter account number here"
                    keyboardType="numeric"
                    maxLength={10}
                    value={accountNumber}
                    onChangeText={(text) => {
                      const cleanedText = text.replace(/[^0-9]/g, "");
                      setAccountNumber(cleanedText);
                    }}
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity className="mt-4">
              <Text
                className="text-blue-400 text-center font-axiformaRegular"
                onPress={() => setModalVisible(true)}
              >
                Switch Bank Account
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mt-6 pr-4">
            <Text className="text-[#546881] font-medium font-axiformaRegular text-right text-sm">
              Withdrawable Balance (₦){" "}
              {formatNumber(user?.walletBalance / 0.005)}
            </Text>
          </View>

          <View className="mt-6 px-6">
            <View className="flex-row items-center px-4  bg-white border border-gray-300 rounded-lg py-4 h-fit ">
              <TextInput
                placeholder="Enter amount"
                keyboardType="numeric"
                value={withdrawAmount}
                onChangeText={setWithdrawAmount}
                className="flex-1 ml-2 text-gray-900 text-base font-axiformaRegular"
              />
            </View>
          </View>
          {error && (
            <Text className="text-center text-red-500 text-sm font-axiformaRegular mt-6">
              {error}
            </Text>
          )}
          <View className="mt-10 px-6 mb-12">
            <TouchableOpacity
              className="bg-purple-normal py-4 rounded-full"
              onPress={handleWithdraw}
              disabled={loading}
            >
              <Text className="text-center text-white-normal text-lg font-semibold font-axiformaRegular">
                {loading ? "Processing..." : "Withdraw"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <StatusBar style="dark" backgroundColor="#fff" />

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-[#1b1b1ba0] bg-opacity-50">
            <View className="bg-white-normal rounded-lg p-5 w-[85%] h-[400px]">
              <Text className="text-base font-bold mb-2 text-center font-axiformaRegular">
                Select a Bank
              </Text>

              <View className="flex-row items-center mb-4 border border-gray-300 rounded-lg p-2">
                <MaterialIcons
                  name="search"
                  size={20}
                  color="#47586E"
                  style={{ marginTop: 5 }}
                />
                <TextInput
                  placeholder="Search for a bank"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  className="ml-2 text-sm font-axiformaRegular"
                />
              </View>

              <FlatList
                data={filteredBanks}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="py-4 border-b border-gray-300"
                    onPress={() => handleSelectBank(item.name, item.code)}
                  >
                    <View className="flex-row items-center">
                      <Image
                        source={{ uri: item.logo }}
                        style={{ width: 30, height: 30, marginRight: 10 }}
                        resizeMode="contain"
                      />
                      <Text className="text-base font-axiformaRegular">
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.code}
              />
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="mt-5 p-3 bg-purple-normal rounded-lg"
              >
                <Text className="text-white-normal font-bold text-center font-axiformaBlack">
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default Withdraw;
