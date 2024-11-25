import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { storiesData } from "../../../../data/data";

const Story = () => {
  const [story, setStory] = useState({});
  const params = useLocalSearchParams();
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    if (id !== undefined && storiesData[id]) {
      setStory(storiesData[id]);
    } else {
      setStoryImage({});
    }
  }, [id]);

  return (
    <SafeAreaView className="h-full bg-[#F8F9FB]">
      <ScrollView className="px-4 pt-2">
        {/* Back Button */}
        <AntDesign
          name="left"
          size={24}
          color="#3D4C5E"
          onPress={() => router.back()}
        />

        <View className="flex-row items-center justify-between mt-4 py-4">
          <Text className="font-axiformaBlack text-[20px] text-[#3D4C5E]">
            My Stories
          </Text>
          <Feather name="settings" size={24} color="#546881" />
        </View>

        {story ? (
          <View className="relative w-full h-[480px] mt-6 rounded-lg bg-white shadow-md">
            <View className="absolute top-4 flex-row items-center justify-between z-20 w-full px-4 bg-transparent">
              <View className="flex-row items-center space-x-2">
                <AntDesign name="heart" size={18} color="#FF9574" />
                <Text className="text-white-normal font-axiformaRegular text-[14px]">
                  {story?.likes} Likes
                </Text>
              </View>
              <View className="flex-row items-center space-x-2 border border-white-normal z-20 bg-transparent rounded-md p-2 shadow-sm">
                <Feather name="eye" size={18} color="#546881" />
                <Text className="text-white-normal font-axiformaRegular text-[14px]">
                  {story?.views} Views
                </Text>
              </View>
            </View>

            <TouchableOpacity
              className="absolute top-[50%] left-2 z-10 bg-white-normal rounded-full p-2 shadow-md border-purple-normal border-4"
              onPress={() => {
                story?.id === 0
                  ? setStory(storiesData[storiesData.length - 1])
                  : setStory(storiesData[story?.id - 1]);
              }}
            >
              <AntDesign name="left" size={18} color="#7B4CE5" />
            </TouchableOpacity>
            <TouchableOpacity
              className="absolute right-2 top-[50%] z-10 bg-white-normal rounded-full p-2 shadow-md border-purple-normal border-4"
              onPress={() => {
                story?.id === storiesData.length - 1
                  ? setStory(storiesData[0])
                  : setStory(storiesData[story?.id + 1]);
              }}
            >
              <AntDesign name="right" size={18} color="#7B4CE5" />
            </TouchableOpacity>

            <Image
              source={{ uri: story?.imageUrl }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />

            <View className="absolute bottom-4 left-4 bg-[#7a4ce59a] rounded-md px-4 py-4">
              <Text className="text-white-normal font-axiformaRegular text-[14px]">
                {`Posted ${story?.postedAt}`}
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

export default Story;
