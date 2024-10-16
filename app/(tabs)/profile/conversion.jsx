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
import { router } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Conversion = () => {
  const [activeTab, setActiveTab] = useState("convert");

  return (
    <>
      <SafeAreaView className="flex-1 bg-white-normal">
        <ScrollView className="mt-10 ">
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
              Convert to Vybe Coin
            </Text>
            <FontAwesome6 name="arrows-rotate" size={20} color="white" />
          </View>

          {activeTab === "convert" && (
            <>
              <View className="flex-row items-center gap-4 mt-2 w-[80%] px-6">
                <TouchableOpacity
                  className={`${
                    activeTab === "convert"
                      ? "bg-[#FFB053]"
                      : "bg-transparent border border-[#B2BBC6]"
                  } p-4`}
                  onPress={() => setActiveTab("convert")}
                >
                  <Text
                    className={`${
                      activeTab === "convert"
                        ? "font-axiformaBlack"
                        : "text-[#B2BBC6] font-axiformaRegular"
                    }`}
                  >
                    Convert to Vybe Coin
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`${
                    activeTab === "transfer"
                      ? "bg-[#FFB053]"
                      : "bg-transparent border border-[#B2BBC6]"
                  } p-4`}
                  onPress={() => setActiveTab("transfer")}
                >
                  <Text
                    className={`${
                      activeTab === "transfer"
                        ? "font-axiformaBlack"
                        : "text-[#B2BBC6] font-axiformaRegular"
                    }`}
                  >
                    Transfer Coin
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="mt-6 px-2">
                <View className="bg-white p-4">
                  <Text className="capitalize font-axiformaRegular mb-2">
                    amount (NGN) to be converted to coin
                  </Text>
                  <View className="flex-row p-4 rounded-lg shadow border border-gray-200">
                    <View className="flex-row items-center">
                      <FontAwesome6
                        name="naira-sign"
                        size={20}
                        color="#546881"
                      />
                      <TextInput
                        className=" text-gray-800 text-sm font-medium font-axiformaRegular mt-[-5px] ml-4"
                        placeholder="Enter amount here"
                        keyboardType="number-pad"
                      />
                    </View>
                  </View>
                </View>

                <View className="self-center my-4 bg-[#FFB053] w-14 h-14 border-2 p-4 border-[#FFE7CA] rounded-full justify-center items-center">
                  <FontAwesome6
                    name="arrows-left-right-to-line"
                    size={18}
                    color="#090B0E"
                  />
                </View>

                <View className="bg-white p-4">
                  <Text className="capitalize font-axiformaRegular mb-2">
                    total coins converted
                  </Text>
                  <View className="flex-row p-4 rounded-lg shadow border border-gray-200">
                    <View className="flex-row items-center">
                      <FontAwesome5 name="coins" size={24} color="#9941EE" />
                      <TextInput
                        className=" text-gray-800 text-sm font-medium font-axiformaRegular mt-[-5px] ml-4"
                        placeholder="Total Coin"
                        keyboardType="number-pad"
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View className="mt-8 px-6 mb-10">
                <TouchableOpacity className="bg-purple-normal py-4 rounded-full">
                  <Text className="text-center text-white-normal text-lg font-semibold font-axiformaRegular ">
                    Convert
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {activeTab === "transfer" && (
            <>
              <View className="flex-row items-center gap-4 mt-2 w-[80%] px-6">
                <TouchableOpacity
                  className={`${
                    activeTab === "convert"
                      ? "bg-[#FFB053]"
                      : "bg-transparent border border-[#B2BBC6]"
                  } p-4`}
                  onPress={() => setActiveTab("convert")}
                >
                  <Text
                    className={`${
                      activeTab === "convert"
                        ? "font-axiformaBlack"
                        : "text-[#B2BBC6] font-axiformaRegular"
                    }`}
                  >
                    Convert to Vybe Coin
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`${
                    activeTab === "transfer"
                      ? "bg-[#FFB053]"
                      : "bg-transparent border border-[#B2BBC6]"
                  } p-4`}
                  onPress={() => setActiveTab("transfer")}
                >
                  <Text
                    className={`${
                      activeTab === "transfer"
                        ? "font-axiformaBlack"
                        : "text-[#B2BBC6] font-axiformaRegular"
                    }`}
                  >
                    Transfer Coin
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="mt-6 px-2">
                <View className="bg-white p-4">
                  <Text className="capitalize font-axiformaRegular mb-2">
                    vyber account handle to be transferred to
                  </Text>
                  <View className="flex-row p-4 rounded-lg shadow border border-gray-200">
                    <View className="flex-row items-center">
                      <FontAwesome5 name="user" size={20} color="#546881" />
                      <TextInput
                        className=" text-gray-800 text-sm font-medium font-axiformaRegular mt-[-5px] ml-4 capitalize"
                        placeholder="@Temitayo_1234"
                        keyboardType="number-pad"
                      />
                    </View>
                  </View>
                </View>

                <View className="self-center my-4 bg-[#FFB053] w-14 h-14 border-2 p-4 border-[#FFE7CA] rounded-full justify-center items-center">
                  <MaterialCommunityIcons
                    name="bank-transfer"
                    size={24}
                    color="#090B0E"
                  />
                </View>

                <View className="bg-white p-4">
                  <Text className="capitalize font-axiformaRegular mb-2">
                    total coins converted
                  </Text>
                  <View className="flex-row p-4 rounded-lg shadow border border-gray-200">
                    <View className="flex-row items-center">
                      <FontAwesome5 name="coins" size={24} color="#9941EE" />
                      <TextInput
                        className=" text-gray-800 text-sm font-medium font-axiformaRegular mt-[-5px] ml-4"
                        placeholder="Total Coin"
                        keyboardType="number-pad"
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View className="mt-8 px-6 mb-10">
                <TouchableOpacity className="bg-purple-normal py-4 rounded-full">
                  <Text className="text-center text-white-normal text-lg font-semibold font-axiformaRegular ">
                    Make Transfer
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
        <StatusBar style="dark" backgroundColor="#FFFFFF" />
      </SafeAreaView>
    </>
  );
};

export default Conversion;
