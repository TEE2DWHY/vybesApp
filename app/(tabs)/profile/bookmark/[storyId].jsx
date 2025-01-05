import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform, // Import ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { useToken } from "../../../../hooks/useToken";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { Spinner } from "../../../../components/Spinner";

const Bookmark = () => {
  const token = useToken();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmark, setBookmark] = useState("");
  const params = useLocalSearchParams();
  const { storyId } = params;
  console.log(storyId);

  useEffect(() => {
    const getStory = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://vybesapi.onrender.com/v1/bookmark`,
          {
            params: {
              storyId: storyId,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookmark(response.data.payload);
      } catch (error) {
        console.error("Error fetching story:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      getStory();
    }
  }, [storyId, token]);

  return (
    <SafeAreaView
      className={`h-full bg-[#F8F9FB] ${
        Platform.OS === "ios" ? "pt-2" : "pt-10"
      }`}
    >
      <ScrollView className="px-4 pt-2">
        <AntDesign
          name="left"
          size={22}
          color="#3D4C5E"
          onPress={() => router.back()}
        />
        <View className="flex-row items-center justify-between mt-4 py-4">
          <Text className="font-axiformaBlack text-[20px] text-[#3D4C5E]"></Text>
          <Feather name="settings" size={24} color="#546881" />
        </View>

        {/* Show Loading Spinner */}
        {loading ? (
          <View className="flex-1 justify-center items-center h-[50vh]">
            <Spinner />
            <Text className="text-[#3D4C5E] mt-4 font-axiformaRegular">
              Loading bookmark...
            </Text>
          </View>
        ) : story ? (
          <View className="relative w-full h-[480px] mt-6 rounded-lg bg-white shadow-md">
            <View className="absolute top-4 flex-row items-center justify-between z-20 w-full px-4 bg-transparent">
              <TouchableOpacity className="flex-row items-center space-x-2">
                <AntDesign name="heart" size={18} color="#FF9574" />
                <Text className="text-white-normal font-axiformaRegular text-[14px]">
                  {story.likes?.length > 0 ? story.likes.length : 0} Likes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center space-x-2 border border-white-normal z-20 bg-transparent rounded-md p-2 shadow-sm">
                <Feather name="eye" size={18} color="#546881" />
                <Text className="text-white-normal font-axiformaRegular text-[14px]">
                  {story.views?.length > 0 ? story.views.length : 0} Views
                </Text>
              </TouchableOpacity>
            </View>

            <Image
              source={{ uri: story.media }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />

            <View className="absolute bottom-4 left-4 bg-[#7a4ce59a] rounded-md px-4 py-4">
              <Text className="text-white-normal font-axiformaRegular text-[14px]">
                Posted {formatPostedTime(story.createdAt)}
              </Text>
            </View>
          </View>
        ) : (
          <Text className="text-center text-[#3D4C5E] mt-12">
            No story available
          </Text>
        )}
      </ScrollView>

      <StatusBar backgroundColor="#fff" style="dark" />
    </SafeAreaView>
  );
};

export default Bookmark;
