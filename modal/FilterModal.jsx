import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { CheckBox } from "react-native-elements";

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
            className={`flex-1 items-center py-2 rounded-md mx-1 ${
              selectedTab === "Account"
                ? "bg-purple-800"
                : "border-[#B2BBC6] border-[1px]"
            }`}
            onPress={() => setSelectedTab("Account")}
          >
            <Text className="text-white-normal font-axiformaLight">
              Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 items-center py-2 rounded-md mx-1 ${
              selectedTab === "Sex"
                ? "bg-purple-800"
                : "border-[#B2BBC6] border-[1px]"
            }`}
            onPress={() => setSelectedTab("Sex")}
          >
            <Text className="text-white-normal font-axiformaLight">Sex</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 items-center py-2 rounded-md mx-1 ${
              selectedTab === "Availability"
                ? "bg-purple-800"
                : "border-[#B2BBC6] border-[1px]"
            }`}
            onPress={() => setSelectedTab("Availability")}
          >
            <Text className="text-white-normal font-axiformaLight">
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
            <Text className="text-white-normal font-axiformaLight">
              Distance
            </Text>
          </TouchableOpacity>
        </View>

        {selectedTab === "Account" && (
          <>
            <Text className="text-gray-300 mb-2 font-axiformaLight w-4/5 leading-5 pb-2">
              Select the type of account you want to see match from
            </Text>
            <CheckBox
              title="Female Vybers"
              checked={filters.femaleVybers}
              checkedColor="white"
              onPress={() => toggleFilter("femaleVybers")}
              containerStyle={{
                backgroundColor: "transparent",
                borderColor: "transparent",
                padding: 0,
                margin: 0,
              }}
              textStyle={{ color: "white" }}
            />
            <CheckBox
              title="Male Vybers"
              checked={filters.maleVybers}
              checkedColor="white"
              onPress={() => toggleFilter("maleVybers")}
              containerStyle={{
                backgroundColor: "transparent",
                borderColor: "transparent",
                padding: 0,
                margin: 0,
              }}
              textStyle={{ color: "white" }}
            />
            <CheckBox
              title="Female Baddie"
              checked={filters.femaleBaddie}
              checkedColor="white"
              onPress={() => toggleFilter("femaleBaddie")}
              containerStyle={{
                backgroundColor: "transparent",
                borderColor: "transparent",
                padding: 0,
                margin: 0,
              }}
              textStyle={{ color: "white" }}
            />
            <CheckBox
              title="Male Content Creators"
              checked={filters.maleContentCreators}
              checkedColor="white"
              onPress={() => toggleFilter("maleContentCreators")}
              containerStyle={{
                backgroundColor: "transparent",
                borderColor: "transparent",
                padding: 0,
                margin: 0,
              }}
              textStyle={{ color: "white" }}
            />
          </>
        )}

        {selectedTab === "Sex" && (
          <>
            <Text className="text-gray-300 mb-2 font-axiformaLight  leading-5 pb-2">
              Select your preferred gender you would like see
            </Text>
            <CheckBox
              title="Male"
              checked={false}
              checkedColor="white"
              onPress={() => toggleFilter("femaleVybers")}
              containerStyle={{
                backgroundColor: "transparent",
                borderColor: "transparent",
                padding: 0,
                margin: 0,
              }}
              textStyle={{ color: "white" }}
            />
            <CheckBox
              title="Female"
              checked={true}
              checkedColor="white"
              onPress={() => toggleFilter("maleVybers")}
              containerStyle={{
                backgroundColor: "transparent",
                borderColor: "transparent",
                padding: 0,
                margin: 0,
              }}
              textStyle={{ color: "white" }}
            />
          </>
        )}

        {selectedTab === "Availability" && (
          <>
            <Text className="text-gray-300 mb-2 font-axiformaLight w-4/5 leading-5 pb-2">
              Select matches based on their availability would
            </Text>
            <TouchableOpacity className="flex-row items-center justify-between py-4">
              <Text className="text-white-normal">30 Minutes</Text>
              <Feather name="clock" size={24} style={{ color: "#fff" }} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-4">
              <Text className="text-white-normal">1 Hour</Text>
              <Feather name="clock" size={24} style={{ color: "#fff" }} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-4">
              <Text className="text-white-normal">3 Hours</Text>
              <Feather name="clock" size={24} style={{ color: "#fff" }} />
            </TouchableOpacity>
          </>
        )}

        {selectedTab === "Distance" && (
          <>
            <Text className="text-gray-300 mb-2 font-axiformaLight w-4/5 leading-5 pb-2">
              Select matches based on their distance
            </Text>
            <TouchableOpacity className="flex-row items-center justify-between py-4">
              <Text className="text-white-normal">10 Miles Away</Text>
              <Feather name="map-pin" size={24} style={{ color: "#fff" }} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-4">
              <Text className="text-white-normal">20 Miles Away</Text>
              <Feather name="map-pin" size={24} style={{ color: "#fff" }} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-4">
              <Text className="text-white-normal">30 Miles Away</Text>
              <Feather name="map-pin" size={24} style={{ color: "#fff" }} />
            </TouchableOpacity>
          </>
        )}

        {/* Additional content for other tabs like 'Sex' can be added similarly */}
      </ScrollView>
    </View>
  );
};

export default FilterModal;
