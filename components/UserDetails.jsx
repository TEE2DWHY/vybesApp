import React from "react";
import { Image, Text, View } from "react-native";

const UserDetails = ({ img, username, firstName, age, state, country }) => {
  // Define colors based on username
  const badgeColor = username === "Vyber" ? "#7A91F9" : "#9941EE";

  return (
    <View
      className="bg-white rounded-lg overflow-hidden mb-4"
      style={{ width: "48%" }}
    >
      <Image
        source={img}
        className="h-56 w-full rounded-2xl"
        resizeMode="cover"
      />
      <View className="p-2">
        <Text
          className="text-white-normal font-axiformaBlack text-left absolute top-[-55px] left-2 rounded-2xl py-3 px-4"
          style={{ backgroundColor: badgeColor }}
        >
          {username}
        </Text>
        <View className="pt-1">
          <Text className="font-axiformaBlack text-lg">
            {firstName}, {age}
          </Text>
          <Text className="text-sm font-axiformaLight pb-2">{`${state}, ${country}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default UserDetails;
