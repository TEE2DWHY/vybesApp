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
const Home = () => {
  return (
    <>
      <SafeAreaView className="h-full">
        <ScrollView
          containerStyles={{ height: "100%" }}
          className="h-full w-full pt-8 px-5 bg-gray-200"
        >
          <View>
            <View className="flex-row items-center justify-between border-b-[#9da7d8] border-b-2 pb-4">
              <Image
                source={filter}
                className="w-[30px] h-[30px] bg-purple-dark rounded-lg"
                resizeMode="contain"
              />
              <View className="rounded-3xl flex-row items-center justify-between w-[65%] py-2 px-3  bg-white-normal">
                <Image
                  source={search}
                  className="w-[30px] h-[20px]"
                  resizeMode="contain"
                />
                <TextInput
                  placeholder="Find a Fellow Vyber..."
                  className="w-[80%] font-axiformaRegular"
                />
              </View>
              <Image
                source={bell}
                className="w-[30px] h-[30px]"
                resizeMode="contain"
              />
            </View>
          </View>
        </ScrollView>
        <StatusBar backgroundColor="#fffff" style="dark" />
      </SafeAreaView>
    </>
  );
};

export default Home;
