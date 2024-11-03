import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { router } from "expo-router";

const transferDetails = () => {
  return (
    <SafeAreaView className="flex-1 bg-white mt-10">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="flex-row items-center justify-between mt-2 mx-4">
          <TouchableOpacity>
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              style={{ color: "#546881" }}
              onPress={() => router.back()}
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-center bg-[#7A91F9] p-4 rounded-md"
            onPress={() => console.log("Go to Balance")}
          >
            <FontAwesome5 name="coins" size={20} color="#fff" />
            <Text className="font-axiformaBlack text-sm text-white-normal ml-2">
              Bal
            </Text>
            <Text className="font-axiformaBlack text-sm text-white-normal ml-4">
              50 Vybes Coin
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mx-4 mt-12 p-6 bg-[#F9FAFB] rounded-lg shadow-md">
          <Text className="text-center font-axiformaBold text-lg mb-4">
            Transfer Details
          </Text>

          <View className="flex-row justify-between items-center my-2">
            <Text className="font-axiformaRegular text-base text-[#546881]">
              Amount
            </Text>
            <Text className="font-axiformaBold text-base text-[#7A91F9]">
              60 Vybes Coin
            </Text>
          </View>

          <View className="flex-row justify-between items-center my-2">
            <Text className="font-axiformaRegular text-base text-[#546881]">
              Status
            </Text>
            <Text className="font-axiformaBold text-base text-[#546881]">
              Success
            </Text>
          </View>

          <View className="flex-row justify-between items-center my-2">
            <Text className="font-axiformaRegular text-base text-[#546881]">
              Time
            </Text>
            <Text className="font-axiformaBold text-base text-[#546881]">
              02/03/24 16:10:00
            </Text>
          </View>

          <View className="flex-row justify-between items-center my-2">
            <Text className="font-axiformaRegular text-base text-[#546881]">
              Sent
            </Text>
            <Text className="font-axiformaBold text-base text-[#546881]">
              @Esther
            </Text>
          </View>

          <View className="flex-row justify-between items-center my-2">
            <Text className="font-axiformaRegular text-base text-[#546881]">
              Transaction No
            </Text>
            <Text className="font-axiformaBold text-base text-[#546881]">
              2345678901123456789
            </Text>
          </View>

          <View className="flex-row justify-between items-center my-2">
            <Text className="font-axiformaRegular text-base text-[#546881]">
              Wallet Balance
            </Text>
            <Text className="font-axiformaBold text-base text-[#546881]">
              4940 Vybe Coin
            </Text>
          </View>
        </View>

        <View className="items-center mt-14">
          <View className="flex-row items-center gap-2">
            <Text className="text-[#7A91F9] text-sm w-4/5 self-center text-center">
              Contact Our Customer Support For More Assistance
            </Text>
            <MaterialIcons
              name="arrow-forward-ios"
              size={18}
              style={{ color: "#7A91F9" }}
              onPress={() => console.log("Go Back")}
            />
          </View>
          <Text className="text-[#546881] text-sm mt-2">Call 090229717250</Text>
        </View>
      </ScrollView>
      <StatusBar style="dark" backgroundColor="#fff" />
    </SafeAreaView>
  );
};

export default transferDetails;
