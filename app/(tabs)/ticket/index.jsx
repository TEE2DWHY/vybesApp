import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  Alert,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import axios from "axios";
import { Skeleton } from "moti/skeleton";

const Ticket = () => {
  const [activeTab, setActiveTab] = useState("All Events");
  const [events, setEvents] = useState([]);
  const [firstEvent, setFirstEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [noEventsMessage, setNoEventsMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    "All Events",
    "Birthday Parties",
    "Get Together",
    "No Cup Parties",
    "In House Party",
  ];

  const fetchEvents = async (eventType = "", location = "") => {
    setLoading(true);
    setNoEventsMessage("");
    try {
      let url = "https://vybesapi.onrender.com/v1/event/all-events";

      if (eventType) {
        url = `https://vybesapi.onrender.com/v1/event/get-event-by-event-type?eventType=${eventType}`;
      } else if (location) {
        url = `https://vybesapi.onrender.com/v1/event/search-by-location?location=${location}`;
      }

      const response = await axios.get(url);
      const eventData = Array.isArray(response.data.payload)
        ? response.data.payload
        : [];

      setEvents(eventData);

      if (eventData.length > 0) {
        const randomIndex = Math.floor(Math.random() * eventData.length);
        setFirstEvent(eventData[randomIndex]);
      } else {
        setNoEventsMessage(`${eventType} Events Not Found.`);
      }
    } catch (error) {
      if (
        error.response?.data.message === "No events found in this location."
      ) {
        return Alert.alert("Error", error.response?.data.message);
      }
      console.error(error.response?.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setNoEventsMessage("");
    if (tab === "All Events") {
      fetchEvents();
    } else {
      fetchEvents(tab);
    }
  };

  const handleFilter = (range) => {
    console.log("Filtering events by:", range);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchEvents("", searchQuery);
    } else {
      fetchEvents();
    }
  };

  return (
    <SafeAreaView className="pt-12">
      <ScrollView>
        <View className="flex-row items-center justify-between px-4">
          <View
            className={`rounded-3xl border border-[#DFC4FA] px-8 ${
              Platform.OS === "ios" ? "py-3" : "py-1"
            } flex-row items-center justify-between w-4/5 bg-white-normal`}
          >
            <View className="flex-row items-center gap-2">
              <EvilIcons name="location" size={22} color="#DFC4FA" />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search By Location"
                className="font-axiformaRegular text-sm w-4/5"
              />
            </View>
            <TouchableOpacity onPress={handleSearch}>
              <Feather name="search" size={20} color="#3D4C5E" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="bg-[#7A91F9] rounded-md p-1">
            <Feather name="sliders" size={20} style={{ color: "#fff" }} />
          </TouchableOpacity>
        </View>

        <View className="w-[90%] p-4 bg-purple-darker rounded-[20px] self-center my-8">
          <Text className="capitalize text-2xl text-white-normal font-axiformaBlackItalic leading-[38.4px]">
            welcome to the event section of vybes
          </Text>
          <Text className="capitalize text-white-normal font-axiformaRegular leading-[20px] my-2">
            we connect you to different events around your location
          </Text>
        </View>

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
                onPress={() => handleTabClick(tab)} // Call handleTabClick on tab click
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

        {loading ? (
          <View className="self-center my-4 ml-4">
            <Skeleton
              height={140}
              width="95%"
              radius={12}
              className="self-center my-4"
              colorMode="light"
            />
          </View>
        ) : (
          <>
            {noEventsMessage ? (
              <View className="self-center my-4 px-4">
                <Text className="text-base font-axiformaMedium text-center  mt-8 text-red-500">
                  {noEventsMessage}
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                className="w-[90%] h-[240px] rounded-2xl self-center my-4 relative"
                onPress={() => {
                  if (firstEvent) {
                    router.push(`/ticket/event/${firstEvent._id}`);
                  }
                }}
              >
                {firstEvent && (
                  <Image
                    source={{ uri: firstEvent.image }}
                    resizeMode="cover"
                    className="w-full h-full rounded-2xl"
                  />
                )}
                <TouchableOpacity
                  className="absolute p-4 rounded-md bg-purple-normal bottom-4 right-2 border border-white-normal z-50"
                  onPress={() => {
                    if (firstEvent) {
                      router.push(`/ticket/event/${firstEvent._id}`);
                    }
                  }}
                >
                  <Text className="text-white-normal font-axiformaRegular">
                    Buy Ticket
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          </>
        )}

        {!noEventsMessage && (
          <View className="self-end flex-row items-center px-4 gap-2 pr-4 mt-4">
            <Text className="font-axiformaRegular text-sm">
              Filter by Date Range
            </Text>
            <TouchableOpacity onPress={() => setShowFilter(!showFilter)}>
              <Feather name="sliders" size={18} color={"#7A91F9"} />
            </TouchableOpacity>
          </View>
        )}

        {showFilter && (
          <View className="relative z-50  mr-2 mt-1">
            <View className="bg-white-normal w-[140px] gap-3 items-center justify-center self-end absolute rounded-md p-4 shadow">
              <TouchableOpacity
                onPress={() => handleFilter("Today")}
                className="border-b border-1 border-b-gray-400 w-full"
              >
                <Text className="font-axiformaRegular pb-1 text-sm">Today</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleFilter("This Week")}
                className="border-b border-1 border-b-gray-400  w-full"
              >
                <Text className="font-axiformaRegular pb-1 text-sm">
                  This Week
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleFilter("This Month")}
                className="border-b border-1 border-b-gray-400  w-full"
              >
                <Text className="font-axiformaRegular pb-1 text-sm">
                  This Month
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleFilter("Last Month")}
                className="border-b border-1 border-b-gray-400  w-full"
              >
                <Text className="font-axiformaRegular pb-1 text-sm">
                  Last Month
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleFilter("Last 7 Days")}
                className="border-b border-1 border-b-gray-400  w-full"
              >
                <Text className="font-axiformaRegular pb-1 text-sm">
                  Last 7 Days
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleFilter("This Year")}
                className="border-b border-1 border-b-gray-400  w-full"
              >
                <Text className="font-axiformaRegular pb-1 text-sm">
                  This Year
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleFilter("Custom Range")}
                className="border-b border-1 border-b-gray-400  w-full"
              >
                <Text className="font-axiformaRegular pb-1 text-sm">
                  Custom Range
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View className="flex-row items-center justify-between flex-wrap w-full px-4 my-4">
          {loading ? (
            <View className="flex-row flex-wrap justify-between mt-6 rounded-lg p-3 mb-10">
              {[...Array(4)].map((_, index) => (
                <View key={index} className="w-[47%] mb-4">
                  <Skeleton
                    height={240}
                    width="100%"
                    radius={8}
                    className="mb-2"
                    colorMode="light"
                  />
                </View>
              ))}
            </View>
          ) : (
            events.map((event) => (
              <TouchableOpacity
                key={event._id}
                className="w-[46%] h-[180px] mb-4"
                onPress={() => router.push(`/ticket/event/${event._id}`)}
              >
                <Image
                  source={{ uri: event.image }}
                  className="rounded-md h-full w-full"
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#fff" style="dark" />
    </SafeAreaView>
  );
};

export default Ticket;
