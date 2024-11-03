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
  FlatList,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";

const banks = [
  { id: "1", name: "Access Bank" },
  { id: "2", name: "First Bank" },
  { id: "3", name: "Guaranty Trust Bank" },
  { id: "4", name: "Zenith Bank" },
  { id: "5", name: "UBA" },
  { id: "6", name: "Sterling Bank" },
  // Add more banks as needed
];

const Withdraw = () => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectBank = (bankName) => {
    setSelectedBank(bankName);
    setModalVisible(false);
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-white-normal">
        <ScrollView className="mt-10">
          <View className="flex-row justify-between items-center px-4">
            <AntDesign
              name="left"
              size={24}
              color="#B2BBC6"
              onPress={() => router.push("/profile/txDashboard")}
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

          <View className="flex-row items-center justify-center bg-[#361753] py-4 mt-5 w-full">
            <Text className="text-base text-white-normal font-axiformaRegular mr-2 text-center">
              Withdraw To Bank
            </Text>
            <Feather name="arrow-up-right" size={24} color="#fff" />
          </View>

          <View className="flex-row gap-4 mt-2 w-[90%] px-6">
            <AntDesign name="infocirlceo" size={20} color="#7A91F9" />
            <Text className="text-[#3D4C5E] font-axiformaRegular text-sm">
              Vybes & Date charges a{" "}
              <Text className="text-purple-normal">10%</Text> withdrawal fee on
              any amount you take out.
            </Text>
          </View>

          <View className="mt-6 px-2">
            <View className="bg-white p-4">
              <View className="flex-row justify-between items-center mb-4 p-4 rounded-lg shadow border border-gray-200">
                <View className="flex-row items-center">
                  <AntDesign name="home" size={24} color="#47586E" />
                  <Text className="ml-2 text-gray-800 text-sm font-medium font-axiformaRegular">
                    {selectedBank || "Select Bank"}
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

              <View className="flex-row justify-between items-center p-4 rounded-lg shadow-lg border border-gray-200">
                <View className="flex-row items-center">
                  <AntDesign name="user" size={24} color="#47586E" />
                  <TextInput
                    className="ml-2 text-gray-800 text-sm font-medium font-axiformaRegular mt-[-5px]"
                    placeholder="Enter account number here"
                    keyboardType="number-pad"
                    maxLength={10}
                  />
                </View>
                <TouchableOpacity>
                  <AntDesign name="closecircleo" size={20} color="#B2BBC6" />
                </TouchableOpacity>
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
              Withdrawable Balance (₦) 500,000.00
            </Text>
          </View>

          <View className="mt-6 px-6">
            <View className="flex-row items-center px-4 py-2 bg-white border border-gray-300 rounded-lg">
              <TextInput
                placeholder="Enter amount"
                keyboardType="numeric"
                value={withdrawAmount}
                onChangeText={setWithdrawAmount}
                className="flex-1 ml-2 text-gray-900 text-base font-axiformaRegular"
              />
            </View>
          </View>

          <View className="mt-10 px-6 mb-12">
            <TouchableOpacity className="bg-purple-normal py-4 rounded-full">
              <Text className="text-center text-white-normal text-lg font-semibold font-axiformaRegular">
                Withdraw
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <StatusBar style="dark" backgroundColor="#ffff" />

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-[#1b1b1ba0] bg-opacity-50">
            <View className="w-4/5 bg-white-normal rounded-lg p-5 shadow-lg">
              <Text className="text-lg font-bold mb-2 text-center font-axiformaRegular">
                Select a Bank
              </Text>
              <FlatList
                data={banks}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="py-4 border-b border-gray-300"
                    onPress={() => handleSelectBank(item.name)}
                  >
                    <Text className="text-base font-axiformaRegular">
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
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
