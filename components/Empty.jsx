import { Image, Text, View } from "react-native";

const Empty = ({ text }) => {
  return (
    <>
      <View className="flex-1 items-center justify-center h-[60vh]">
        <Text className="text-lg text-gray-500 font-axiformaBlack">{text}</Text>
      </View>
    </>
  );
};

export default Empty;
