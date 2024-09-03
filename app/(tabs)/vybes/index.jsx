import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";

const App = () => {
  const storiesData = [
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

  return (
    <SafeAreaView className="bg-white-normal h-full">
      <ScrollView>
        <View className="flex-row justify-center mt-4">
          <TouchableOpacity className="px-4 py-2 rounded-full bg-gray-200">
            <Text className="text-gray-900 font-semibold font-axiformaBlack">
              Vybers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-4 py-2 rounded-full bg-gradient-to-r from-[#9941EE] to-[#AA77FF] ml-4">
            <Text className="text-white font-axiformaBlack">Baddie</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-purple-normal mt-8 px-1">
          <Text className="text-white-normal text-lg font-bold mt-2 ml-4 font-axiformaBlack">
            Baddie Story
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-4 ml-4"
          >
            <TouchableOpacity className="rounded-full overflow-hidden w-14 h-14 border-2 border-dashed border-white-normal flex justify-center items-center bg-transparent mr-4">
              <Text className="text-white-normal text-center font-axiformaRegular text-sm">
                Add Story
              </Text>
            </TouchableOpacity>
            {storiesData.map((story) => (
              <View key={story.id} className="mr-4 mb-2">
                <TouchableOpacity className="rounded-full overflow-hidden w-14 h-14 border-2 border-white-normal">
                  <Image
                    source={{ uri: story.imageUrl }}
                    className="w-full h-full"
                  />
                </TouchableOpacity>
                <Text className="text-white-normal text-center mt-2 font-axiformaRegular text-xs">
                  {story.name}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View className="bg-gray-800 overflow-hidden">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1506126483163-f4d1558dbf85?q=80&w=2630&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            className="w-full h-[400px] object-cover"
          />
          <View>
            <View className="p-4">
              <Text className="text-white-normal text-2xl font-axiformaBlack">
                Dhemmex, 25
              </Text>
              <Text className="text-gray-300 mt-1 font-axiformaRegular">
                Loves having fun and meeting new friends
              </Text>
              <View className="flex-row justify-between mt-4">
                <View className="bg-gradient-to-r from-[#9941EE] to-[#AA77FF] px-3 py-1 rounded-full">
                  <Text className="text-white">Baddie</Text>
                </View>
                <View className="bg-gray-700 px-3 py-1 rounded-full">
                  <Text className="text-gray-300">2 Miles Away</Text>
                </View>
                <View className="bg-gray-700 px-3 py-1 rounded-full">
                  <Text className="text-white">Available To Chat</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
