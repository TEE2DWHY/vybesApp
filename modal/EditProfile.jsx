import React from "react";
import { Text, TouchableOpacity, View, Modal } from "react-native";

const EditProfile = ({ closeModal, modalVisible }) => {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-end items-center bg-black bg-opacity-50">
          <View className="w-full bg-[#4D2478] rounded-t-lg p-5">
            <Text className="text-lg font-axiformaBold text-[#FFFFFF] mb-4">
              Edit Profile Account
            </Text>
            <View className="bg-white p-5 rounded-lg">
              <View className="mb-4">
                <Text className="font-axiformaMedium text-[#6B6B6B]">Name</Text>
                <Text className="font-axiformaBold text-[#000000]">
                  Demilade Kaosarat
                </Text>
              </View>

              <View className="mb-4 flex-row justify-between">
                <View>
                  <Text className="font-axiformaMedium text-[#6B6B6B]">
                    User Name
                  </Text>
                  <Text className="font-axiformaBold text-[#000000]">
                    Kaosarat112
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text className="text-[#4D2478]">✏️</Text>
                </TouchableOpacity>
              </View>

              <View className="mb-4">
                <Text className="font-axiformaMedium text-[#6B6B6B]">
                  Date Of Birth
                </Text>
                <Text className="font-axiformaBold text-[#000000]">
                  12-Aug-1950
                </Text>
              </View>

              <View className="mb-4">
                <Text className="font-axiformaMedium text-[#6B6B6B]">
                  Account Type
                </Text>
                <Text className="font-axiformaBold text-[#4D2478] bg-[#EDEAFB] px-3 py-1 rounded-lg">
                  Vyber
                </Text>
              </View>

              <View className="mb-4 flex-row justify-between">
                <View>
                  <Text className="font-axiformaMedium text-[#6B6B6B]">
                    Password
                  </Text>
                  <Text className="font-axiformaBold text-[#000000]">
                    12ab34cd56ef
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text className="text-[#4D2478]">✏️</Text>
                </TouchableOpacity>
              </View>

              <View className="mb-4">
                <Text className="font-axiformaMedium text-[#6B6B6B]">
                  Wallet Balance
                </Text>
                <Text className="font-axiformaBold text-[#000000]">
                  15,000 Vybes Coin
                </Text>
              </View>

              <View className="mb-4">
                <Text className="font-axiformaMedium text-[#6B6B6B]">
                  Gifted Coins
                </Text>
                <Text className="font-axiformaBold text-[#000000]">
                  5,000 Vybes Coin
                </Text>
              </View>

              <View className="mb-4">
                <Text className="font-axiformaMedium text-[#6B6B6B]">
                  Completed Hooks
                </Text>
                <Text className="font-axiformaBold text-[#000000]">15</Text>
              </View>

              <TouchableOpacity onPress={closeModal} className="self-end mt-4">
                <Text className="text-[#4D2478] font-axiformaBold">Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default EditProfile;
