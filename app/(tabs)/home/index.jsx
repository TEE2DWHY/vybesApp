import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  TextInput,
  View,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { StatusBar } from "expo-status-bar";
import UserDetails from "./components/UserDetails";
import { users } from "../../../data/data";
import Empty from "../../../components/Empty";
import FilterModal from "../../../modal/FilterModal";
import { getItem } from "../../../utils/AsyncStorage";
import axios from "axios";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
    console.log("app refreshing is successful.");
  };

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

  const filterUsers = async () => {
    const { accountType, gender, availability, distance } = filterCriteria;

    try {
      const response = await axios.post(
        "http://localhost:8000/user/filter-users",
        {
          accountType: accountType.length ? accountType : undefined,
          gender,
          availability,
          distance,
        }
      );

      console.log(response.data);
      // Handle the filtered users (e.g., update state or show in UI)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SafeAreaView className="h-full bg-gray-200 mt-8">
        <View className="pt-6 px-5">
          <View className="sticky top-0 z-10 bg-gray-200 pb-4">
            <View className="flex-row items-center justify-between border-b-[#a0ace2] border-b-[1px] pb-4">
              <TouchableOpacity
                onPress={() => setShowFilterModal(!showFilterModal)}
                className="bg-[#a241ee] rounded-md p-1"
              >
                <Feather
                  name="sliders"
                  size={24}
                  style={{
                    color: "#fff",
                  }}
                />
              </TouchableOpacity>
              <View className="rounded-3xl flex-row items-center justify-between w-[68%] py-2 px-3 bg-white-normal">
                <Feather
                  name="search"
                  size={24}
                  style={{
                    color: "#47586E",
                  }}
                />
                <TextInput
                  placeholder="Find a Fellow Vyber..."
                  className="w-[80%] font-axiformaRegular"
                />
              </View>

              <View className="relative">
                <View className="bg-purple-normal w-2 h-2 rounded-full absolute right-1 z-50"></View>
                <Feather
                  name="bell"
                  size={28}
                  style={{
                    color: "#99A0C5",
                  }}
                />
              </View>
            </View>
          </View>
          <Text className="text-[22px] text-purple-normal font-axiformaBlack pt-1 mb-3">
            Your Matches
          </Text>
        </View>
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          ListEmptyComponent={<Empty text={"No users found."} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          className="mb-12"
        />
        {showFilterModal && (
          <FilterModal onClose={() => setShowFilterModal(false)} />
        )}
        <StatusBar backgroundColor="#fff" style="dark" />
      </SafeAreaView>
    </>
  );
};

export default Home;
