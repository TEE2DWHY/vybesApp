import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

const coinValues = [
  { amount: "₦1,000.00", coin: "5 Vybe Coin" },
  { amount: "₦5,000.00", coin: "25 Vybe Coin" },
  { amount: "₦10,000.00", coin: "50 Vybe Coin" },
  { amount: "₦50,000.00", coin: "250 Vybe Coin" },
  { amount: "₦100,000.00", coin: "500 Vybe Coin" },
];

const TxDashboard = () => {
  return (
    <SafeAreaView className="mt-4 h-full">
      <ScrollView className="px-4 mt-2">
        <View className="flex-row items-center justify-between">
          <AntDesign name="left" size={24} style={{ color: "#B2BBC6" }} />
          <Image
            source={{
              uri: "https://plus.unsplash.com/premium_photo-1673792686302-7555a74de717?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            className="w-10 h-10 rounded-full"
            resizeMode="cover"
          />
        </View>
        <View className="bg-purple-darker w-[95%] rounded-lg p-8 self-center mt-8">
          <View className="border-b border-b-white-normal flex-row items-center justify-between pb-6">
            <Text className="capitalize font-axiformaRegular text-white-normal">
              total coin balance
            </Text>
            <Text className="capitalize font-axiformaRegular text-white-normal">
              50 vybes coin
            </Text>
          </View>
          <View className="flex-row items-center justify-between pt-6">
            <Text className="capitalize font-axiformaRegular text-white-normal">
              total convertible money
            </Text>
            <Text className="capitalize font-axiformaRegular text-white-normal">
              #500,000
            </Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between my-10">
          <TouchableOpacity
            className="bg-[#055582] px-4 py-3 rounded-lg flex-row items-center justify-center"
            onPress={() => router.push("/profile/deposit")}
          >
            <Text className="text-white-normal font-axiformaRegular mr-1">
              Deposit
            </Text>
            <AntDesign name="plussquareo" size={20} color="#ffff" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#86D8D3] px-4 py-3 rounded-lg flex-row items-center justify-center">
            <Text className="font-axiformaRegular mr-1">Withdraw</Text>
            <Feather name="arrow-up-right" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#FFB053] px-4 py-3 rounded-lg flex-row items-center justify-center">
            <Text className="text-[#593E1D] font-axiformaRegular mr-1">
              Convert
            </Text>
            <Fontisto name="spinner-refresh" size={20} color="#593E1D" />
          </TouchableOpacity>
        </View>
        <View className="self-center flex-row space-x-14 bg-white-normal p-8 rounded-md border border-[#F3F9FF]">
          <TouchableOpacity className="gap-4">
            <View
              style={{
                backgroundColor: "#F5ECFD",
                borderRadius: 10,
                padding: 8,
              }}
            >
              <FontAwesome5
                name="telegram"
                size={28}
                color="#9941EE"
                style={{ textAlign: "center" }}
              />
            </View>
            <Text className="text-black-dark capitalize font-axiformaRegular">
              transfer coin
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="gap-4">
            <View
              style={{
                backgroundColor: "#F5ECFD",
                borderRadius: 10,
                padding: 8,
              }}
            >
              <MaterialCommunityIcons
                name="database-arrow-down-outline"
                size={28}
                color="#9941EE"
                style={{ textAlign: "center" }}
              />
            </View>
            <Text className="text-black-dark capitalize font-axiformaRegular">
              request coin
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-[#47586E] capitalize font-axiformaBlack mt-8 mb-4 text-base">
          Coin Value
        </Text>
        <View className="mt-1 rounded-lg bg-[#FFFFFF] border border-[#F3F9FF] p-4">
          {coinValues.map((item, index) => (
            <View
              key={index}
              className="flex-row items-center justify-between mb-4 border-b border-[#F3F9FF] pb-4"
            >
              <Text className="text-[#47586E] font-axiformaRegular">
                {item.amount}
              </Text>
              <FontAwesome5 name="exchange-alt" size={16} color="#FFB053" />
              <View className="flex-row item-center">
                <MaterialCommunityIcons
                  name="star-three-points"
                  size={16}
                  color="#9941EE"
                />
                <Text className="text-[#47586E] font-axiformaRegular ml-1">
                  {item.coin}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <StatusBar style="dark" backgroundColor="#ffff" />
    </SafeAreaView>
  );
};

export default TxDashboard;
