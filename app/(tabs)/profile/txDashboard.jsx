import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

const coinValues = [
  { amount: "₦1,000.00", coin: "5 Vybe Coin" },
  { amount: "₦5,000.00", coin: "25 Vybe Coin" },
  { amount: "₦10,000.00", coin: "50 Vybe Coin" },
  { amount: "₦50,000.00", coin: "250 Vybe Coin" },
  { amount: "₦100,000.00", coin: "500 Vybe Coin" },
];

const TxDashboard = () => {
  return <SafeAreaView className="mt-4 h-full"></SafeAreaView>;
};

export default TxDashboard;
