import { router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const UserDetails = ({
  img,
  accountType,
  firstName,
  age,
  state,
  country,
  userId,
}) => {
  const badgeColor = accountType === "vyber" ? "#7A91F9" : "#9941EE";

  return (
    <TouchableOpacity
      className="bg-white rounded-lg overflow-hidden mb-4"
      style={{ width: "47%" }}
      onPress={() => router.push(`/home/user/${userId}`)}
    >
      <Image
        source={{ uri: img }}
        className="h-[250px] w-full rounded-[25.41px]"
        resizeMode="cover"
      />
      <View className="p-2 ">
        <View
          className="absolute top-[-55px] left-2 py-3 px-4 rounded-2xl"
          style={{ backgroundColor: badgeColor }}
        >
          <Text className="text-white-normal font-axiformaMedium text-left capitalize">
            {accountType}{" "}
            {accountType === "baddie" ? (
              <FontAwesome5 name="fire" size={14} color="#FFD65A" />
            ) : (
              ""
            )}
          </Text>
        </View>
        <View className="pt-0">
          <Text className="font-axiformaMedium text-base leading-[43.2px] capitalize">
            {firstName}, {age}
          </Text>
          <Text className="text-sm font-axiformaRegular pb-2 pt-0 capitalize text-[#3D4C5E]">{`${state}, ${country}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserDetails;
