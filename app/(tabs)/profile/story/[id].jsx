import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
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
  const [showViews, setShowViews] = useState(false);

  story.viewers = [
    {
      profilePicture:
        "https://images.unsplash.com/photo-1631947430066-48c30d57b943?q=80&w=2816&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      username: "Adetola_sayok",
    },
    {
      profilePicture:
        "https://images.unsplash.com/photo-1561158317-757a4631770e?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      username: "JohnDoe123",
    },
    // More viewers...
  ];

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
              <TouchableOpacity
                className="flex-row items-center space-x-2 border border-white-normal z-20 bg-transparent rounded-md p-2 shadow-sm"
                onPress={() => setShowViews(true)}
              >
                <Feather name="eye" size={18} color="#546881" />
                <Text className="text-white-normal font-axiformaRegular text-[14px]">
                  {story?.views} Views
                </Text>
              </TouchableOpacity>
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

      {showViews && (
        <>
          {/* Dark Overlay */}
          <TouchableOpacity
            className="absolute top-0 left-0 w-full h-full bg-[#1b1b1b60] opacity-50"
            onPress={() => setShowViews(false)}
          />

          {/* Modal Content */}
          <View className="bg-purple-darker w-full rounded-tl-[40px] rounded-tr-[40px] absolute bottom-0 h-[60%] px-4 z-10">
            {/* Profile Image */}
            <Image
              source={{ uri: story?.imageUrl }}
              className="w-[100px] h-[100px] rounded-lg self-center mt-10"
              resizeMode="cover"
            />

            {/* Views Section */}
            <View className="flex-row items-center justify-between mt-6 border-b border-white-normal pb-2">
              <Text className="font-axiformaRegular text-white-normal">
                View Account
              </Text>
              <TouchableOpacity className="bg-[#DBEBFF] flex-row items-center rounded-lg px-4 py-4">
                <Feather name="eye" size={22} color="#8BC0FE" />
                <Text className="font-axiformaRegular ml-4 text-[#314359]">
                  {story?.views} Views
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView className="mt-4">
              {story?.viewers?.map((viewer, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between pt-4 pb-2 border-b border-white-normal"
                >
                  <View className="flex-row items-center">
                    <Image
                      source={{ uri: viewer.profilePicture }}
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
      <StatusBar backgroundColor="#fff" style="dark" />
    </SafeAreaView>
  );
};

export default Story;
