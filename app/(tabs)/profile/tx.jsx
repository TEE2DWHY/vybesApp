import { SafeAreaView, View } from "react-native";

const Tx = ({ header }) => {
  return (
    <SafeAreaView>
      <View className="border-[#F3F9FF] border rounded-md">
        <Text className="font-axiformaBlack text-[#3D4C5E]">{header}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Tx;
