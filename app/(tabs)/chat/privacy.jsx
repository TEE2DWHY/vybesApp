import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";

const Privacy = () => {
  const [selectedOption, setSelectedOption] = useState("All Vybers & Baddies");

  const options = [
    "All Vybers & Baddies",
    "Only Vybers",
    "Only Baddies",
    "Only Baddies I Follow",
    "Only Vybers I Follow",
  ];

  return (
    <>
      <SafeAreaView className="h-full bg-white-normal"></SafeAreaView>
    </>
  );
};

export default Privacy;
