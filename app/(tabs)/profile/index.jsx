import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import EditProfile from "../../../modal/EditProfile";
import Personality from "./components/Personality";
import Account from "./components/Account";
import Activities from "./components/Activities";
import Privacy from "./components/Privacy";
import Settings from "./components/Settings";
import Transactions from "./components/Transactions";
import Stories from "./components/Stories";
import Likes from "./components/Likes";
import { userInstance } from "../../../config/axios";
import { getItem } from "../../../utils/AsyncStorage";

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Account");
  const [personalityTab, setPersonalityTab] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter();

  const handlePrevious = () => {
    if (personalityTab > 4 || personalityTab > 1)
      setPersonalityTab((prevState) => prevState - 1);
  };
  useEffect(() => {
    (async () => {
      const token = await getItem("token");
      setToken(token);
    })();
  }, []);

  const handleNext = async (formData) => {
    if (personalityTab < 4) setPersonalityTab((prevState) => prevState + 1);
    else {
      console.log(formData);
      setIsLoading(true);
      try {
        const userRoute = userInstance(token);
        const response = await userRoute.patch("/update-details", formData);
        // console.log(response.data);
        Alert.alert("Success", response?.data.message);
      } catch (error) {
        console.log("error", error);
        Alert.alert("Error", "An error occurred with user update.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
    console.log("Profile details fetched successfully.");
  };

  useEffect(() => {
    (async () => {
      const token = await getItem("token");
      setToken(token);
    })();
  }, []);

  return (
    <>
      <SafeAreaView className="h-full w-full mt-10">
        <ScrollView
          className="px-4"
          refreshControl={
            (activeTab === "Account" ||
              activeTab === "Activities" ||
              activeTab === "Transactions") && (
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            )
          }
        >
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
              <AntDesign
                name="right"
                size={24}
                style={{ color: "#B2BBC6" }}
                disabled={personalityTab === 4 ? true : false}
                onPress={handleNext}
              />
            </View>
          )}
          {(activeTab === "Account" ||
            activeTab === "Activities" ||
            activeTab === "Privacy" ||
            activeTab === "Stories" ||
            activeTab === "Transactions") && (
            <View className="flex-row items-center justify-between mt-2">
              <MaterialIcons
                name="arrow-back-ios"
                size={24}
                style={{ color: "#546881" }}
              />
              <TouchableOpacity
                className="w-3/5 flex-row items-center justify-center bg-[#7A91F9] p-4 rounded-md"
                onPress={() => router.push("/profile/txDashboard")}
              >
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
              </TouchableOpacity>
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
                } px-3 py-2 rounded-md flex-row items-center mr-3`}
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
                } px-3 py-2 rounded-md  flex-row items-center mr-3`}
                onPress={() => setActiveTab("Account")}
              >
                <MaterialIcons
                  name="manage-accounts"
                  size={24}
                  color={activeTab === "Account" ? "#fff" : "#B2BBC6"}
                />
                <Text
                  className={`ml-2  font-axiformaBlack ${
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
                } px-3 py-2 rounded-md  flex-row items-center mr-3`}
                onPress={() => setActiveTab("Stories")}
              >
                <FontAwesome5
                  name="star-of-life"
                  size={20}
                  color={activeTab === "Stories" ? "#fff" : "#B2BBC6"}
                />
                <Text
                  className={`ml-2 font-axiformaBlack ${
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
                } px-3 py-2 rounded-md  flex-row items-center mr-3`}
                onPress={() => setActiveTab("Likes")}
              >
                <AntDesign
                  name="hearto"
                  size={20}
                  color={activeTab === "Likes" ? "#fff" : "#B2BBC6"}
                />
                <Text
                  className={`ml-2  font-axiformaBlack ${
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
                } px-3 py-2 rounded-md  flex-row items-center mr-3`}
                onPress={() => setActiveTab("Activities")}
              >
                <FontAwesome
                  name="bell-o"
                  size={20}
                  color={activeTab === "Activities" ? "#fff" : "#B2BBC6"}
                />
                <Text
                  className={`ml-2 font-axiformaBlack ${
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
                } px-3 py-2 rounded-md  flex-row items-center mr-3`}
                onPress={() => setActiveTab("Transactions")}
              >
                <FontAwesome5
                  name={"file-invoice-dollar"}
                  size={20}
                  color={activeTab === "Transactions" ? "#fff" : "#B2BBC6"}
                />
                <Text
                  className={`ml-2 font-axiformaBlack ${
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
                } px-3 py-2 rounded-md  flex-row items-center mr-3`}
                onPress={() => setActiveTab("Privacy")}
              >
                <Feather
                  name="lock"
                  size={20}
                  color={activeTab === "Privacy" ? "#fff" : "#B2BBC6"}
                />
                <Text
                  className={`ml-2  font-axiformaBlack ${
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
                } px-3 py-2 rounded-md  flex-row items-center mr-3`}
                onPress={() => setActiveTab("Settings")}
              >
                <Ionicons
                  name="settings"
                  size={20}
                  color={activeTab === "Settings" ? "#fff" : "#B2BBC6"}
                />
                <Text
                  className={`ml-2 font-axiformaBlack ${
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
              handleNext={(formData) => handleNext(formData)}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}

          {activeTab === "Account" && <Account />}
          {activeTab === "Activities" && <Activities />}
          {activeTab === "Privacy" && <Privacy />}
          {activeTab === "Transactions" && <Transactions />}
          {activeTab === "Settings" && <Settings />}
          {activeTab === "Stories" && <Stories />}
          {activeTab === "Likes" && <Likes />}

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
