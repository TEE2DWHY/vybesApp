import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import React from "react";
import axios from "axios";
import { useToken } from "../../../../hooks/useToken";
import { useAccount } from "../../../../hooks/useAccount";

const EditProfileModal = ({
  editModal,
  setEditModal,
  userData,
  handleInputChange,
}) => {
  const token = useToken();
  const { setUser } = useAccount();

  const updateUserDetails = async () => {
    try {
      const response = await axios.patch(
        "https://vybesapi.onrender.com/v1/user/update-details",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data?.payload?.user);
      Alert.alert("Success", response.data?.message);
    } catch (error) {
      console.log(error.message);
      Alert.alert("Error", error.response?.data?.message);
      console.log(error.response.data?.message);
    }
  };

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
            <TouchableOpacity
              onPress={() => {
                updateUserDetails();
                setEditModal(false);
              }}
            >
              <Text className="text-[#16A34A] font-axiformaBlack">Done</Text>
            </TouchableOpacity>
          </View>
          <View className="bg-white-normal rounded-xl p-6">
            <View className="flex-row justify-between mb-4 border-b border-[#E9E9EB] pb-2">
              <Text className="text-[#546881] font-axiformaRegular">Name:</Text>
              <TextInput
                value={userData?.fullName}
                onChangeText={(text) => handleInputChange("fullName", text)}
                className="font-axiformaRegular text-[#1D242D] text-[14px]"
              />
            </View>
            <View className="flex-row justify-between mb-4 border-b border-[#E9E9EB] pb-2">
              <Text className="text-[#546881] font-axiformaRegular">
                User Name:
              </Text>
              <TextInput
                value={`@${userData?.userName}`}
                onChangeText={(text) => handleInputChange("userName", text)}
                className="font-axiformaRegular text-[#1D242D] text-[14px]"
              />
            </View>
            <View className="flex-row justify-between mb-4 border-b border-[#E9E9EB] pb-2">
              <Text className="text-[#546881] font-axiformaRegular">
                Date of Birth:
              </Text>
              <TextInput
                value={userData?.dateOfBirth}
                onChangeText={(text) => handleInputChange("dateOfBirth", text)}
                className="font-axiformaRegular text-[#1D242D] text-[14px]"
              />
            </View>
            <View className="flex-row justify-between mb-4 border-b border-[#E9E9EB] pb-2">
              <Text className="text-[#546881] font-axiformaRegular">
                Account Type:
              </Text>
              <TextInput
                value={userData?.accountType}
                onChangeText={(text) => handleInputChange("accountType", text)}
                className="font-axiformaRegular text-[#1D242D] text-[14px]"
              />
            </View>
            <View className="flex-row justify-between mb-4 border-b border-[#E9E9EB] pb-2">
              <Text className="text-[#546881] font-axiformaRegular">
                Phone Number:
              </Text>
              <TextInput
                value={userData?.phoneNumber || ""}
                onChangeText={(text) => handleInputChange("phoneNumber", text)}
                // secureTextEntry
                className="font-axiformaRegular text-[#1D242D] text-[14px]"
              />
            </View>
            <View className="flex-row justify-between mb-4 border-b border-[#E9E9EB] pb-2">
              <Text className="text-[#546881] font-axiformaRegular">
                Wallet Balance:
              </Text>
              <TextInput
                value={
                  userData?.walletBalance === null
                    ? 0
                    : userData?.walletBalance.toString()
                }
                onChangeText={(text) =>
                  handleInputChange("walletBalance", text)
                }
                editable={false}
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
