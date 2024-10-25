import { Image, Text, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const Empty = ({ text }) => {
  return (
    <>
      <View className="flex-1 items-center justify-center h-[60vh]">
        <View className="mb-2">
          <FontAwesome5 name="users-slash" size={24} color="#1b1b1b" />
        </View>
        <Text className="text-lg text-gray-500 font-axiformaRegular capitalize">
          {text}
        </Text>
      </View>
    </>
  );
};

export default Empty;
