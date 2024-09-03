import { SafeAreaView, View, TouchableOpacity, Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const TxDashboard = () => {
  return (
    <SafeAreaView className="mt-4 px-2">
      <View className="flex-row items-center justify-between">
        <TouchableOpacity>
          <AntDesign name="left" size={24} style={{ color: "#B2BBC6" }} />
          <Image
            source={{
              uri: "https://plus.unsplash.com/premium_photo-1673792686302-7555a74de717?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
          />
        </TouchableOpacity>
      </View>
      <View className="bg-purple-darker w-[95%] rounded-lg p-8">
        <View className="border border-b-white-normal flex-row items-center justify-between">
          <Text className="capitalize font-axiformaRegular">
            total coin balance
          </Text>
          <Text className="capitalize font-axiformaRegular">50 vybes coin</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="capitalize font-axiformaRegular">
            total convertible money
          </Text>
          <Text className="capitalize font-axiformaRegular">#500,000</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TxDashboard;
