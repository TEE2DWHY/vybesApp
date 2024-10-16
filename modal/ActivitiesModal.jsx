import { Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const ActivitiesModal = () => {
  return (
    <View className="z-50 w-[200px] rounded-lg bg-white p-4 shadow-2xl border border-[#eeecec] absolute bg-white-normal right-0">
      <View className="flex-row items-center gap-2 py-2 mb-2 border-b border-gray-200">
        <Fontisto name={"bell-alt"} size={22} color="#FFB053" />
        <Text className="text-[#546881] font-axiformaRegular text-base">
          Notification
        </Text>
      </View>
      <View className="flex-row items-center gap-2 py-2 mb-2 border-b border-gray-200">
        <MaterialCommunityIcons
          name={"diamond-stone"}
          size={22}
          color="#BF843E"
        />
        <Text className="text-[#546881] font-axiformaRegular text-base">
          Stories
        </Text>
      </View>
      <View className="flex-row items-center gap-2 py-2 mb-2 border-b border-gray-200">
        <Entypo name={"heart"} size={22} color="#FF9574" />
        <Text className="text-[#546881] font-axiformaRegular text-base">
          Likes
        </Text>
      </View>
      <View className="flex-row items-center gap-2 py-2 mb-2 border-b border-gray-200">
        <FontAwesome5 name={"image"} size={22} color="#4A7CFF" />
        <Text className="text-[#546881] font-axiformaRegular text-base">
          Image
        </Text>
      </View>
      <View className="flex-row items-center gap-2 py-2 border-b border-gray-200">
        <FontAwesome5 name={"file-invoice-dollar"} size={22} color="#7A44C2" />
        <Text className="text-[#546881] font-axiformaRegular text-base">
          Transactions
        </Text>
      </View>
    </View>
  );
};

export default ActivitiesModal;
