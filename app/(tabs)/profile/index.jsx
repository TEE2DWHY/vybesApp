import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import EditProfile from "../../../modal/EditProfile";
import Personality from "./components/Personality";
import Account from "./components/Account";
import Activities from "./components/Activities";
import Privacy from "./components/Privacy";
import Settings from "./components/Settings";
import Transactions from "./components/Transactions";
import Stories from "./components/Stories";
import Likes from "./components/Likes";

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Account");
  const [personalityTab, setPersonalityTab] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();

  const handlePrevious = () => {
    if (personalityTab > 4 || personalityTab > 1)
      setPersonalityTab((prevState) => prevState - 1);
  };

  const handleNext = () => {
    if (personalityTab < 4) setPersonalityTab((prevState) => prevState + 1);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
    console.log("Profile details fetched successfully.");
  };

  return (
    <>
      <SafeAreaView className="h-full w-full"></SafeAreaView>
    </>
  );
};

export default Profile;
