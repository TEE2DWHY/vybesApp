import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator, // Import ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useToken } from "../../../../hooks/useToken";
// import { Spinner } from "../../../../components/Spinner";

const Story = () => {
  const token = useToken();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams();
  //   const { storyId } = params;
  //   const [showViews, setShowViews] = useState(false);
  //   const [showLikes, setShowLikes] = useState(false);

  return (
    <SafeAreaView className="h-full bg-[#F8F9FB]">
      <Text>Bookmarks!!</Text>
      <StatusBar backgroundColor="#fff" style="dark" />
    </SafeAreaView>
  );
};

export default Story;
