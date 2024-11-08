import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  TextInput,
  View,
  RefreshControl,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { StatusBar } from "expo-status-bar";
import UserDetails from "./components/UserDetails";
import Empty from "../../../components/Empty";
import FilterModal from "../../../modal/FilterModal";
import useFetch from "../../../hooks/useFetch";
import { userInstance } from "../../../config/axios";
import { useToken } from "../../../hooks/useToken";
import SearchModal from "../../../modal/SearchModal";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [search, setSearch] = useState("");
  const token = useToken();

  const {
    payload: allUsers,
    message,
    error: fetchUsersError,
    isLoading: isUsersLoading,
    fetchData: getAllUsers,
  } = useFetch({
    fn: userInstance,
    endpoint: "/get-users",
    token: token,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      await getAllUsers();
    };
    fetchUsers();
  }, [getAllUsers]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getAllUsers();
    setRefreshing(false);
    console.log("app refreshing is successful.");
  };

  const renderItem = ({ item }) => (
    <UserDetails
      img={item.image}
      accountType={item.accountType}
      firstName={item?.fullName.split(" ")[0]}
      age={2024 - Number(item.dateOfBirth?.split("-")[0])}
      state={item.location}
      country={"Nigeria"}
      userId={item._id}
    />
  );

  const Spinner = () => {
    const spinValue = new Animated.Value(0);

    useEffect(() => {
      const startSpin = () => {
        spinValue.setValue(0);
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => startSpin());
      };
      startSpin();
    }, [spinValue]);

    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    return (
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <View className="w-[40px] h-[40px] rounded-full border-[4px] border-transparent border-t-[#a241ee]" />
      </Animated.View>
    );
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
                  onPress={() => {
                    setShowSearchModal(true);
                  }}
                />
                <TextInput
                  placeholder="Find a Fellow Vyber..."
                  className="w-[80%] font-axiformaRegular"
                  onChangeText={setSearch}
                  value={search}
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

        {isUsersLoading ? (
          <View className="flex-1 justify-center items-center">
            <Spinner />
          </View>
        ) : (
          <FlatList
            data={allUsers?.users}
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
        )}

        {showFilterModal && (
          <FilterModal onClose={() => setShowFilterModal(false)} />
        )}
        {showSearchModal && (
          <SearchModal closeModal={() => setShowSearchModal(false)} />
        )}
        <StatusBar backgroundColor="#fff" style="dark" />
      </SafeAreaView>
    </>
  );
};

export default Home;
