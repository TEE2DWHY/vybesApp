import { Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";

const HeaderComponent = ({ showChatModal }) => {
  return (
    <>
      <View className="flex-row items-center justify-between">
        <View className="flex-row gap-6 items-center">
          <AntDesign name="left" size={24} color="#546881" />
          <Text className="capitalize text-[#495795] font-axiformaBlack text-lg">
            Chats
          </Text>
        </View>
        <View className="flex-row items-center gap-6">
          <Ionicons name="person-add-sharp" size={24} color="#7A91F9" />
          <FontAwesome name="search" size={24} color="#7A91F9" />
          <View className="relative">
            <Entypo
              name="dots-three-vertical"
              size={24}
              color="#7A91F9"
              onPress={showChatModal}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default HeaderComponent;
