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
    ></TouchableOpacity>
  );
};

export default UserDetails;
