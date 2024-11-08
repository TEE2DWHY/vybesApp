import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToken } from "../hooks/useToken";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const SearchModal = ({
  closeModal,
  modalVisible,
  searchText,
  setSearchText,
  clearSearch,
}) => {
  const token = useToken();
  const [users, setUsers] = useState([]);
  const [searchedUser, setSearchedUser] = useState(null);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    if (token) {
      const fetchAllUsers = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/v1/user/get-users`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUsers(response.data.payload.users);
        } catch (error) {
          console.error(
            "Error fetching users:",
            error.response ? error.response.data.message : error
          );
        }
      };
      fetchAllUsers();
    }
  }, [token]);

  const search = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/v1/user/get-user-by-username/${searchText}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchedUser(response.data.payload.user);
      setSearchError("");
    } catch (error) {
      setSearchedUser(null);
      setSearchError(error.response.data.message);
    }
  };

  const renderUserDetails = () => (
    <View className="flex-row items-center justify-between mb-4 pb-2">
      <View className="flex-row items-center">
        <Image
          source={{ uri: searchedUser.image }}
          className="w-10 h-10 rounded-full mr-3"
        />
        <Text className="font-axiformaBlack text-[#FFFFFF] capitalize">
          {searchedUser.userName}
        </Text>
      </View>
      <View
        className={`px-1 py-2 font-axiformaRegular capitalize rounded-md border-2 border-white-normal ${
          searchedUser.accountType === "Vyber"
            ? "bg-[#E0E4FF] text-[#4D2478]"
            : "bg-purple-normal"
        }`}
      >
        <Text
          className={`px-3 py-1 rounded-lg font-axiformaRegular capitalize text-[10px] ${
            searchedUser.accountType === "Vyber"
              ? "text-[#4D2478]"
              : "text-white-normal"
          }`}
        >
          {searchedUser.accountType}
        </Text>
      </View>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <TouchableOpacity
        className="flex-1 bg-[#1b1b1b67]"
        onPress={closeModal}
        activeOpacity={1}
      />
      <View className="justify-end items-center bg-[#1b1b1b67] bg-opacity-50 w-full h-[200px]">
        <View className="w-full bg-purple-darker rounded-tl-[20px] rounded-tr-[20px] p-5">
          <Text className="text-lg font-axiformaBlack text-[#FFFFFF] mb-4">
            Search
          </Text>

          {/* Search Bar */}
          <View className="bg-white-normal p-3 flex-row items-center rounded-3xl mb-4">
            <View className="flex-row items-center justify-between w-[92%]">
              <View className="flex-row items-center">
                <TouchableOpacity onPress={search}>
                  <Text className="text-[#4D2478] text-xl mr-3">🔍</Text>
                </TouchableOpacity>
                <TextInput
                  className="flex-1 font-axiformaRegular text-[#1D242D]"
                  placeholder="Search username"
                  placeholderTextColor="#6B6B6B"
                  value={searchText}
                  onChangeText={setSearchText}
                />
              </View>
              <TouchableOpacity onPress={clearSearch}>
                <MaterialIcons name="cancel" size={20} color="#909DAD" />
              </TouchableOpacity>
            </View>
          </View>

          <Text className="font-axiformaBlack text-[#909DAD] mb-4">
            {searchedUser ? "Search Result" : "Suggested Result"}
          </Text>

          {searchedUser ? (
            renderUserDetails()
          ) : searchError ? (
            <Text className="text-red-400 my-2 text-center font-axiformaBook">
              {searchError}
            </Text>
          ) : (
            <FlatList
              data={users}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View className="flex-row items-center justify-between mb-4 border-b border-[#DEEDFF] pb-2">
                  <View className="flex-row items-center">
                    <Image
                      source={{ uri: item?.image }}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <Text className="font-axiformaBlack text-[#FFFFFF] capitalize">
                      {item.userName}
                    </Text>
                  </View>
                  <View
                    className={`px-1 py-2 font-axiformaRegular capitalize rounded-md border-2 border-white-normal ${
                      item.accountType === "Vyber"
                        ? "bg-[#E0E4FF] text-[#4D2478]"
                        : "bg-purple-normal"
                    }`}
                  >
                    <Text
                      className={`px-3 py-1 rounded-lg font-axiformaRegular capitalize text-[10px] ${
                        item.accountType === "Vyber"
                          ? "text-[#4D2478]"
                          : "text-white-normal"
                      }`}
                    >
                      {item.accountType}
                    </Text>
                  </View>
                </View>
              )}
            />
          )}

          <TouchableOpacity onPress={closeModal} className="self-end mt-4">
            <Text className="text-[#FFFFFF] font-axiformaBook">Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SearchModal;
