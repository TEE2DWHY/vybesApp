import { Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Link } from "expo-router";

const ChatModal = () => {
  return (
    <View className="z-[50] bg-white border rounded-lg w-[180px] h-[190px] border-[#ffff] absolute top-[120px] right-5 bg-white-normal overflow-hidden">
      <View className="flex-row gap-4 items-center py-4 px-4 border-b border-[#F2F4F6]">
        <AntDesign name="lock1" size={20} color="#A3ADBB" />
        <Link href={"/chat/privacy"}>
          <Text className="text-[#3D4C5E] font-axiformaRegular text-base">
            Chat Privacy
          </Text>
        </Link>
      </View>
      <View className="flex-row gap-4 items-center py-4 px-4 border-b border-[#F2F4F6]">
        <Entypo name="pin" size={20} color="#A3ADBB" />
        <Text className="text-[#3D4C5E] font-axiformaRegular text-base">
          Pin Chat
        </Text>
      </View>
      <View className="flex-row gap-4 items-center py-4 px-4 border-b border-[#F2F4F6]">
        <FontAwesome5 name="calendar-alt" size={20} color="#A3ADBB" />
        <Text className="text-[#3D4C5E] font-axiformaRegular text-base">
          Set Availability
        </Text>
      </View>
    </View>
  );
};

export default ChatModal;
