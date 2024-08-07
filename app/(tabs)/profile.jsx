import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Profile = () => {
  return (
    <>
      <SafeAreaView className="h-full w-full">
        <ScrollView className="px-4 bg-gray-100">
          <View className="flex-row items-center justify-between">
            <AntDesign
              name="caretleft"
              size={24}
              style={{ color: "#546881" }}
            />
            <View className="w-3/5 flex-row items-center justify-center bg-[#7A91F9] p-4 border-none rounded-md">
              <View className="flex-row items-center">
                <FontAwesome5 name="coins" size={24} color="#fff" />
                <Text className="font-axiformaBlack text-sm text-white ml-2 text-white-normal">
                  Bal
                </Text>
              </View>
              <Text className="font-axiformaBlack text-sm text-white ml-4 text-white-normal">
                50 Vybes Coin
              </Text>
            </View>
          </View>

          <ScrollView
            horizontal
            className="mt-8 overflow-x-scroll"
            showsHorizontalScrollIndicator={false}
          >
            <View className="flex-row justify-between">
              <TouchableOpacity className="border-gray-400 px-3 py-2 rounded-sm border flex-row items-center mr-3">
                <MaterialIcons
                  name="manage-accounts"
                  size={24}
                  style={{ color: "#B2BBC6" }}
                />
                <Text className="text-[#B2BBC6] ml-2">Account</Text>
              </TouchableOpacity>
              <TouchableOpacity className="border-gray-400 px-3 py-2 rounded-sm border flex-row items-center mr-3">
                <FontAwesome5
                  name="star-of-life"
                  size={20}
                  style={{ color: "#B2BBC6" }}
                />
                <Text className="text-[#B2BBC6] ml-2">Stories</Text>
              </TouchableOpacity>
              <TouchableOpacity className="border-gray-400 px-3 py-2 rounded-sm border flex-row items-center mr-3">
                <AntDesign
                  name="hearto"
                  size={20}
                  style={{ color: "#B2BBC6" }}
                />
                <Text className="text-[#B2BBC6] ml-2">Likes</Text>
              </TouchableOpacity>
              <TouchableOpacity className="border-gray-400 px-3 py-2 rounded-sm border flex-row items-center">
                <FontAwesome
                  name="bell-o"
                  size={20}
                  style={{ color: "#B2BBC6" }}
                />
                <Text className="text-[#B2BBC6] ml-2">Activity</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View className="items-center mt-4">
            <Text className="capitalize font-axiformaBlack text-xl my-3">
              @WhistleDown112
            </Text>
            <Image
              source={{
                uri: "https://plus.unsplash.com/premium_photo-1673792686302-7555a74de717?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 80,
                borderWidth: "1px",
                borderColor: "##EEF6FF",
              }}
            />
          </View>

          <View className="mt-4">
            <View className="flex-row justify-between">
              <Text className="font-axiformaBlack text-lg">
                Account Information
              </Text>
              <TouchableOpacity className="flex-row items-center">
                <Text className="text-purple-dark opacity-50 font-axiformaBlack">
                  Edit
                </Text>
                <AntDesign
                  name="edit"
                  size={24}
                  style={{ color: "#7a31b3", opacity: "0.5" }}
                />
              </TouchableOpacity>
            </View>
            <View className="p-4 mt-2 rounded-lg border-[#FFFFFF] border-2">
              <View className="flex-row justify-between mb-4  border-b-[#E9E9EB] border-b-[1px] pb-2 mt-3">
                <Text className="text-[#546881] font-axiformaBlack">Name:</Text>
                <Text className="font-axiformaBlack"> Penelope Bridgerton</Text>
              </View>
              <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
                <Text className="text-[#546881] font-axiformaBlack">
                  UserName:
                </Text>
                <Text className="font-axiformaBlack"> @WhistleDown</Text>
              </View>
              <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
                <Text className="text-[#546881] font-axiformaBlack">
                  Date Of Birth:
                </Text>
                <Text className="font-axiformaBlack"> 12-Aug-1990</Text>
              </View>
              <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
                <Text className="text-[#546881] font-axiformaBlack">
                  Account Type:
                </Text>
                <Text className="font-axiformaBlack">Vyber</Text>
              </View>
              <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
                <Text className="text-[#546881] font-axiformaBlack">
                  Password:
                </Text>
                <Text className="font-axiformaBlack"> 12ab34cd56ef</Text>
              </View>
              <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
                <Text className="text-[#546881] font-axiformaBlack">
                  Wallet Balance:
                </Text>
                <Text className="font-axiformaBlack"> 15,000 Vybes Coin </Text>
              </View>
              <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
                <Text className="text-[#546881] font-axiformaBlack">
                  Gifted Coins:
                </Text>
                <Text className="font-axiformaBlack"> 5,000 Vybes Coin </Text>
              </View>
              <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
                <Text className="text-[#546881] font-axiformaBlack">
                  Subscribers:
                </Text>
                <Text className="font-axiformaBlack"> 15</Text>
              </View>
              <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
                <Text className="text-[#546881] font-axiformaBlack">
                  E-Mail:
                </Text>
                <Text className="font-axiformaBlack">
                  Pen...Bridge@gmail.com.
                </Text>
              </View>
              <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
                <Text className="text-[#546881] font-axiformaBlack">
                  Phone No:
                </Text>
                <Text className="font-axiformaBlack">08167715252</Text>
              </View>
            </View>
          </View>

          <View className="mt-4">
            <Text className="font-axiformaBlack text-lg">Bio Description</Text>
            <View className="border p-4 mt-2 rounded-lg">
              <Text>Following: 112 Vybers, 20 Baddies</Text>
              <Text>Followers: 112 Vybers, 20 Baddies</Text>
            </View>
          </View>

          <View className="mt-4 space-y-4">
            <TouchableOpacity className="border p-2 rounded-lg">
              <Text className="text-center">Analytics</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border p-2 rounded-lg">
              <Text className="text-center">Share QR Code</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border p-2 rounded-lg">
              <Text className="text-center">Share Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border p-2 rounded-lg">
              <Text className="text-center">App Language</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border p-2 rounded-lg bg-red-500">
              <Text className="text-center text-white">Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border p-2 rounded-lg bg-red-500">
              <Text className="text-center text-white">Delete Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <StatusBar backgroundColor="#ffffff" style="dark" />
      </SafeAreaView>
    </>
  );
};

export default Profile;
