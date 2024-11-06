import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";

const EditProfileModal = ({
  editModal,
  setEditModal,
  userData,
  handleInputChange,
}) => {
  return (
    <Modal visible={editModal} transparent={true} animationType="fade">
      <TouchableOpacity
        onPress={() => setEditModal(false)}
        className="flex-1 bg-[#1b1b1b67] justify-center items-center"
      />
      <View className="flex-1 justify-center items-center">
        <ScrollView className="p-4 bg-purple-darker w-full">
          <View className="flex-row justify-between items-center mb-4 mt-2">
            <Text className="text-white-normal font-axiformaBlack">
              Edit Profile Account
            </Text>
            <TouchableOpacity onPress={() => setEditModal(false)}>
              <Text className="text-[#16A34A] font-axiformaBlack">Done</Text>
            </TouchableOpacity>
          </View>
          <View className="bg-white-normal rounded-xl p-6">
            <View className="flex-row justify-between mb-4 border-b border-[#E9E9EB] pb-2">
              <Text className="text-[#546881] font-axiformaRegular">Name:</Text>
              <TextInput
                value={userData.fullName}
                onChangeText={(text) => handleInputChange("fullName", text)}
                className="font-axiformaRegular text-[#1D242D] text-[14px]"
              />
            </View>
            <View className="flex-row justify-between mb-4 border-b border-[#E9E9EB] pb-2">
              <Text className="text-[#546881] font-axiformaRegular">
                User Name:
              </Text>
              <TextInput
                value={`@${userData.userName}`}
                onChangeText={(text) => handleInputChange("userName", text)}
                className="font-axiformaRegular text-[#1D242D] text-[14px]"
              />
            </View>
            <View className="flex-row justify-between mb-4 border-b border-[#E9E9EB] pb-2">
              <Text className="text-[#546881] font-axiformaRegular">
                Date of Birth:
              </Text>
              <TextInput
                value={userData.dateOfBirth}
                onChangeText={(text) => handleInputChange("dateOfBirth", text)}
                className="font-axiformaRegular text-[#1D242D] text-[14px]"
              />
            </View>
            <View className="flex-row justify-between mb-4 border-b border-[#E9E9EB] pb-2">
              <Text className="text-[#546881] font-axiformaRegular">
                Account Type:
              </Text>
              <TextInput
                value={userData.accountType}
                onChangeText={(text) => handleInputChange("accountType", text)}
                className="font-axiformaRegular text-[#1D242D] text-[14px]"
              />
            </View>
            {/* <View className="flex-row justify-between mb-4 border-b border-[#E9E9EB] pb-2">
              <Text className="text-[#546881] font-axiformaRegular">
                Password:
              </Text>
              <TextInput
                value={userData.password || "******"}
                onChangeText={(text) => handleInputChange("password", text)}
                secureTextEntry
                className="font-axiformaRegular text-[#1D242D] text-[14px]"
              />
            </View> */}
            <View className="flex-row justify-between mb-4 border-b border-[#E9E9EB] pb-2">
              <Text className="text-[#546881] font-axiformaRegular">
                Wallet Balance:
              </Text>
              <TextInput
                value={userData.walletBalance}
                onChangeText={(text) =>
                  handleInputChange("walletBalance", text)
                }
                className="font-axiformaRegular text-[#1D242D] text-[14px]"
              />
            </View>
            <View className="flex-row justify-between mb-4 border-b border-[#E9E9EB] pb-2">
              <Text className="text-[#546881] font-axiformaRegular">
                Gifted Coins:
              </Text>
              <TextInput
                value={userData.giftedCoins}
                onChangeText={(text) => handleInputChange("giftedCoins", text)}
                className="font-axiformaRegular text-[#1D242D] text-[14px]"
              />
            </View>
            <View className="flex-row justify-between mb-4 border-b border-[#E9E9EB] pb-2">
              <Text className="text-[#546881] font-axiformaRegular">
                Completed Hooks:
              </Text>
              <TextInput
                value={userData.completedHooks.toString()} // Ensure it's a string
                onChangeText={(text) =>
                  handleInputChange("completedHooks", parseInt(text, 10) || 0)
                } // Fallback to 0 if NaN
                className="font-axiformaRegular text-[#1D242D] text-[14px]"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default EditProfileModal;
