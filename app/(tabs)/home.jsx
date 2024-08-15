import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  FlatList,
  Text,
  TextInput,
  View,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
// import filter from "../../assets/images/filter.png";
import Feather from "@expo/vector-icons/Feather";
// import search from "../../assets/images/search.png";
// import bell from "../../assets/images/bell.png";
import { StatusBar } from "expo-status-bar";
import UserDetails from "../../components/UserDetails";
import { users } from "../../data/users";
import Empty from "../../components/Empty";
import FilterModal from "../../modal/FilterModal";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // recalls video if new videos appeared
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

  return (
    <>
      <SafeAreaView className="h-full bg-gray-200">
        <View className="pt-6 px-5">
          <View className="sticky top-0 z-10 bg-gray-200 pb-4">
            <View className="flex-row items-center justify-between border-b-[#6888ce] border-b-[1px] pb-4">
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
                    color: "gray",
                  }}
                />
                <TextInput
                  placeholder="Find a Fellow Vyber..."
                  className="w-[80%] font-axiformaRegular"
                />
              </View>

              <Feather
                name="bell"
                size={30}
                style={{
                  color: "gray",
                }}
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
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          ListEmptyComponent={<Empty text={"No users found in your area."} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
