import { router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";

const UserDetails = ({ img, username, firstName, age, state, country }) => {
  const badgeColor = username === "Vyber" ? "#7A91F9" : "#9941EE";

  return (
    <TouchableOpacity
      className="bg-white rounded-lg overflow-hidden mb-4"
      style={{ width: "47%" }}
      onPress={() => router.push("/home/userprofile")}
    >
      <Image
        source={img}
        className="min-h-[56px] w-full rounded-[25.41px]"
        resizeMode="cover"
      />
      <View className="p-2">
        <Text
          className="text-white-normal font-axiformaBlack text-left absolute top-[-55px] left-2 rounded-2xl py-3 px-4"
          style={{ backgroundColor: badgeColor }}
        >
          {username}
        </Text>
        <View className="pt-0">
          <Text className="font-axiformaBlack text-lg leading-[43.2px]">
            {firstName}, {age}
          </Text>
          <Text className="text-sm font-axiformaLight pb-2 pt-0">{`${state}, ${country}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserDetails;
