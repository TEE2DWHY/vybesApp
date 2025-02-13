import { useEffect, useState } from "react";
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
import axios from "axios";
import { useToken } from "../../../../hooks/useToken";

const Account = ({ switchTab }) => {
  const { user, loading, setLoading } = useAccount();
  const token = useToken();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSetUpModal, setShowSetUpModal] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [showShareProfile, setShareProfileModal] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  const deleteAccount = async () => {
    try {
      const response = await axios.delete(
        "https://vybesapi.onrender.com/v1/user/delete-account",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response?.data);
      await clear();
      router.push("/");
    } catch (error) {
      console.log(error?.message);
    } finally {
      setShowDeleteModal(false);
    }
  };

  useEffect(() => {
    if (user?.newUser) {
      setShowSetUpModal(true);
    }
    return () => {
      setShowSetUpModal(false);
    };
  }, [user]);

  return (
    <>
      {/* SetUp Modal */}
      <Modal
        visible={showSetUpModal}
        transparent={true}
        className="opacity-20"
        animationType="fade"
      >
        <View
          className="items-center justify-center bg-[#1b1b1ba0] bg-opacity-50 h-full"
          // onPress={() => setShowSetUpModal(false)}
        >
          <View className="absolute top-[45%] rounded-xl py-8 px-4  bg-white-normal items-center w-[85%] shadow-slate-400">
            <Text className="text-gray-700 font-axiformaMedium text-center w-[80%] capitalize leading-6 mb-2 text-base">
              Please Head Over To the Personality Tab To Set Up Your Account
              Completely.
            </Text>
            <View className="flex-row gap-12 mt-2 mb-3">
              <TouchableOpacity
                className="rounded-md bg-red-500 py-3 px-6"
                onPress={() => setShowSetUpModal(false)}
              >
                <Text className="font-axiformaRegular text-white-normal">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="rounded-md bg-blue-500  py-3 px-6"
                onPress={switchTab}
              >
                <Text className="font-axiformaRegular text-white-normal">
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Delete Modal */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        className="opacity-20"
        animationType="fade"
      >
        <TouchableOpacity
          className="items-center justify-center bg-[#1b1b1ba0] bg-opacity-50 h-full"
          onPress={() => setShowDeleteModal(false)}
        >
          <View className="absolute top-[45%] rounded-xl py-8 px-4  bg-white-normal items-center w-[75%] shadow-slate-400">
            <Text className="text-gray-700 font-axiformaMedium text-center w-4/5 capitalize leading-6 mb-2 text-lg">
              Are you sure you want to delete your account?
            </Text>
            <View className="flex-row gap-12 mt-2 mb-3">
              <TouchableOpacity
                className="rounded-md bg-blue-500  py-3 px-6"
                onPress={() => setShowDeleteModal(false)}
              >
                <Text className="font-axiformaRegular text-white-normal">
                  No
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="rounded-md bg-red-500 py-3 px-6"
                onPress={() => deleteAccount()}
              >
                <Text className="font-axiformaRegular text-white-normal">
                  Yes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
            {loading ? (
              <Skeleton
                colorMode="light"
                height={12}
                width={80}
                radius={"round"}
                className="mb-4"
              />
            ) : (
              <Text className="font-axiformaMedium  text-[#1D242D] text-[14px]">
                {user?.fullName}
              </Text>
            )}
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              UserName:
            </Text>
            {loading ? (
              <Skeleton
                colorMode="light"
                height={12}
                width={80}
                radius={"round"}
                className="mb-4"
              />
            ) : (
              <Text className="font-axiformaMedium  text-[#1D242D] text-[14px]">
                {" "}
                @{user?.userName}
              </Text>
            )}
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Date Of Birth:
            </Text>
            {loading ? (
              <Skeleton
                colorMode="light"
                height={12}
                width={80}
                radius={"round"}
                className="mb-4"
              />
            ) : (
              <Text className="font-axiformaMedium text-[#1D242D] text-[14px]">
                {user?.dateOfBirth}
              </Text>
            )}
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Account Type:
            </Text>
            {loading ? (
              <Skeleton
                colorMode="light"
                height={12}
                width={80}
                radius={"round"}
                className="mb-4"
              />
            ) : (
              <Text className="font-axiformaMedium text-[#1D242D] text-[14px]">
                {user?.accountType}
              </Text>
            )}
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Password:
            </Text>
            {loading ? (
              <Skeleton
                colorMode="light"
                height={12}
                width={80}
                radius={"round"}
                className="mb-4"
              />
            ) : (
              <Text className="font-axiformaMedium text-[#1D242D] text-[14px]">
                {"*****"}
              </Text>
            )}
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Wallet Balance:
            </Text>
            {loading ? (
              <Skeleton
                colorMode="light"
                height={12}
                width={80}
                radius={"round"}
                className="mb-4"
              />
            ) : (
              <Text className="font-axiformaMedium text-[#1D242D] text-[14px]">
                {user?.walletBalance}
              </Text>
            )}
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Gifted Coins:
            </Text>
            {loading ? (
              <Skeleton
                colorMode="light"
                height={12}
                width={80}
                radius={"round"}
                className="mb-4"
              />
            ) : (
              <Text className="font-axiformaMedium text-[#1D242D] text-[14px]">
                {user?.giftedCoins || 0}
              </Text>
            )}
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Subscribers:
            </Text>
            {loading ? (
              <Skeleton
                colorMode="light"
                height={12}
                width={80}
                radius={"round"}
                className="mb-4"
              />
            ) : (
              <Text className="font-axiformaMedium  text-[#1D242D] text-[14px]">
                {user?.subscribers || 0}
              </Text>
            )}
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">E-Mail:</Text>
            {loading ? (
              <Skeleton
                colorMode="light"
                height={12}
                width={80}
                radius={"round"}
                className="mb-4"
              />
            ) : (
              <Text className="font-axiformaMedium text-[#1D242D] text-[14px]">
                {`${user?.email?.slice(0, 5)}...@${user?.email?.split("@")[1]}`}
              </Text>
            )}
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Phone No:
            </Text>
            {loading ? (
              <Skeleton
                colorMode="light"
                height={12}
                width={80}
                radius={"round"}
                className="mb-4"
              />
            ) : (
              <Text className="font-axiformaMedium  text-[#1D242D] text-[14px]">
                {user?.phoneNumber}
              </Text>
            )}
          </View>
        </View>
      </View>

      {loading ? (
        <View className="mt-6">
          <Skeleton
            colorMode="light"
            height={12}
            width={120}
            radius={"round"}
            className="mb-4"
          />
        </View>
      ) : (
        <Text className="font-axiformaBlack mt-8 text-lg capitalize">
          {user?.fullName}
        </Text>
      )}

      <View className="mt-1 pb-6">
        {loading ? (
          <View className="mt-6">
            <Skeleton
              colorMode="light"
              height={12}
              width={180}
              radius={"round"}
              className="mb-4"
            />
          </View>
        ) : (
          <Text className="font-axiformaBook text-sm text-[#546881] mb-3">
            {user?.bio}
          </Text>
        )}
        <View className="border py-8 px-4 mt-4 rounded-lg flex-row justify-between">
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
            onPress={() => setShowDeleteModal(true)}
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
