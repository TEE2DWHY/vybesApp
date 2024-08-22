import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ShareProfile from "../../../../modal/ShareProfile";

const Empty = () => {
  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <>
      <ScrollView className="h-full relative">
        <View className=" bg-white-normal w-[120px] mt-10 self-center rounded-[40px] p-4">
          <Text className="font-axiformaBlack text-center ">Link Copied</Text>
        </View>
        <View className="bg-white-normal border-white-normal self-center border h-[40vh] w-[100%] rounded-[12px] items-center mt-4">
          <View className="self-end mt-4 pr-10  flex-row items-center">
            <Text className="text-[#B2BBC6] font-axiformaRegular mr-1">
              Copy Link
            </Text>
            <Ionicons name="link-sharp" size={24} color="#9941EE" />
          </View>
          <Text className="font-axiformaBlackItalic text-purple-normal text-2xl mt-[25%]">
            Invite Friend's
          </Text>
          <Text className="self-center px-6 font-axiformaRegular leading-6 text-[#546881] mt-2 capitalize">
            send an invite to your friends to chat and earn 2 vybe coins per
            each person you refer
          </Text>
          <TouchableOpacity
            className="bg-purple-normal p-5 rounded-[80px] mt-4"
            onPress={() => setShowShareModal(true)}
          >
            <Text className="text-white-normal font-axiformaBlack">
              Send An Invite
            </Text>
          </TouchableOpacity>
        </View>
        {showShareModal && (
          <ShareProfile closeModal={() => setShowShareModal(false)} />
        )}
      </ScrollView>
    </>
  );
};

export default Empty;
