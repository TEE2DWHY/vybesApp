import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  ScrollView,
  TextInput,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { clear, getItem, removeItem } from "../../../../utils/AsyncStorage";
import { useEffect, useState } from "react";
import { userInstance } from "../../../../config/axios";
import { useAccount } from "../../../../hooks/useAccount";

const Account = () => {
  const { user } = useAccount();
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({
    fullName: user?.fullName || "",
    userName: user?.userName || "",
    dateOfBirth: user?.dateOfBirth || "",
    accountType: user?.accountType || "",
    password: "", // Don't pre-fill the password for security reasons
    walletBalance: "15,000 Vybes Coin",
    giftedCoins: "5,000 Vybes Coin",
    completedHooks: 15,
  });

  const handleInputChange = (key, value) => {
    setUserData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <>
      <View className="items-center mt-4">
        <Text className="capitalize font-axiformaBlack text-xl my-3">
          @{user?.userName}
        </Text>
        <Image
          source={{
            uri: user?.image,
          }}
          className="w-[150px] h-[150px] rounded-[80px] border-[4px]  border-[#9ec2ec]"
        />
      </View>

      <View className="mt-8">
        <View className="flex-row justify-between">
          <Text className="font-axiformaBlack text-base text-[#3D4C5E]">
            Account Information
          </Text>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setModalVisible(true)}
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
        <View className="p-4 mt-2 rounded-lg border-[#FFFFFF] border bg-white-normal ">
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2 mt-3">
            <Text className="text-[#546881] font-axiformaRegular">Name:</Text>
            <Text className="font-axiformaBlack  text-[#1D242D] text-[14px]">
              {user?.fullName}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              UserName:
            </Text>
            <Text className="font-axiformaBlack  text-[#1D242D] text-[14px]">
              {" "}
              @{user?.userName}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Date Of Birth:
            </Text>
            <Text className="font-axiformaBlack text-[#1D242D] text-[14px]">
              {user?.dateOfBirth}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Account Type:
            </Text>
            <Text className="font-axiformaBlack text-[#1D242D] text-[14px]">
              {user?.accountType}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Password:
            </Text>
            <Text className="font-axiformaBlack text-[#1D242D] text-[14px]">
              {user?.password || "*****"}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Wallet Balance:
            </Text>
            <Text className="font-axiformaBlack text-[#1D242D] text-[14px]">
              {user?.walletBalance || "-------"}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Gifted Coins:
            </Text>
            <Text className="font-axiformaBlack text-[#1D242D] text-[14px]">
              {user?.giftedCoins || "-------"}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Subscribers:
            </Text>
            <Text className="font-axiformaBlack  text-[#1D242D] text-[14px]">
              {user?.subscribers || 0}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">E-Mail:</Text>
            <Text className="font-axiformaBlack text-[#1D242D] text-[14px]">
              {`${user?.email?.slice(0, 5)}...@${user?.email?.split("@")[1]}`}
            </Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaRegular">
              Phone No:
            </Text>
            <Text className="font-axiformaBlack  text-[#1D242D] text-[14px]">
              {user?.phoneNumber}
            </Text>
          </View>
        </View>
      </View>

      <Text className="font-axiformaBlack mt-8 text-lg ">{user?.fullName}</Text>

      <View className="mt-4">
        <Text className="font-axiformaBook text-sm text-[#546881] mb-3">
          Bio Description
        </Text>
        <View className="border py-8 px-4 mt-2 rounded-lg flex-row justify-between">
          <View className="w-1/2 pr-2">
            <Text className="text-center font-axiformaBlack text-[#546881] mb-3">
              Following
            </Text>
            <View className="flex-row justify-between">
              <View className="flex-1 items-center">
                <Text className="text-[#7A91F9] text-xl">112</Text>
                <Text className="text-[#546881] font-axiformaRegular">
                  Vybers
                </Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-[#2AB49B] text-xl">20</Text>
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
                <Text className="text-[#7A91F9] text-xl">112</Text>
                <Text className="text-[#546881] font-axiformaRegular">
                  Vybers
                </Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-[#2AB49B] text-xl">20</Text>
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
          <TouchableOpacity className="px-4 py-4 border-b border-[#EEF1F4] flex-row justify-between items-center">
            <Text className="text-[#546881] font-axiformaBlack">
              Share QR Code
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="#546881"
            />
          </TouchableOpacity>
          <TouchableOpacity className="px-4 py-4 border-b border-[#EEF1F4] flex-row justify-between items-center">
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
            onPress={() => {
              router.push("/");
            }}
          >
            <Text className="text-[#FF7474] font-axiformaRegular">
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {modalVisible && (
        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            className="flex-1 bg-[#1b1b1b67] justify-center items-center"
          />
          <View className="flex-1 justify-center items-center">
            <ScrollView className="p-4 bg-purple-darker w-full">
              <View className="flex-row justify-between items-center mb-4 mt-2">
                <Text className="text-white-normal font-axiformaBlack">
                  Edit Profile Account
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text className="text-[#16A34A] font-axiformaBlack">
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="bg-white-normal rounded-tl-[40px] rounded-tr-[40px] p-6">
                <View className="flex-row justify-between mb-4 border-b border-[#E9E9EB] pb-2">
                  <Text className="text-[#546881] font-axiformaRegular">
                    Name:
                  </Text>
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
                    value={userData.userName}
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
                    onChangeText={(text) =>
                      handleInputChange("dateOfBirth", text)
                    }
                    className="font-axiformaRegular text-[#1D242D] text-[14px]"
                  />
                </View>
                <View className="flex-row justify-between mb-4 border-b border-[#E9E9EB] pb-2">
                  <Text className="text-[#546881] font-axiformaRegular">
                    Account Type:
                  </Text>
                  <TextInput
                    value={userData.accountType}
                    onChangeText={(text) =>
                      handleInputChange("accountType", text)
                    }
                    className="font-axiformaRegular text-[#1D242D] text-[14px]"
                  />
                </View>
                <View className="flex-row justify-between mb-4 border-b border-[#E9E9EB] pb-2">
                  <Text className="text-[#546881] font-axiformaRegular">
                    Password:
                  </Text>
                  <TextInput
                    value={userData.password}
                    onChangeText={(text) => handleInputChange("password", text)}
                    secureTextEntry
                    className="font-axiformaRegular text-[#1D242D] text-[14px]"
                  />
                </View>
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
                    onChangeText={(text) =>
                      handleInputChange("giftedCoins", text)
                    }
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
                      handleInputChange(
                        "completedHooks",
                        parseInt(text, 10) || 0
                      )
                    } // Fallback to 0 if NaN
                    className="font-axiformaRegular text-[#1D242D] text-[14px]"
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>
      )}
    </>
  );
};

export default Account;
