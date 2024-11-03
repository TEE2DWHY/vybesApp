import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import { useState } from "react";

const SearchModal = ({ closeModal, modalVisible }) => {
  const [searchText, setSearchText] = useState("");

  const suggestedResults = [
    {
      id: "1",
      name: "Joshyxno12",
      accountType: "Vyber",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: "2",
      name: "Jjsoxynbaby",
      accountType: "Baddie",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  ];

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
      <View className="justify-end items-center bg-[#1b1b1b67] bg-opacity-50 w-full">
        <View className="w-full bg-purple-darker rounded-tl-[20px] rounded-tr-[20px] p-5">
          <Text className="text-lg font-axiformaBlack text-[#FFFFFF] mb-4">
            Search
          </Text>

          {/* Search Bar */}
          <View className="bg-white-normal p-3 flex-row items-center rounded-3xl mb-4">
            <Text className="text-[#4D2478] text-xl mr-3">🔍</Text>
            <TextInput
              className="flex-1 font-axiformaRegular text-[#1D242D]"
              placeholder="Search username"
              placeholderTextColor="#6B6B6B"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {/* Suggested Results */}
          <Text className="font-axiformaBlack text-[#909DAD] mb-4">
            Suggested Result
          </Text>
          <FlatList
            data={suggestedResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: item.avatar }}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <Text className="font-axiformaBold text-[#FFFFFF]">
                    {item.name}
                  </Text>
                </View>
                <Text
                  className={`px-3 py-1 rounded-lg font-axiformaBold ${
                    item.accountType === "Vyber"
                      ? "bg-[#E0E4FF] text-[#4D2478]"
                      : "bg-[#F8E1FF] text-[#8C1D82]"
                  }`}
                >
                  {item.accountType}
                </Text>
              </View>
            )}
          />

          {/* Done Button */}
          <TouchableOpacity onPress={closeModal} className="self-end mt-4">
            <Text className="text-[#FFFFFF] font-axiformaBold">Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SearchModal;
