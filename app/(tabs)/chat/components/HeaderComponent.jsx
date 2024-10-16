import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { useRouteInfo } from "expo-router/build/hooks";

const HeaderComponent = ({ showChatModal, data }) => {
  const [pathname, setPathname] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const routeInfo = useRouteInfo();

  useEffect(() => {
    if (routeInfo) {
      setPathname(routeInfo.pathname);
    }
  }, [routeInfo]);

  return (
    <>
      <View className="flex-row items-center justify-between border-b border-gray-200 pb-2">
        <View className="flex-row gap-6 items-center">
          <Link href="/chat">
            <AntDesign name="left" size={24} color="#546881" />
          </Link>
          {!onSearch && (
            <Text className="capitalize text-[#495795] font-axiformaBlack text-lg">
              {pathname === "/chat" ? "Chats" : "Add Users"}
            </Text>
          )}
        </View>

        <View className="flex-row items-center gap-6">
          {onSearch ? (
            <View className="w-5/6 flex-row items-center justify-between">
              <View className="border border-gray-200 rounded-md flex-row items-center justify-between py-2 px-4 w-[90%]">
                <TextInput
                  placeholder="Search Account"
                  className="font-axiformaBlack text-[#B2BBC6]"
                  value={searchText}
                  onChangeText={(text) => setSearchText(text)}
                />
                <EvilIcons name="search" size={30} color="#9941EE" />
              </View>
              <View className="w-[10%] ml-8">
                <MaterialIcons
                  name="cancel"
                  size={22}
                  color="#B2BBC6"
                  onPress={() => {
                    setOnSearch(false);
                    setSearchText("");
                  }}
                />
              </View>
            </View>
          ) : (
            <>
              {pathname === "/chat" && (
                <Link href="/chat/add">
                  <Ionicons name="person-add-sharp" size={24} color="#7A91F9" />
                </Link>
              )}
              <FontAwesome
                name="search"
                size={24}
                color="#7A91F9"
                onPress={() => setOnSearch(true)}
              />
              <View className="relative">
                <Entypo
                  name="dots-three-vertical"
                  size={24}
                  color="#7A91F9"
                  onPress={showChatModal}
                />
              </View>
            </>
          )}
        </View>
      </View>
      {data.length > 0 && (
        <Text className="mt-6 mb-2 font-axiformaRegular text-[#909DAD]  text-sm">
          {pathname === "/chat"
            ? "Recent Conversations"
            : pathname === "/chat/add"
            ? "Suggested Accounts"
            : ""}
        </Text>
      )}
    </>
  );
};

export default HeaderComponent;
