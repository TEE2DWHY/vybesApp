import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import axios from "axios";
import { getItem } from "../utils/AsyncStorage";

const FilterModal = ({ onClose }) => {
  const [token, setToken] = useState("");
  const [filterCriteria, setFilterCriteria] = useState({
    accountType: [],
    gender: null,
    availability: null,
    distance: null,
  });

  useEffect(() => {
    (async () => {
      const token = await getItem("token");
      setToken(token);
    })();
  }, []);

  const [selectedTab, setSelectedTab] = useState("Account");

  const toggleAccountType = (filterName) => {
    setFilterCriteria((prev) => {
      const updatedAccountType = prev.accountType.includes(filterName)
        ? prev.accountType.filter((type) => type !== filterName)
        : [...prev.accountType, filterName];

      return { ...prev, accountType: updatedAccountType };
    });
  };

  const toggleGender = (selectedGender) => {
    setFilterCriteria((prev) => ({
      ...prev,
      gender: prev.gender === selectedGender ? null : selectedGender,
    }));
  };

  const toggleAvailability = (selectedAvailability) => {
    setFilterCriteria((prev) => ({
      ...prev,
      availability:
        prev.availability === selectedAvailability
          ? null
          : selectedAvailability,
    }));
  };

  const toggleDistance = (distanceValue) => {
    setFilterCriteria((prev) => ({
      ...prev,
      distance: prev.distance === distanceValue ? null : distanceValue,
    }));
  };

  const renderCheckbox = (title, filterName) => (
    <TouchableOpacity
      onPress={() => toggleAccountType(filterName)}
      className="flex-row items-center py-2 px-1"
    >
      <View
        className={`w-5 h-5 border border-white-normal rounded-md flex justify-center items-center ${
          filterCriteria.accountType.includes(filterName)
            ? "bg-white"
            : "bg-transparent"
        }`}
      >
        {filterCriteria.accountType.includes(filterName) && (
          <Feather name="check" size={14} color="#a241ee" />
        )}
      </View>
      <Text className="text-white-normal ml-2 font-axiformaRegular">
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderGenderCheckbox = (title, genderValue) => (
    <TouchableOpacity
      onPress={() => toggleGender(genderValue)}
      className="flex-row items-center py-2 px-1"
    >
      <View
        className={`w-5 h-5 border border-white-normal rounded-md flex justify-center items-center ${
          filterCriteria.gender === genderValue ? "bg-white" : "bg-transparent"
        }`}
      >
        {filterCriteria.gender === genderValue && (
          <Feather name="check" size={14} color="#a241ee" />
        )}
      </View>
      <Text className="text-white-normal ml-2 font-axiformaRegular">
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderAvailabilityCheckbox = (title, availabilityValue) => (
    <View className="flex-row justify-between items-center">
      <TouchableOpacity
        onPress={() => toggleAvailability(availabilityValue)}
        className="flex-row items-center py-2 px-1"
      >
        <View
          className={`w-5 h-5 border border-white-normal rounded-md flex justify-center items-center ${
            filterCriteria.availability === availabilityValue
              ? "bg-white"
              : "bg-transparent"
          }`}
        >
          {filterCriteria.availability === availabilityValue && (
            <Feather name="check" size={14} color="#a241ee" />
          )}
        </View>
        <Text className="text-white-normal ml-2 font-axiformaRegular">
          {title}
        </Text>
      </TouchableOpacity>
      <Feather name="clock" size={20} style={{ color: "#fff" }} />
    </View>
  );

  const renderDistanceCheckbox = (title, distanceValue) => (
    <View className="flex-row justify-between items-center">
      <TouchableOpacity
        onPress={() => toggleDistance(distanceValue)}
        className="flex-row items-center py-2 px-1"
      >
        <View
          className={`w-5 h-5 border border-white-normal rounded-md flex justify-center items-center ${
            filterCriteria.distance === distanceValue
              ? "bg-white"
              : "bg-transparent"
          }`}
        >
          {filterCriteria.distance === distanceValue && (
            <Feather name="check" size={14} color="#a241ee" />
          )}
        </View>
        <Text className="text-white-normal ml-2 font-axiformaRegular">
          {title}
        </Text>
      </TouchableOpacity>
      <Feather name="map-pin" size={20} style={{ color: "#fff" }} />
    </View>
  );

  const filterUsers = async () => {
    const { accountType, gender, availability, distance } = filterCriteria;

    const queryParams = {
      accountType: accountType.join(","),
      gender,
      availability,
      distance,
    };

    try {
      const response = await axios.get(
        `http://localhost:8000/v1/user/filter-users`,
        {
          params: queryParams,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert(response.data.message);
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data.message);
      Alert.alert(error.response.data.message);
    }
  };

  return (
    <>
      <Modal transparent={true} visible={true} animationType="fade">
        <TouchableOpacity
          className="flex-1 bg-[#1b1b1b67]"
          onPress={onClose}
          activeOpacity={1}
        />
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
                {renderGenderCheckbox("Male", "male")}
                {renderGenderCheckbox("Female", "female")}
              </>
            )}

            {selectedTab === "Availability" && (
              <>
                <Text className="text-gray-300 mb-2 font-axiformaRegular w-4/5 leading-5 pb-2">
                  Select matches based on their availability
                </Text>
                {renderAvailabilityCheckbox("30 Minutes", "30 Minutes")}
                {renderAvailabilityCheckbox("1 Hour", "1 Hour")}
                {renderAvailabilityCheckbox("3 Hours", "3 Hours")}
              </>
            )}

            {selectedTab === "Distance" && (
              <>
                <Text className="text-gray-300 mb-2 font-axiformaRegular w-4/5 leading-5 pb-2">
                  Select matches based on their distance
                </Text>
                {renderDistanceCheckbox("10 Miles Away", 10)}
                {renderDistanceCheckbox("20 Miles Away", 20)}
                {renderDistanceCheckbox("30 Miles Away", 30)}
              </>
            )}

            <TouchableOpacity
              className="mt-4 bg-purple-normal py-4 rounded-md"
              onPress={filterUsers}
            >
              <Text className="text-white-normal text-center font-axiformaRegular">
                Apply Filters
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default FilterModal;
