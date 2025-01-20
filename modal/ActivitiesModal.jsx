import { Text, View, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";

const ActivitiesModal = ({ onSelectType }) => {
  return (
    <View className="z-50 w-[200px] rounded-lg bg-white p-4 border border-[#eeecec] absolute bg-white-normal right-0 top-12">
      <TouchableOpacity
        className="flex-row items-center gap-2 py-2 mb-2 border-b border-gray-200"
        onPress={() => onSelectType("friendRequest")}
      >
        <AntDesign name="plus" size={22} color="#FFB053" />
        <Text className="text-[#546881] font-axiformaRegular text-base">
          Friend Request
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center gap-2 py-2 mb-2 border-b border-gray-200"
        onPress={() => onSelectType("story")}
      >
        <MaterialCommunityIcons
          name={"diamond-stone"}
          size={22}
          color="#BF843E"
        />
        <Text className="text-[#546881] font-axiformaRegular text-base">
          Stories
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center gap-2 py-2 mb-2 border-b border-gray-200"
        onPress={() => onSelectType("like")}
      >
        <Entypo name={"heart"} size={22} color="#FF9574" />
        <Text className="text-[#546881] font-axiformaRegular text-base">
          Likes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center gap-2 py-2 mb-2 border-b border-gray-200"
        onPress={() => onSelectType("bookmarks")}
      >
        <FontAwesome5 name={"image"} size={22} color="#4A7CFF" />
        <Text className="text-[#546881] font-axiformaRegular text-base">
          Bookmarks
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center gap-2 py-2 border-b border-gray-200"
        onPress={() => onSelectType("transaction")}
      >
        <FontAwesome5 name={"file-invoice-dollar"} size={22} color="#7A44C2" />
        <Text className="text-[#546881] font-axiformaRegular text-base">
          Transactions
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActivitiesModal;
