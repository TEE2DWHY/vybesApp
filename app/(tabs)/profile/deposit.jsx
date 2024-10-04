import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StatusBar } from "expo-status-bar";
import { formatNumberWithCommas } from "../../../utils/formatNumber";
import { router } from "expo-router";
import paymentOptions from "../../../assets/images/paymentOptions.png";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";

const deposit = () => {
  const [selectedMethod, setSelectedMethod] = useState("Bank Transfer");
  const paymentMethods = ["Bank Transfer", "Card", "Stripe", "Quickteller"];
  const [value, setValue] = useState("");
  const [cardsData, setCardsData] = useState({
    cardOne: "",
    cardTwo: "",
  });

  const handleChange = (text) => {
    const cleanedText = text.replace(/[^0-9.]/g, "");
    setValue(formatNumberWithCommas(cleanedText));
  };

  return <SafeAreaView className="flex-1 bg-white"></SafeAreaView>;
};

export default deposit;
