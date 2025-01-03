import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef } from "react";
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
import { userInstance } from "../../../config/axios";
import { useToken } from "../../../hooks/useToken";
import { useAccount } from "../../../hooks/useAccount";
import Entypo from "@expo/vector-icons/Entypo";
import axios from "axios";
import Bookmarks from "./components/Bookmarks";

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Account");
  const [personalityTab, setPersonalityTab] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = useToken();
  const router = useRouter();
  const { user, setUser } = useAccount();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    userName: user?.userName || "",
    bio: user?.bio || "",
    accountType: user?.accountType || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    location: user?.location || "",
    image: user?.image || "",
    dateOfBirth: user?.dateOfBirth || "",
    availabilityStatus: user?.availabilityStatus || "",
    gender: user?.gender || "",
    height: user?.height || "",
    weight: user?.weight || "",
    premiumRate: user?.premiumRate || "",
  });

  // ScrollView reference
  const scrollViewRef = useRef(null);
  const tabRefs = useRef({});

  const handlePrevious = () => {
    if (personalityTab > 1) {
      setPersonalityTab((prevState) => prevState - 1);
    }
  };

  const handleNext = async () => {
    if (personalityTab < 4) {
      setPersonalityTab((prevState) => prevState + 1);
    } else {
      setIsLoading(true);
      try {
        const dataToSend = new FormData();
        for (const key in formData) {
          if (key === "image") {
            const fileData = {
              uri: formData.image,
              name: "profile.jpg",
              type: "image/jpeg",
            };
            dataToSend.append("image", fileData);
          } else {
            dataToSend.append(key, formData[key]);
          }
        }

        const response = await axios.patch(
          "https://vybesapi.onrender.com/v1/user/update-details",
          dataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        Alert.alert("Success", response?.data.message);
        setUser(response.data.payload.user);
      } catch (error) {
        console.log("error", error.response.data.message);
        Alert.alert("Error", "An error occurred with user update.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const userRoute = userInstance(token);
          const response = await userRoute.get("/get-user");
          setUser(response.data.payload.user);
          setFormData((prevData) => ({
            ...prevData,
            ...response.data.payload.user,
            dateOfBirth: response.data.payload.user?.dateOfBirth || "",
          }));
        }
      } catch (error) {
        console.log(error || error.message);
      }
    };
    fetchUser();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
    console.log("Profile details fetched successfully.");
  };

  const scrollToTab = (tabName) => {
    const tabRef = tabRefs.current[tabName];
    if (tabRef) {
      tabRef.measureLayout(
        scrollViewRef.current.getScrollResponder().getInnerViewNode(),
        (x, y) => {
          scrollViewRef.current.scrollTo({ y, animated: true });
        }
      );
    }
  };

  return (
    <>
      <SafeAreaView className="h-full w-full mt-10">
        <ScrollView
          ref={scrollViewRef}
          className="px-4"
          refreshControl={
            (activeTab === "Account" ||
              activeTab === "Activities" ||
              activeTab === "Transactions") && (
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            )
          }
          focusable
        >
          {activeTab === "Personality" && (
            <View className="flex-row justify-between w-full items-center px-2 mt-3">
              <TouchableOpacity onPress={handlePrevious}>
                <AntDesign name="left" size={24} style={{ color: "#B2BBC6" }} />
              </TouchableOpacity>
              <View className="bg-[#D6DDFD] w-3/5 py-2 rounded-lg">
                <Text className="text-center text-lg text-[#6E83E0] font-axiformaBlack">
                  Step {personalityTab}/4
                </Text>
              </View>
              <AntDesign
                name="right"
                size={24}
                style={{ color: "#B2BBC6" }}
                disabled={personalityTab === 4}
                onPress={() => handleNext()}
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
                onPress={() => router.back()}
              />
              <TouchableOpacity
                className="w-3/5 flex-row items-center justify-center bg-[#7A91F9] p-3 rounded-md"
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
                  {user?.walletBalance} Vybes Coin
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
                  activeTab === "Bookmarks"
                    ? "bg-purple-normal border-none"
                    : "border-gray-400 border"
                } px-3 py-2 rounded-md  flex-row items-center mr-3`}
                onPress={() => setActiveTab("Bookmarks")}
              >
                <Entypo
                  name="bookmark"
                  size={20}
                  color={activeTab === "Bookmarks" ? "#fff" : "#B2BBC6"}
                />
                <Text
                  className={`ml-2  font-axiformaBlack ${
                    activeTab === "Bookmarks"
                      ? "text-white-normal"
                      : "text-[#B2BBC6]"
                  }`}
                >
                  Bookmarks
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
              handleNext={handleNext}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {activeTab === "Account" && <Account />}
          {activeTab === "Activities" && <Activities />}
          {activeTab === "Privacy" && <Privacy />}
          {activeTab === "Transactions" && <Transactions />}
          {activeTab === "Settings" && <Settings />}
          {activeTab === "Stories" && <Stories />}
          {activeTab === "Bookmarks" && <Bookmarks />}

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
