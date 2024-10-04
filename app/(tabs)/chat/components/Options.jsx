import { View, Text, TouchableOpacity } from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";

const options = [
  {
    id: 1,
    icon: <Fontisto name="bell" size={20} color="#909DAD" />,
    text: "Conversation Starters",
  },
  {
    id: 2,
    icon: <FontAwesome6 name="calendar-days" size={24} color="#909DAD" />,
    text: "Check Availability",
  },
  {
    id: 3,
    icon: <Fontisto name="bell" size={20} color="#909DAD" />,
    text: "Custom Notification",
  },
  {
    id: 4,
    icon: (
      <MaterialCommunityIcons name="delete-outline" size={24} color="#909DAD" />
    ),
    text: "Delete Conversation",
  },
  {
    id: 5,
    icon: <Entypo name="lock" size={24} color="#909DAD" />,
    text: "Chat Lock",
  },
];

const Options = () => {
  return (
    <View className="z-50 border border-[#F3F9FF] bg-white-normal rounded-xl items-center justify-center w-[230px] absolute right-2 p-4 gap-3 shadow-md"></View>
  );
};

export default Options;
