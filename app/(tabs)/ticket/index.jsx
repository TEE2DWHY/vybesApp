import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { StatusBar } from "expo-status-bar";
import ticketHeaderImage from "../../../assets/images/ticker-header-image.png";
import ticketOne from "../../../assets/images/ticket-1.png";
import ticketTwo from "../../../assets/images/ticket-2.png";
import ticketThree from "../../../assets/images/ticket-3.png";
import ticketFour from "../../../assets/images/ticket-4.png";
import ticketFive from "../../../assets/images/ticket-5.png";
import ticketSix from "../../../assets/images/ticket-6.png";
import ticketSeven from "../../../assets/images/ticket-7.png";
import ticketEight from "../../../assets/images/ticket-8.png";
import ticketNine from "../../../assets/images/ticket-9.png";
import ticketTen from "../../../assets/images/ticket-10.png";
import ticketEleven from "../../../assets/images/ticket-11.png";
import ticketTwelve from "../../../assets/images/ticket-12.png";
import ticketThirteen from "../../../assets/images/ticket-13.png";
import ticketFourteen from "../../../assets/images/ticket-14.png";
import ticketFifteen from "../../../assets/images/ticket-15.png";
import ticketSixteen from "../../../assets/images/ticket-16.png";
import ticketSeventeen from "../../../assets/images/ticket-17.png";
import ticketEighteen from "../../../assets/images/ticket-18.png";
import { router } from "expo-router";

const Ticket = () => {
  const [activeTab, setActiveTab] = useState("All Events");

  const tabs = [
    "All Events",
    "Birthday Parties",
    "Get Together",
    "No Cup Parties",
    "In House Party",
  ];

  // Array of ticket images
  const ticketImages = [
    ticketOne,
    ticketTwo,
    ticketThree,
    ticketFour,
    ticketFive,
    ticketSix,
    ticketSeven,
    ticketEight,
    ticketNine,
    ticketTen,
    ticketEleven,
    ticketTwelve,
    ticketThirteen,
    ticketFourteen,
    ticketFifteen,
    ticketSixteen,
    ticketSeventeen,
    ticketEighteen,
  ];

  return (
    <>
      <SafeAreaView className="mt-12">
        <ScrollView>
          {/* Header */}
          <View className="flex-row items-center justify-between px-4">
            <View className="rounded-3xl border border-[#DFC4FA] px-6 py-2 flex-row items-center justify-between w-4/5 bg-white-normal">
              <View className="flex-row items-center gap-2">
                <EvilIcons name="location" size={22} color="#DFC4FA" />
                <TextInput
                  placeholder="Search By Location"
                  className="font-axiformaRegular text-sm w-4/5"
                />
              </View>
              <Feather name="search" size={22} color="#3D4C5E" />
            </View>
            <View>
              <TouchableOpacity className="bg-[#7A91F9] rounded-md p-1">
                <Feather
                  name="sliders"
                  size={22}
                  style={{
                    color: "#fff",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Welcome Container */}
          <View className="w-[90%] p-4 bg-purple-darker rounded-[20px] self-center my-8">
            <Text className="capitalize text-2xl text-white-normal font-axiformaBlackItalic leading-[38.4px]">
              welcome to the event section of vybes
            </Text>
            <Text className="capitalize text-white-normal font-axiformaRegular leading-[20px] my-2">
              we connect you to different event around your location
            </Text>
          </View>

          {/* Horizontal Scroll Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="bg-white-normal py-3"
          >
            <View className="flex-row items-center gap-4 px-6">
              {tabs.map((tab, index) => (
                <TouchableOpacity
                  key={index}
                  className={`${
                    activeTab === tab ? "bg-[#7A91F9]" : "bg-gray-200"
                  } border border-[#EBEFFE] p-4 rounded-md`}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text
                    className={`capitalize font-axiformaRegular text-[#3D4C5E] ${
                      activeTab === tab && "text-[#fff]"
                    }`}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Header Image */}
          <View className="w-[90%] h-[240px] rounded-2xl self-center my-4 relative">
            <Image
              source={ticketHeaderImage}
              resizeMode="contain"
              className="w-full"
            />
            <TouchableOpacity className="absolute p-4 rounded-md bg-purple-normal bottom-4 right-2 border border-white-normal z-50">
              <Text className="text-white-normal font-axiformaRegular">
                Buy Ticket
              </Text>
            </TouchableOpacity>
          </View>

          {/* Filter By Date */}
          <View className="self-end flex-row items-center px-4 gap-2 pr-4 mt-4">
            <Text className="font-axiformaRegular">Filter by Date Range</Text>
            <TouchableOpacity>
              <Feather name="sliders" size={22} color={"#7A91F9"} />
            </TouchableOpacity>
          </View>

          {/* Ticket Images */}
          <View className="flex-row items-center justify-between flex-wrap w-full px-4 my-4">
            {ticketImages.map((ticket, index) => (
              <TouchableOpacity
                key={index}
                className="w-[46%] h-[180px] mb-4"
                onPress={() => router.push(`/ticket/event/${index}`)}
              >
                <Image
                  source={ticket}
                  className="rounded-md h-full w-full"
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <StatusBar backgroundColor="#ffff" style="dark" />
      </SafeAreaView>
    </>
  );
};

export default Ticket;
