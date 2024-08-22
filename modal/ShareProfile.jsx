import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const ShareProfile = ({ closeModal }) => {
  return (
    <>
      <View className="bg-purple-darker rounded-tl-[40px] rounded-tr-[40px] z-20 w-[100%] fixed bottom-0 p-4 mt-[-30px]">
        <TouchableOpacity className="self-center"></TouchableOpacity>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/women/2.jpg" }}
          alt="user-image"
          className="rounded-[50%] w-[40px] h-[40px] self-center"
        />
        <View className="flex-row items-center justify-between mt-6">
          <Text className="capitalize text-white-normal font-axiformaBlack">
            share your profile via
          </Text>
          <View className="flex-row items-center">
            <Text className="text-[#B2BBC6] font-axiformaRegular mr-3">
              Copy Link
            </Text>
            <Ionicons name="link-sharp" size={24} color="#9941EE" />
          </View>
        </View>
        <View className="bg-white-normal rounded-[2px] flex-wrap  mt-3 border border-b-gray-500 pb-2">
          <View className="w-[100%] flex-row items-center justify-center mb-8 mt-3">
            <FontAwesome
              name="facebook-square"
              size={24}
              style={{ color: "#000AFF", width: "25%" }}
            />
            <Fontisto
              name="messenger"
              size={24}
              style={{ color: "#B2BBC6", width: "25%" }}
            />
            <FontAwesome6
              name="tiktok"
              size={24}
              style={{ color: "#3A1078", width: "25%" }}
            />
            <Entypo
              name="instagram"
              size={24}
              style={{ color: "#3795BD", width: "10%" }}
            />
          </View>
          <View className="w-[100%] flex-row items-center justify-center mb-4">
            <FontAwesome
              name="reddit"
              size={24}
              style={{ color: "#FF8343", width: "25%" }}
            />
            <AntDesign
              name="linkedin-square"
              size={24}
              style={{ color: "#3FA2F6", width: "25%" }}
            />
            <Entypo
              name="twitter-with-circle"
              size={24}
              style={{ color: "#1A2130", width: "25%" }}
            />
            <FontAwesome5
              name="whatsapp-square"
              size={24}
              style={{ color: "#88D66C", width: "10%" }}
            />
          </View>
        </View>
        <View className="mt-4 border-t border-t-white-normal w-full items-center">
          <TouchableOpacity onPress={closeModal}>
            <Text className="font-axiformaBlack text-[#909DAD] pt-4">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ShareProfile;
