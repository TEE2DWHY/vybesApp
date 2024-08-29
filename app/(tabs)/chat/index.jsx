import React, { useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ChatModal from "../../../modal/ChatModal";
import { StatusBar } from "expo-status-bar";
import Empty from "./components/Empty";
import HeaderComponent from "./components/HeaderComponent";
import { recentConversations } from "../../../data/data";
import { router } from "expo-router";

const Chat = () => {
  const [showChatModal, setShowChatModal] = useState(false);

  const renderItem = ({ item }) => (
    <View className="flex-row items-center justify-between my-4">
      <TouchableOpacity
        className="flex-row items-center gap-4"
        onPress={() => router.push("/chat/conversation")}
      >
        <Image
          source={{ uri: item.image }}
          className="w-12 h-12 rounded-full"
        />
        <View>
          <View className="flex-row items-center gap-2">
            <Text className="text-[#495795] font-axiformaBlack text-base">
              {item.username}
            </Text>
            <View
              className={`${
                item.badge === "Vyber" ? "bg-[#7A91F9]" : "bg-[#AAD9C3]"
              } px-2 py-1 rounded-md`}
            >
              <Text
                className={`text-white font-axiformaRegular text-xs ${
                  item.badge === "Vyber" ? "text-[#224d7f]" : "text-[#6BADA9]"
                }`}
              >
                {item.badge}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-2">
            {item.tick === "single" ? (
              <MaterialCommunityIcons name="check" size={16} color="#F6C244" />
            ) : (
              <MaterialCommunityIcons
                name="check-all"
                size={16}
                color="#A7C5EB"
              />
            )}
            <Text className="text-[#909DAD] font-axiformaRegular text-sm">
              {item.status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View className="items-end">
        <Text className="text-[#546881] font-axiformaRegular text-sm">
          {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <>
      <SafeAreaView className="h-full">
        <FlatList
          data={recentConversations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <HeaderComponent
              showChatModal={() => setShowChatModal(!showChatModal)}
              data={recentConversations}
            />
          )}
          ListEmptyComponent={() => <Empty />}
          contentContainerStyle={{ paddingHorizontal: 15, marginTop: 15 }}
        />
      </SafeAreaView>
      {showChatModal && <ChatModal />}
      <StatusBar backgroundColor="#fffff" style="dark" />
    </>
  );
};

export default Chat;
