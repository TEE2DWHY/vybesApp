import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Feather from "@expo/vector-icons/Feather";

const FilterModal = ({ onClose }) => {
  const [filters, setFilters] = useState({
    femaleVybers: true,
    maleVybers: true,
    femaleBaddie: false,
    maleContentCreators: false,
  });

  const [selectedTab, setSelectedTab] = useState("Account");

  const toggleFilter = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const renderCheckbox = (title, filterName) => (
    <TouchableOpacity
      onPress={() => toggleFilter(filterName)}
      className="flex-row items-center py-2 px-1"
    >
      <View
        className={`w-5 h-5 border border-white-normal rounded-md flex justify-center items-center ${
          filters[filterName] ? "bg-white" : "bg-transparent"
        }`}
      >
        {filters[filterName] && (
          <Feather name="check" size={14} color="#a241ee" />
        )}
      </View>
      <Text className="text-white-normal ml-2 font-axiformaRegular">
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="absolute bottom-0 left-0 right-0 z-10 bg-purple-darker rounded-t-[40px] h-fit py-10">
      <View className="flex-row items-center justify-between px-5">
        <Text className="font-axiformaBlack text-white-normal">
          Filter Profiles
        </Text>
        <TouchableOpacity onPress={onClose}>
          <Feather name="sliders" size={24} style={{ color: "#fff" }} />
        </TouchableOpacity>
      </View>
      <ScrollView className="px-5 mt-4">
        <View className="flex-row justify-around mb-4">
          <TouchableOpacity
            className={`flex-1 items-center justify-center px-2 rounded-md mx-1 ${
              selectedTab === "Account"
                ? "bg-purple-normal"
                : "border-[#B2BBC6] border-[1px]"
            }`}
            onPress={() => setSelectedTab("Account")}
          >
            <Text className="text-white-normal font-axiformaRegular text-xs">
              Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 items-center justify-center py-2 rounded-md mx-1 ${
              selectedTab === "Sex"
                ? "bg-purple-normal"
                : "border-[#B2BBC6] border-[1px]"
            }`}
            onPress={() => setSelectedTab("Sex")}
          >
            <Text className="text-white-normal font-axiformaRegular text-xs">
              Sex
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-2 items-center justify-center py-2 rounded-md mx-1 ${
              selectedTab === "Availability"
                ? "bg-purple-800"
                : "border-[#B2BBC6] border-[1px]"
            }`}
            onPress={() => setSelectedTab("Availability")}
          >
            <Text className="text-white-normal font-axiformaRegular text-xs px-2">
              Availability
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 items-center py-2 rounded-md mx-1 ${
              selectedTab === "Distance"
                ? "bg-purple-800"
                : "border-[#B2BBC6] border-[1px]"
            }`}
            onPress={() => setSelectedTab("Distance")}
          >
            <Text className="text-white-normal font-axiformaRegular text-xs">
              Distance
            </Text>
          </TouchableOpacity>
        </View>

        {selectedTab === "Account" && (
          <>
            <Text className="text-gray-300 mb-2 font-axiformaRegular w-4/5 leading-5 pb-2">
              Select the type of account you want to see match from
            </Text>
            {renderCheckbox("Female Vybers", "femaleVybers")}
            {renderCheckbox("Male Vybers", "maleVybers")}
            {renderCheckbox("Female Baddie", "femaleBaddie")}
            {renderCheckbox("Male Content Creators", "maleContentCreators")}
          </>
        )}

        {selectedTab === "Sex" && (
          <>
            <Text className="text-gray-300 mb-2 font-axiformaRegular leading-5 pb-2">
              Select your preferred gender you would like to see
            </Text>
            {renderCheckbox("Male", "maleVybers")}
            {renderCheckbox("Female", "femaleVybers")}
          </>
        )}

        {selectedTab === "Availability" && (
          <>
            <Text className="text-gray-300 mb-2 font-axiformaRegular w-4/5 leading-5 pb-2">
              Select matches based on their availability
            </Text>
            <TouchableOpacity className="flex-row items-center justify-between py-4">
              <Text className="text-white-normal font-axiformaRegular">
                30 Minutes
              </Text>
              <Feather name="clock" size={24} style={{ color: "#fff" }} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-4">
              <Text className="text-white-normal font-axiformaRegular">
                1 Hour
              </Text>
              <Feather name="clock" size={24} style={{ color: "#fff" }} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-4">
              <Text className="text-white-normal font-axiformaRegular">
                3 Hours
              </Text>
              <Feather name="clock" size={24} style={{ color: "#fff" }} />
            </TouchableOpacity>
          </>
        )}

        {selectedTab === "Distance" && (
          <>
            <Text className="text-gray-300 mb-2 font-axiformaRegular w-4/5 leading-5 pb-2">
              Select matches based on their distance
            </Text>
            <TouchableOpacity className="flex-row items-center justify-between py-4">
              <Text className="text-white-normal font-axiformaRegular">
                10 Miles Away
              </Text>
              <Feather name="map-pin" size={24} style={{ color: "#fff" }} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-4">
              <Text className="text-white-normal font-axiformaRegular">
                20 Miles Away
              </Text>
              <Feather name="map-pin" size={24} style={{ color: "#fff" }} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-4">
              <Text className="text-white-normal font-axiformaRegular">
                30 Miles Away
              </Text>
              <Feather name="map-pin" size={24} style={{ color: "#fff" }} />
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default FilterModal;
