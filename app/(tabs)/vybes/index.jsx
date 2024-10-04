import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { LinearGradient } from "expo-linear-gradient";

const App = () => {
  const [activeSection, setActiveSection] = useState("Baddies");

  const baddiesData = [
    {
      id: 1,
      name: "Olayemi",
      imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 2,
      name: "Roxy",
      imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Sayo",
      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 4,
      name: "Tayo",
      imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 5,
      name: "Bola",
      imageUrl: "https://randomuser.me/api/portraits/women/10.jpg",
    },
  ];

  const vybersData = [
    {
      id: 1,
      name: "Michael",
      imageUrl: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
      id: 2,
      name: "Sarah",
      imageUrl: "https://randomuser.me/api/portraits/women/15.jpg",
    },
    {
      id: 3,
      name: "James",
      imageUrl: "https://randomuser.me/api/portraits/men/20.jpg",
    },
    {
      id: 4,
      name: "Anna",
      imageUrl: "https://randomuser.me/api/portraits/women/25.jpg",
    },
    {
      id: 5,
      name: "John",
      imageUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    },
  ];

  const data = activeSection === "Baddies" ? baddiesData : vybersData;
  const sectionTitle =
    activeSection === "Baddies" ? "Baddie Story" : "Vybers Story";

  return <SafeAreaView className="bg-white-normal h-full"></SafeAreaView>;
};

export default App;
