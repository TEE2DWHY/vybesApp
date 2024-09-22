import { Text, TouchableOpacity, View, Image } from "react-native";
import { likesData } from "../../../../data/data";
import { useState } from "react";

const Likes = () => {
  return (
    <>
      <View className="items-center justify-center mt-10">
        <Text className="capitalize font-axiformaBlack text-xl mb-4 bg-white-normal p-1 text-[#1D242D]">
          @WhistleDown
        </Text>
        <Image
          source={{
            uri: "https://plus.unsplash.com/premium_photo-1673792686302-7555a74de717?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 80,
            borderWidth: 1,
            borderColor: "#7A91F9",
          }}
        />
      </View>
      <View className="mt-8 flex-row justify-between items-center">
        <Text className="font-axiformaBlack text-[#3D4C5E] text-lg">
          My Likes
        </Text>
        <Text className="text-[#3D4C5E] font-axiformaRegular">15 Likes</Text>
      </View>
      <View className="flex-row flex-wrap justify-between mt-6 border border-[#E9E9EB] rounded-lg p-3">
        {likesData.map((likes, index) => (
          <TouchableOpacity
            key={likes.id}
            // onPress={() => handleStoryPress(likes)}
            className="w-[49%] mb-4"
          >
            <Image
              source={{ uri: likes.imageUrl }}
              className="w-full h-[240px] rounded-md"
              resizeMode="cover"
            />
            <View className="bg-[#9a41eea6] py-3 px-2 rounded-xl absolute bottom-3 text-left mx-1">
              <Text className="text-white-normal font-axiformaBlack text-center text-[11px]">
                Posted {likes.user}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default Likes;
