import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import { Link } from "expo-router";
import { useRouteInfo } from "expo-router/build/hooks";

const HeaderComponent = ({ showChatModal, data }) => {
  const [pathname, setPathname] = useState("");
  const routeInfo = useRouteInfo();

  useEffect(() => {
    setPathname(routeInfo.pathname);
  }, []);

  return (
    <>
      <View className="flex-row items-center justify-between border-b border-gray-200 pb-2">
        <View className="flex-row gap-6 items-center">
          <Link href={"/chat"}>
            <AntDesign name="left" size={24} color="#546881" />
          </Link>
          <Text className="capitalize text-[#495795] font-axiformaBlack text-lg">
            {pathname === "/chat" ? "Chats" : "Add Users"}
          </Text>
        </View>

        <View className="flex-row items-center gap-6">
          <Link href={"/chat/add"}>
            {pathname === "/chat" && (
              <Ionicons name="person-add-sharp" size={24} color={"#7A91F9"} />
            )}
          </Link>
          <FontAwesome name="search" size={24} color="#7A91F9" />
          <View className="relative">
            <Entypo
              name="dots-three-vertical"
              size={24}
              color="#7A91F9"
              onPress={showChatModal}
            />
          </View>
        </View>
      </View>
      {data.length > 0 && (
        <Text className="mt-6 mb-2 font-axiformaRegular text-[#909DAD] font-extrabold text-sm">
          {pathname === "/chat"
            ? " Recent Conversations"
            : pathname === "/chat/add"
            ? "Suggested Account"
            : ""}
        </Text>
      )}
    </>
  );
};

export default HeaderComponent;
