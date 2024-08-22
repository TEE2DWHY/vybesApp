import React, { useState } from "react";
import { SafeAreaView, FlatList, Text, View, Image } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ChatModal from "../../../modal/ChatModal";
import { StatusBar } from "expo-status-bar";
import Empty from "./components/Empty";
import HeaderComponent from "./components/HeaderComponent";

const dummyData = [
  // {
  //   id: "1",
  //   username: "@AlexRoxy",
  //   status: "I would like to know you more",
  //   time: "12:24pm",
  //   badge: "Vyber",
  //   image: "https://randomuser.me/api/portraits/men/1.jpg",
  //   tick: "single",
  // },
  // {
  //   id: "2",
  //   username: "@BellaSun",
  //   status: "I would like to know you more",
  //   time: "12:24pm",
  //   badge: "Baddie",
  //   image: "https://randomuser.me/api/portraits/women/2.jpg",
  //   tick: "double",
  // },
  // {
  //   id: "3",
  //   username: "@ChrisStar",
  //   status: "I would like to know you more",
  //   time: "12:24pm",
  //   badge: "Baddie",
  //   image: "https://randomuser.me/api/portraits/women/3.jpg",
  //   tick: "single",
  // },
  // {
  //   id: "4",
  //   username: "@DianaLane",
  //   status: "I would like to know you more",
  //   time: "12:24pm",
  //   badge: "Vyber",
  //   image: "https://randomuser.me/api/portraits/men/4.jpg",
  //   tick: "double",
  // },
  // {
  //   id: "5",
  //   username: "@EveRose",
  //   status: "I would like to know you more",
  //   time: "12:24pm",
  //   badge: "Baddie",
  //   image: "https://randomuser.me/api/portraits/women/5.jpg",
  //   tick: "single",
  // },
  // {
  //   id: "6",
  //   username: "@FrankWolf",
  //   status: "I would like to know you more",
  //   time: "12:24pm",
  //   badge: "Vyber",
  //   image: "https://randomuser.me/api/portraits/men/6.jpg",
  //   tick: "double",
  // },
  // {
  //   id: "7",
  //   username: "@GraceWillow",
  //   status: "I would like to know you more",
  //   time: "12:24pm",
  //   badge: "Baddie",
  //   image: "https://randomuser.me/api/portraits/women/7.jpg",
  //   tick: "single",
  // },
  // {
  //   id: "8",
  //   username: "@HarryStone",
  //   status: "I would like to know you more",
  //   time: "12:24pm",
  //   badge: "Vyber",
  //   image: "https://randomuser.me/api/portraits/men/8.jpg",
  //   tick: "double",
  // },
  // {
  //   id: "9",
  //   username: "@IvyBrook",
  //   status: "I would like to know you more",
  //   time: "12:24pm",
  //   badge: "Baddie",
  //   image: "https://randomuser.me/api/portraits/women/9.jpg",
  //   tick: "single",
  // },
  // {
  //   id: "10",
  //   username: "@JackWest",
  //   status: "I would like to know you more",
  //   time: "12:24pm",
  //   badge: "Vyber",
  //   image: "https://randomuser.me/api/portraits/men/10.jpg",
  //   tick: "double",
  // },
];

const Chat = () => {
  const [showChatModal, setShowChatModal] = useState(false);

  const renderItem = ({ item }) => (
    <>
      <Text className="mt-10 font-axiformaRegular text-[#909DAD] font-extrabold text-base">
        Recent Conversations
      </Text>
      <View className="flex-row items-center justify-between my-4">
        <View className="flex-row items-center gap-4">
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
                <MaterialCommunityIcons
                  name="check"
                  size={16}
                  color="#F6C244"
                />
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
        </View>
        <View className="items-end">
          <Text className="text-[#546881] font-axiformaRegular text-sm">
            {item.time}
          </Text>
        </View>
      </View>
    </>
  );

  return (
    <>
      <SafeAreaView className="h-full">
        <FlatList
          data={dummyData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <>
              <HeaderComponent
                showChatModal={() => setShowChatModal(!showChatModal)}
              />
            </>
          )}
          ListEmptyComponent={() => (
            <>
              <Empty />
            </>
          )}
          contentContainerStyle={{ paddingHorizontal: 15, marginTop: 15 }}
        />
      </SafeAreaView>
      {showChatModal && <ChatModal />}
      <StatusBar backgroundColor="#fffff" style="dark" />
    </>
  );
};

export default Chat;
