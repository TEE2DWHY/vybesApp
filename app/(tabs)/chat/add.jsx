import { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  Image,
  RefreshControl,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import HeaderComponent from "./components/HeaderComponent";

const Add = () => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
    console.log("Profile details fetched successfully.");
  };
  const data = [
    {
      id: "1",
      username: "@Dhemmexroxy",
      description: "i am a lover watching animation...",
      badge: "Baddie",
      badgeColor: "#CDEDEA",
      badgeTextColor: "#50C2C9",
      followStatus: "requested",
      imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: "2",
      username: "@JaneDoe",
      description: "Love dancing and doing a lot...",
      badge: "Baddie",
      badgeColor: "#CDEDEA",
      badgeTextColor: "#50C2C9",
      followStatus: "follow",
      imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: "3",
      username: "@JohnSmith",
      description: "Love taking sexy pictures and...",
      badge: "Baddie",
      badgeColor: "#CDEDEA",
      badgeTextColor: "#50C2C9",
      followStatus: "following",
      imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: "4",
      username: "@Dhemmexroxy",
      description: "I Am A Lover Watching Animati...",
      badge: "Baddie",
      badgeColor: "#CDEDEA",
      badgeTextColor: "#50C2C9",
      followStatus: "requested",
      imageUrl: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: "5",
      username: "@EmilyBrown",
      description: "I love to party and club...",
      badge: "Vyber",
      badgeColor: "#DDE5F5",
      badgeTextColor: "#AFA4F8",
      followStatus: "follow",
      imageUrl: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      id: "6",
      username: "@ChrisRocks",
      description: "I enjoy watching comedy movies...",
      badge: "Baddie",
      badgeColor: "#CDEDEA",
      badgeTextColor: "#50C2C9",
      followStatus: "following",
      imageUrl: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
      id: "7",
      username: "@LindaGreen",
      description: "I'm into fitness and wellness...",
      badge: "Baddie",
      badgeColor: "#CDEDEA",
      badgeTextColor: "#50C2C9",
      followStatus: "follow",
      imageUrl: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      id: "8",
      username: "@MarkTwain",
      description: "Love to write and travel...",
      badge: "Baddie",
      badgeColor: "#CDEDEA",
      badgeTextColor: "#50C2C9",
      followStatus: "requested",
      imageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      id: "9",
      username: "@SophiaTurner",
      description: "Photographer and coffee lover...",
      badge: "Baddie",
      badgeColor: "#CDEDEA",
      badgeTextColor: "#50C2C9",
      followStatus: "follow",
      imageUrl: "https://randomuser.me/api/portraits/women/9.jpg",
    },
    {
      id: "10",
      username: "@JamesBond",
      description: "Secret agent on a mission...",
      badge: "Vyber",
      badgeColor: "#DDE5F5",
      badgeTextColor: "#AFA4F8",
      followStatus: "following",
      imageUrl: "https://randomuser.me/api/portraits/men/10.jpg",
    },
  ];

  const renderItem = ({ item }) => (
    <View className="flex-row items-center py-4 border-b border-gray-200"></View>
  );

  return <SafeAreaView className="px-4"></SafeAreaView>;
};

export default Add;
