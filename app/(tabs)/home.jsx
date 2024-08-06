import { Tabs } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
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
  return (
    <>
      <SafeAreaView>
        <ScrollView className="h-full w-full pt-8 px-5 bg-gray-200">
          <View className="pt-6 h-full">
            <View className="flex-row items-center justify-between border-b-[#6888ce] border-b-[1px] pb-4">
              <Image
                source={filter}
                className="w-[25px] h-[25px] bg-purple-normal rounded-lg"
                resizeMode="contain"
              />
              <View className="rounded-3xl flex-row items-center justify-between w-[68%] py-2 px-3  bg-white-normal">
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
            <Text className="text-2xl text-purple-normal font-axiformaBlack pt-4 mb-3">
              Your Matches
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {users.map((user, index) => (
                <UserDetails
                  key={index}
                  img={user.img}
                  username={user.username}
                  firstName={user.firstName}
                  age={user.age}
                  state={user.state}
                  country={user.country}
                />
              ))}
            </View>
          </View>
        </ScrollView>
        <StatusBar backgroundColor="#fff" style="dark" />
      </SafeAreaView>
    </>
  );
};

export default Home;
