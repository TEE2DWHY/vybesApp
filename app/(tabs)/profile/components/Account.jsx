import { Text, TouchableOpacity, View, Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { clear, getItem, removeItem } from "../../../../utils/AsyncStorage";
import { useEffect, useState } from "react";
import { userInstance } from "../../../../config/axios";
import { useAccount } from "../../../../hooks/useAccount";

const Account = () => {
  const { user } = useAccount();

  return (
    <>
      <View className="items-center mt-4">
        <Text className="capitalize font-axiformaBlack text-xl my-3">
          @{user?.userName}
        </Text>
        <Image
          source={{
            uri: "https://plus.unsplash.com/premium_photo-1673792686302-7555a74de717?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          className="w-[150px] h-[150px] rounded-[80px] border-[4px]  border-[#9ec2ec]"
        />
      </View>

      <View className="mt-8">
        <View className="flex-row justify-between">
          <Text className="font-axiformaBlack text-base text-[#3D4C5E]">
            Account Information
          </Text>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-purple-dark opacity-50 font-axiformaBlack">
              Edit
            </Text>
            <AntDesign
              name="edit"
              size={24}
              style={{ color: "#7a31b3", opacity: 0.5 }}
            />
          </TouchableOpacity>
        </View>
        <View className="p-4 mt-2 rounded-lg border-[#FFFFFF] border bg-white-normal ">
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2 mt-3">
            <Text className="text-[#546881] font-axiformaRegular">Name:</Text>
            <Text className="font-axiformaBlack  text-[#1D242D] text-[14px]">
              {user?.fullName}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              UserName:
            </Text>
            <Text className="font-axiformaBlack  text-[#1D242D] text-[14px]">
              {" "}
              @{user?.userName}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Date Of Birth:
            </Text>
            <Text className="font-axiformaBlack text-[#1D242D] text-[14px]">
              {user?.dateOfBirth}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Account Type:
            </Text>
            <Text className="font-axiformaBlack text-[#1D242D] text-[14px]">
              {user?.accountType}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Password:
            </Text>
            <Text className="font-axiformaBlack text-[#1D242D] text-[14px]">
              {user?.password || "*****"}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Wallet Balance:
            </Text>
            <Text className="font-axiformaBlack text-[#1D242D] text-[14px]">
              {user?.walletBalance || "-------"}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Gifted Coins:
            </Text>
            <Text className="font-axiformaBlack text-[#1D242D] text-[14px]">
              {user?.giftedCoins || "-------"}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Subscribers:
            </Text>
            <Text className="font-axiformaBlack  text-[#1D242D] text-[14px]">
              {user?.subscribers || 0}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">E-Mail:</Text>
            <Text className="font-axiformaBlack text-[#1D242D] text-[14px]">
              {`${user?.email?.slice(0, 5)}...@${user?.email?.split("@")[1]}`}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Phone No:
            </Text>
            <Text className="font-axiformaBlack  text-[#1D242D] text-[14px]">
              {user?.phoneNumber}
            </Text>
          </View>
        </View>
      </View>

      <Text className="font-axiformaBlack mt-8 text-lg ">{user?.fullName}</Text>

      <View className="mt-4">
        <Text className="font-axiformaBook text-sm text-[#546881] mb-3">
          Bio Description
        </Text>
        <View className="border py-8 px-4 mt-2 rounded-lg flex-row justify-between">
          <View className="w-1/2 pr-2">
            <Text className="text-center font-axiformaBlack text-[#546881] mb-3">
              Following
            </Text>
            <View className="flex-row justify-between">
              <View className="flex-1 items-center">
                <Text className="text-[#7A91F9] text-xl">112</Text>
                <Text className="text-[#546881] font-axiformaRegular">
                  Vybers
                </Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-[#2AB49B] text-xl">20</Text>
                <Text className="text-[#546881] font-axiformaRegular">
                  Baddies
                </Text>
              </View>
            </View>
          </View>
          <View className="w-1/2 pl-2">
            <Text className="text-center font-axiformaBlack text-[#546881] mb-3">
              Followers
            </Text>
            <View className="flex-row justify-between">
              <View className="flex-1 items-center">
                <Text className="text-[#7A91F9] text-xl">112</Text>
                <Text className="text-[#546881] font-axiformaRegular">
                  Vybers
                </Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-[#2AB49B] text-xl">20</Text>
                <Text className="text-[#546881] font-axiformaRegular">
                  Baddies
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="mt-4 space-y-4">
        <View className="bg-[#fff] rounded-lg shadow-lg">
          <TouchableOpacity className="px-4 py-4 border-b border-[#EEF1F4] flex-row justify-between items-center">
            <Text className="text-[#546881] font-axiformaBlack">Analytics</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="#546881"
            />
          </TouchableOpacity>
          <TouchableOpacity className="px-4 py-4 border-b border-[#EEF1F4] flex-row justify-between items-center">
            <Text className="text-[#546881] font-axiformaBlack">
              Share QR Code
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="#546881"
            />
          </TouchableOpacity>
          <TouchableOpacity className="px-4 py-4 border-b border-[#EEF1F4] flex-row justify-between items-center">
            <Text className="text-[#546881] font-axiformaBlack">
              Share Profile
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="#546881"
            />
          </TouchableOpacity>
          <TouchableOpacity className="px-4 py-4 flex-row justify-between items-center">
            <Text className="text-[#546881] font-axiformaBlack">
              App Language
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="#546881"
            />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between mt-8 mb-14">
          <TouchableOpacity
            className="flex-1 items-center py-3 mr-2 border border-[#E4D7F5] rounded-lg"
            onPress={async () => {
              await removeItem("token");
              await removeItem("isLoggedIn");
              // await removeItem("isAppLaunched");
              router.push("/sign-in");
            }}
          >
            <Text className="text-[#C4B1F3] font-axiformaRegular">Log Out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 items-center py-3 ml-2 border border-[#FFDBDB] rounded-lg"
            onPress={() => {
              router.push("/");
            }}
          >
            <Text className="text-[#FF7474] font-axiformaRegular">
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Account;
