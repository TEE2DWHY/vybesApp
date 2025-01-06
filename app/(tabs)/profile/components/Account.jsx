import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  Dimensions,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { clear, removeItem } from "../../../../utils/AsyncStorage";
import { useAccount } from "../../../../hooks/useAccount";
import EditProfileModal from "./EditProfileModal";
import ShareProfile from "../../../../modal/ShareProfile";
import ShareQr from "../../../../modal/ShareQr";
import { Skeleton } from "moti/skeleton";

const Account = () => {
  const { user, loading, setLoading } = useAccount();
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [showShareProfile, setShareProfileModal] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [userData, setUserData] = useState({
    fullName: user?.fullName || "",
    userName: user?.userName || "",
    dateOfBirth: user?.dateOfBirth || "",
    accountType: user?.accountType || "",
    phoneNumber: user?.phoneNumber || "",
    password: "****",
    walletBalance: user?.walletBalance || "",
    giftedCoins: "",
    completedHooks: "",
  });

  const handleInputChange = (key, value) => {
    setUserData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  return (
    <>
      <View className="items-center mt-4">
        <Text className="capitalize font-axiformaBlack text-xl my-3">
          @{user?.userName}
        </Text>
        <TouchableOpacity onPress={() => setImageModalVisible(true)}>
          {loading ? (
            <Skeleton
              colorMode="light"
              height={150}
              width={150}
              radius={"round"}
              className="mb-4"
            />
          ) : (
            <Image
              source={{
                uri: user?.image,
              }}
              className="w-[150px] h-[150px] rounded-[75px] border-[4px]  border-[#9ec2ec]"
              onLoad={() => setLoading(false)}
            />
          )}
        </TouchableOpacity>
      </View>

      <Modal
        visible={imageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
        transparent={true}
        animationType="fade"
      >
        <View className="flex-1 justify-center items-center bg-[#1b1b1bb7] bg-opacity-80">
          <TouchableOpacity
            className="flex-1 justify-center items-center"
            onPress={() => setImageModalVisible(false)}
          >
            <Image
              source={{ uri: user?.image }}
              style={{
                width: screenWidth,
                height: screenHeight,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
        </View>
      </Modal>

      <View className="mt-8">
        <View className="flex-row justify-between">
          <Text className="font-axiformaBlack text-base text-[#3D4C5E]">
            Account Information
          </Text>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setEditModal(true)}
          >
            <Text className="text-purple-dark opacity-50 font-axiformaBlack">
              Edit
            </Text>
            <AntDesign
              name="edit"
              size={24}
              style={{ color: "#7a31b3", opacity: 0.5 }}
            />
          </TouchableOpacity>
        </View>
        <View className="p-4 mt-2 rounded-lg border-[#fff] border bg-white-normal ">
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2 mt-3">
            <Text className="text-[#546881] font-axiformaRegular">Name:</Text>
            <Text className="font-axiformaMedium  text-[#1D242D] text-[14px]">
              {user?.fullName}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              UserName:
            </Text>
            <Text className="font-axiformaMedium  text-[#1D242D] text-[14px]">
              {" "}
              @{user?.userName}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Date Of Birth:
            </Text>
            <Text className="font-axiformaMedium text-[#1D242D] text-[14px]">
              {user?.dateOfBirth}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Account Type:
            </Text>
            <Text className="font-axiformaMedium text-[#1D242D] text-[14px]">
              {user?.accountType}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Password:
            </Text>
            <Text className="font-axiformaMedium text-[#1D242D] text-[14px]">
              {"*****"}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Wallet Balance:
            </Text>
            <Text className="font-axiformaMedium text-[#1D242D] text-[14px]">
              {user?.walletBalance}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Gifted Coins:
            </Text>
            <Text className="font-axiformaMedium text-[#1D242D] text-[14px]">
              {user?.giftedCoins || 0}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Subscribers:
            </Text>
            <Text className="font-axiformaMedium  text-[#1D242D] text-[14px]">
              {user?.subscribers || 0}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">E-Mail:</Text>
            <Text className="font-axiformaMedium text-[#1D242D] text-[14px]">
              {`${user?.email?.slice(0, 5)}...@${user?.email?.split("@")[1]}`}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Phone No:
            </Text>
            <Text className="font-axiformaMedium  text-[#1D242D] text-[14px]">
              {user?.phoneNumber}
            </Text>
          </View>
        </View>
      </View>

      <Text className="font-axiformaBlack mt-8 text-lg capitalize">
        {user?.fullName}
      </Text>

      <View className="mt-4">
        <Text className="font-axiformaBook text-sm text-[#546881] mb-3">
          {user?.bio}
        </Text>
        <View className="border py-8 px-4 mt-2 rounded-lg flex-row justify-between">
          <View className="w-1/2 pr-2">
            <Text className="text-center font-axiformaBlack text-[#546881] mb-3">
              Following
            </Text>
            <View className="flex-row justify-between">
              <View className="flex-1 items-center">
                <Text className="text-[#7A91F9] text-xl font-axiformaMedium">
                  {user?.following?.vybers}
                </Text>
                <Text className="text-[#546881] font-axiformaRegular">
                  Vybers
                </Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-[#2AB49B] text-xl font-axiformaMedium">
                  {user?.following?.vybers}
                </Text>
                <Text className="text-[#546881] font-axiformaRegular">
                  Baddies
                </Text>
              </View>
            </View>
          </View>
          <View className="w-1/2 pl-2">
            <Text className="text-center font-axiformaBlack text-[#546881] mb-3">
              Followers
            </Text>
            <View className="flex-row justify-between">
              <View className="flex-1 items-center">
                <Text className="text-[#7A91F9] text-xl font-axiformaMedium">
                  {user?.followers?.vybers}
                </Text>
                <Text className="text-[#546881] font-axiformaRegular">
                  Vybers
                </Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-[#2AB49B] text-xl font-axiformaMedium">
                  {user?.followers?.vybers}
                </Text>
                <Text className="text-[#546881] font-axiformaRegular">
                  Baddies
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="mt-4 space-y-4">
        <View className="bg-[#fff] rounded-lg shadow-lg">
          <TouchableOpacity className="px-4 py-4 border-b border-[#EEF1F4] flex-row justify-between items-center">
            <Text className="text-[#546881] font-axiformaBlack">Analytics</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="#546881"
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="px-4 py-4 border-b border-[#EEF1F4] flex-row justify-between items-center"
            onPress={() => setShowQr(true)}
          >
            <Text className="text-[#546881] font-axiformaBlack">
              Share QR Code
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="#546881"
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="px-4 py-4 border-b border-[#EEF1F4] flex-row justify-between items-center"
            onPress={() => setShareProfileModal(true)}
          >
            <Text className="text-[#546881] font-axiformaBlack">
              Share Profile
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="#546881"
            />
          </TouchableOpacity>
          <TouchableOpacity className="px-4 py-4 flex-row justify-between items-center">
            <Text className="text-[#546881] font-axiformaBlack">
              App Language
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="#546881"
            />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between mt-8 mb-14">
          <TouchableOpacity
            className="flex-1 items-center py-3 mr-2 border border-[#E4D7F5] rounded-lg"
            onPress={async () => {
              await removeItem("token");
              await removeItem("isLoggedIn");
              // await removeItem("isAppLaunched");
              router.push("/sign-in");
            }}
          >
            <Text className="text-[#C4B1F3] font-axiformaRegular">Log Out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 items-center py-3 ml-2 border border-[#FFDBDB] rounded-lg"
            onPress={async () => {
              await clear();
              router.push("/");
            }}
          >
            <Text className="text-[#FF7474] font-axiformaRegular">
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {editModal && (
        <EditProfileModal
          editModal={editModal}
          setEditModal={setEditModal}
          userData={userData}
          handleInputChange={handleInputChange}
        />
      )}
      {showShareProfile && (
        <ShareProfile
          closeModal={() => setShareProfileModal(false)}
          showProfile={showShareProfile}
          userImage={user?.image}
        />
      )}
      {showQr && (
        <ShareQr
          closeModal={() => setShowQr(false)}
          showQr={showQr}
          userImage={user?.image}
        />
      )}
    </>
  );
};

export default Account;
