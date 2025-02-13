import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { useToken } from "../../../../hooks/useToken";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "moti/skeleton";

const MyStory = () => {
  const router = useRouter();
  const token = useToken();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams();
  const { storyId } = params;
  const [showViews, setShowViews] = useState(false);
  const [showLikes, setShowLikes] = useState(false);

  useEffect(() => {
    const getStory = async () => {
      try {
        const response = await axios.get(
          "https://vybesapi.onrender.com/v1/story/get-story",
          {
            params: {
              storyId: storyId,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStory(response.data.payload);
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

  const formatPostedTime = (createdAt) => {
    const parsedDate = new Date(createdAt);
    return isNaN(parsedDate)
      ? "Invalid date"
      : formatDistanceToNow(parsedDate, { addSuffix: true });
  };

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
          onPress={() => router.push("/profile")}
        />
        <View className="flex-row items-center justify-between mt-4 py-4">
          <Text className="font-axiformaBlack text-[20px] text-[#3D4C5E]">
            My Stories
          </Text>
          <Feather name="settings" size={24} color="#546881" />
        </View>

        {loading ? (
          <View className="relative w-full h-[480px] mt-6 rounded-lg bg-white shadow-sm">
            <Skeleton height={480} width="100%" radius={12} colorMode="light" />
          </View>
        ) : (
          <View className="relative w-full h-[480px] mt-6 rounded-lg bg-white shadow-sm">
            <View className="absolute top-4 flex-row items-center justify-between z-20 w-full px-4 bg-transparent">
              <TouchableOpacity
                className="flex-row items-center space-x-2"
                onPress={() => setShowLikes(true)}
              >
                <AntDesign name="heart" size={18} color="#FF9574" />
                <Text className="text-white-normal font-axiformaRegular text-[14px]">
                  {"  "} {story?.likes.length > 0 ? story?.likes.length : 0}{" "}
                  Likes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center space-x-2 border border-white-normal z-20 bg-transparent rounded-md p-2 shadow-sm"
                onPress={() => setShowViews(true)}
              >
                <Feather name="eye" size={18} color="#546881" />
                <Text className="text-white-normal font-axiformaRegular text-[14px]">
                  {"  "}
                  {story?.views.length > 0 ? story?.views.length : 0} Views
                </Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: story?.media }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />

            <View className="absolute bottom-4 left-4 bg-[#7a4ce59a] rounded-md px-4 py-4">
              <Text className="text-white-normal font-axiformaRegular text-[14px]">
                Posted {formatPostedTime(story?.createdAt)}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {showViews && (
        <>
          <TouchableOpacity
            className="absolute top-0 left-0 w-full h-full bg-[#1b1b1b60] opacity-50"
            onPress={() => setShowViews(false)}
          />

          <View className="bg-purple-darker w-full rounded-tl-[40px] rounded-tr-[40px] absolute bottom-0 h-[60%] px-4 z-10">
            <Image
              source={{ uri: story?.media }}
              className="w-[100px] h-[100px] rounded-lg self-center mt-10"
              resizeMode="cover"
            />

            <View className="flex-row items-center justify-between mt-6 border-b border-white-normal pb-2">
              <Text className="font-axiformaRegular text-white-normal">
                Account Views
              </Text>
              <TouchableOpacity className="bg-[#DBEBFF] flex-row items-center rounded-lg px-4 py-4">
                <Feather name="eye" size={22} color="#fff" />
                <Text className="font-axiformaRegular ml-4 text-[#314359]">
                  {story?.views.length > 0 ? story.views.length : 0} Views
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView className="mt-4">
              {story?.viewers.map((viewer, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between pt-4 pb-2 border-b border-white-normal"
                >
                  <View className="flex-row items-center">
                    <Image
                      source={{ uri: viewer?.profilePicture }}
                      className="w-[40px] h-[40px] rounded-full"
                    />
                    <Text className="font-axiformaRegular text-white-normal ml-4">
                      @{viewer.username}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              className="bg-white-normal rounded-lg py-4 mt-4 mb-4"
              onPress={() => setShowViews(false)}
            >
              <Text className="font-axiformaRegular text-purple-darker text-center">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {showLikes && (
        <>
          <TouchableOpacity
            className="absolute top-0 left-0 w-full h-full bg-[#1b1b1b60] opacity-50"
            onPress={() => setShowLikes(false)}
          />

          <View className="bg-purple-darker w-full rounded-tl-[40px] rounded-tr-[40px] absolute bottom-0 h-[60%] px-4 z-10">
            <Image
              source={{ uri: story?.imageUrl }}
              className="w-[100px] h-[100px] rounded-lg self-center mt-10"
              resizeMode="cover"
            />

            <View className="flex-row items-center justify-between mt-6 border-b border-white-normal pb-2">
              <Text className="font-axiformaRegular text-white-normal">
                Account Likes
              </Text>
              <TouchableOpacity className="bg-[#FFDED4] flex-row items-center rounded-lg px-4 py-4">
                <Feather name="heart" size={18} color="red" />
                <Text className="font-axiformaRegular ml-4 text-[#314359]">
                  {story?.likes.length > 0 ? story?.likes.length : 0} Likes
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView className="mt-4">
              {story?.viewers.map((viewer, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between pt-4 pb-2 border-b border-white-normal"
                >
                  <View className="flex-row items-center">
                    <Image
                      source={{ uri: viewer?.profilePicture }}
                      className="w-[40px] h-[40px] rounded-full"
                    />
                    <Text className="font-axiformaRegular text-white-normal ml- 4">
                      @{viewer?.username}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              className="bg-white-normal rounded-lg py-4 mt-4 mb-4"
              onPress={() => setShowLikes(false)}
            >
              <Text className="font-axiformaRegular text-purple-darker text-center">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <StatusBar backgroundColor="#fff" style="dark" />
    </SafeAreaView>
  );
};

export default MyStory;
