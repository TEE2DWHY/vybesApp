import { Tabs } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";
import filter from "../../assets/images/filter.png";
import search from "../../assets/images/search.png";
import bell from "../../assets/images/bell.png";
import { StatusBar } from "expo-status-bar";
import UserDetails from "../../components/UserDetails";
import { users } from "../../data/users";

const Home = () => {
  const renderItem = ({ item }) => (
    <UserDetails
      img={item.img}
      username={item.username}
      firstName={item.firstName}
      age={item.age}
      state={item.state}
      country={item.country}
    />
  );

  return (
    <>
      <SafeAreaView className="h-full bg-gray-200">
        <View className="pt-6 px-5">
          <View className="sticky top-0 z-10 bg-gray-200 pb-4">
            <View className="flex-row items-center justify-between border-b-[#6888ce] border-b-[1px] pb-4">
              <Image
                source={filter}
                className="w-[25px] h-[25px] bg-purple-normal rounded-md"
                resizeMode="contain"
              />
              <View className="rounded-3xl flex-row items-center justify-between w-[68%] py-2 px-3 bg-white-normal">
                <Image
                  source={search}
                  className="w-[20px] h-[20px]"
                  resizeMode="contain"
                />
                <TextInput
                  placeholder="Find a Fellow Vyber..."
                  className="w-[80%] font-axiformaRegular"
                />
              </View>
              <Image
                source={bell}
                className="w-[25px] h-[25px]"
                resizeMode="contain"
              />
            </View>
          </View>
          <Text className="text-2xl text-purple-normal font-axiformaBlack pt-1 mb-3">
            Your Matches
          </Text>
        </View>
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showVerticalScrollIndicator={false}
          numColumns={2}
        />
        <StatusBar backgroundColor="#fff" style="dark" />
      </SafeAreaView>
    </>
  );
};

export default Home;
