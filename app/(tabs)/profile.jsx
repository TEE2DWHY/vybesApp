import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import EditProfile from "../../modal/EditProfile";
import Personality from "../../components/profile/Personality";
import Account from "../../components/profile/Account";
import Activities from "../../components/profile/Activities";
import Privacy from "../../components/profile/Privacy";
import Settings from "../../components/profile/Settings";

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Account");
  const [personalityTab, setPersonalityTab] = useState(1);
  const router = useRouter();

  const handlePrevious = () => {
    if (personalityTab > 4 || personalityTab > 1)
      setPersonalityTab((prevState) => prevState - 1);
  };

  const handleNext = () => {
    if (personalityTab < 4) setPersonalityTab((prevState) => prevState + 1);
  };

  return (
    <>
      <SafeAreaView className="h-full w-full">
        <ScrollView className="px-4 bg-gray-100">
          {activeTab === "Personality" && (
            <View className="flex-row justify-between w-full items-center px-2 mt-3">
              <TouchableOpacity onPress={handlePrevious}>
                <AntDesign name="left" size={24} style={{ color: "#B2BBC6" }} />
              </TouchableOpacity>
              <View className=" bg-[#D6DDFD] w-3/5 py-2 rounded-lg">
                <Text className="text-center text-lg text-[#6E83E0] font-axiformaBlack">
                  Step {personalityTab}/4
                </Text>
              </View>
              <TouchableOpacity onPress={handleNext}>
                <AntDesign
                  name="right"
                  size={24}
                  style={{ color: "#B2BBC6" }}
                />
              </TouchableOpacity>
            </View>
          )}
          {(activeTab === "Account" ||
            activeTab === "Activities" ||
            activeTab === "Privacy") && (
            <View className="flex-row items-center justify-between">
              <MaterialIcons
                name="arrow-back-ios"
                size={24}
                style={{ color: "#546881" }}
              />
              <View className="w-3/5 flex-row items-center justify-center bg-[#7A91F9] p-4 rounded-md">
                <View className="flex-row items-center">
                  <TouchableOpacity onPress={() => router.push("/home")}>
                    <FontAwesome5 name="coins" size={24} color="#fff" />
                  </TouchableOpacity>
                  <Text className="font-axiformaBlack text-sm text-white-normal ml-2">
                    Bal
                  </Text>
                </View>
                <Text className="font-axiformaBlack text-sm text-white-normal ml-4">
                  50 Vybes Coin
                </Text>
              </View>
            </View>
          )}

          <ScrollView
            horizontal
            className="mt-8 overflow-x-scroll"
            showsHorizontalScrollIndicator={false}
          >
            <View className="flex-row">
              <TouchableOpacity
                className={`${
                  activeTab === "Personality"
                    ? "bg-purple-normal border-none"
                    : "border-gray-400 border"
                } px-3 py-2 rounded-sm flex-row items-center mr-3`}
                onPress={() => setActiveTab("Personality")}
              >
                <AntDesign
                  name="user"
                  size={24}
                  color={activeTab === "Personality" ? "#fff" : "#B2BBC6"}
                />
                <Text
                  className={`ml-2 font-axiformaBlack ${
                    activeTab === "Personality"
                      ? "text-white-normal"
                      : "text-[#B2BBC6]"
                  }`}
                >
                  Personality
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`${
                  activeTab === "Account"
                    ? "bg-purple-normal border-none"
                    : "border-gray-400 border"
                } px-3 py-2 rounded-sm  flex-row items-center mr-3`}
                onPress={() => setActiveTab("Account")}
              >
                <MaterialIcons
                  name="manage-accounts"
                  size={24}
                  color={activeTab === "Account" ? "#fff" : "#B2BBC6"}
                />
                <Text
                  className={`ml-2 ${
                    activeTab === "Account"
                      ? "text-white-normal"
                      : "text-[#B2BBC6]"
                  }`}
                >
                  Account
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`${
                  activeTab === "Stories"
                    ? "bg-purple-normal border-none"
                    : "border-gray-400 border"
                } px-3 py-2 rounded-sm  flex-row items-center mr-3`}
                onPress={() => setActiveTab("Stories")}
              >
                <FontAwesome5
                  name="star-of-life"
                  size={20}
                  color={activeTab === "Stories" ? "#fff" : "#B2BBC6"}
                />
                <Text
                  className={`ml-2 ${
                    activeTab === "Stories"
                      ? "text-white-normal"
                      : "text-[#B2BBC6]"
                  }`}
                >
                  Stories
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`${
                  activeTab === "Likes"
                    ? "bg-purple-normal border-none"
                    : "border-gray-400 border"
                } px-3 py-2 rounded-sm  flex-row items-center mr-3`}
                onPress={() => setActiveTab("Likes")}
              >
                <AntDesign
                  name="hearto"
                  size={20}
                  color={activeTab === "Likes" ? "#fff" : "#B2BBC6"}
                />
                <Text
                  className={`ml-2 ${
                    activeTab === "Likes"
                      ? "text-white-normal"
                      : "text-[#B2BBC6]"
                  }`}
                >
                  Likes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`${
                  activeTab === "Activities"
                    ? "bg-purple-normal border-none"
                    : "border-gray-400 border"
                } px-3 py-2 rounded-sm  flex-row items-center mr-3`}
                onPress={() => setActiveTab("Activities")}
              >
                <FontAwesome
                  name="bell-o"
                  size={20}
                  color={activeTab === "Activities" ? "#fff" : "#B2BBC6"}
                />
                <Text
                  className={`ml-2 ${
                    activeTab === "Activities"
                      ? "text-white-normal"
                      : "text-[#B2BBC6]"
                  }`}
                >
                  Activities
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`${
                  activeTab === "Transactions"
                    ? "bg-purple-normal border-none"
                    : "border-gray-400 border"
                } px-3 py-2 rounded-sm  flex-row items-center mr-3`}
                onPress={() => setActiveTab("Transactions")}
              >
                <FontAwesome5
                  name={"file-invoice-dollar"}
                  size={20}
                  color={activeTab === "Transactions" ? "#fff" : "#B2BBC6"}
                />
                <Text
                  className={`ml-2 ${
                    activeTab === "Transactions"
                      ? "text-white-normal"
                      : "text-[#B2BBC6]"
                  }`}
                >
                  Transactions
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`${
                  activeTab === "Privacy"
                    ? "bg-purple-normal border-none"
                    : "border-gray-400 border"
                } px-3 py-2 rounded-sm  flex-row items-center mr-3`}
                onPress={() => setActiveTab("Privacy")}
              >
                <Feather
                  name="lock"
                  size={20}
                  color={activeTab === "Privacy" ? "#fff" : "#B2BBC6"}
                />
                <Text
                  className={`ml-2 ${
                    activeTab === "Privacy"
                      ? "text-white-normal"
                      : "text-[#B2BBC6]"
                  }`}
                >
                  Privacy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`${
                  activeTab === "Settings"
                    ? "bg-purple-normal border-none"
                    : "border-gray-400 border"
                } px-3 py-2 rounded-sm  flex-row items-center mr-3`}
                onPress={() => setActiveTab("Settings")}
              >
                <Ionicons
                  name="settings"
                  size={20}
                  color={activeTab === "Settings" ? "#fff" : "#B2BBC6"}
                />
                <Text
                  className={`ml-2 ${
                    activeTab === "Settings"
                      ? "text-white-normal"
                      : "text-[#B2BBC6]"
                  }`}
                >
                  Settings
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {activeTab === "Personality" && (
            <Personality
              active={personalityTab}
              handleNext={() => handleNext()}
            />
          )}

          {activeTab === "Account" && <Account />}
          {activeTab === "Activities" && <Activities />}
          {activeTab === "Privacy" && <Privacy />}

          {activeTab === "Transactions" && (
            <View className="mt-4">
              <View className="flex-row justify-between items-center px-4 py-2 bg-white rounded-lg ">
                <Text className="font-axiformaBlack text-lg">
                  Transactions History
                </Text>
                <Text className="font-axiformaBlack text-sm text-gray-400">
                  1 Week
                </Text>
              </View>

              <View className="mt-2 bg-white rounded-lg shadow-sm">
                <View className="flex-row justify-between px-4 py-2">
                  <Text className="text-base text-gray-500">
                    March 12 - March 19 2024
                  </Text>
                </View>

                {/* Transaction List */}
                <View className="border-t border-gray-200">
                  {[
                    { date: "12-03-2024", time: "16:09", amount: "#500,000" },
                    { date: "13-03-2024", time: "09:09", amount: "#500,000" },
                    { date: "14-03-2024", time: "11:09", amount: "#500,000" },
                    { date: "15-03-2024", time: "17:09", amount: "#500,000" },
                    { date: "16-03-2024", time: "20:09", amount: "#500,000" },
                    { date: "17-03-2024", time: "21:09", amount: "#500,000" },
                    { date: "18-03-2024", time: "22:09", amount: "#500,000" },
                  ].map((transaction, index) => (
                    <View
                      key={index}
                      className="flex-row justify-between px-4 py-2 border-b border-gray-200"
                    >
                      <Text className="text-base text-gray-700">
                        Withdrawal
                      </Text>
                      <Text className="text-base text-red-500 font-bold">
                        -{transaction.amount}
                      </Text>
                      <Text className="text-base text-gray-400">
                        {transaction.date} {transaction.time}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}

          {activeTab === "Settings" && <Settings />}

          {modalVisible && (
            <EditProfile
              closeModal={() => setModalVisible(false)}
              modalVisible={modalVisible}
            />
          )}
        </ScrollView>
        <StatusBar backgroundColor="#ffff" style="dark" />
      </SafeAreaView>
    </>
  );
};

export default Profile;
