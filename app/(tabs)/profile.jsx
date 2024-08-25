import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  RefreshControl,
  ImageBackground,
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
import Transactions from "../../components/profile/Transactions";

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Account");
  const [personalityTab, setPersonalityTab] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const router = useRouter();

  const handlePrevious = () => {
    if (personalityTab > 4 || personalityTab > 1)
      setPersonalityTab((prevState) => prevState - 1);
  };

  const handleNext = () => {
    if (personalityTab < 4) setPersonalityTab((prevState) => prevState + 1);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
    console.log("Profile details fetched successfully.");
  };

  // const handleStoryPress = (story) => {
  //   setSelectedStory(story);
  //   setModalVisible(true);
  // };

  const storiesData = [
    {
      id: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1540324155974-7523202daa3f?q=80&w=2815&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postedAt: "30 Minutes Ago",
    },
    {
      id: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1631947430066-48c30d57b943?q=80&w=2816&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postedAt: "1 Hours Ago",
    },
    {
      id: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1599457382197-820d65b8bbdc?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postedAt: "2 Hours Ago",
    },
    {
      id: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1561158317-757a4631770e?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postedAt: "3 Hours Ago",
    },
    {
      id: 5,
      imageUrl:
        "https://images.unsplash.com/photo-1643185539104-3622eb1f0ff6?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postedAt: "4 Hours Ago",
    },
    {
      id: 6,
      imageUrl:
        "https://images.unsplash.com/photo-1485872299829-c673f5194813?q=80&w=2054&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postedAt: "5 Hours Ago",
    },
    {
      id: 7,
      imageUrl:
        "https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postedAt: "6 Hours Ago",
    },
    {
      id: 8,
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1670740580828-9f6b0526d830?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postedAt: "7 Hours Ago",
    },
    {
      id: 9,
      imageUrl:
        "https://images.unsplash.com/photo-1562007900-a6aae8e4f07d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postedAt: "8 Hours Ago",
    },
    {
      id: 10,
      imageUrl:
        "https://images.unsplash.com/photo-1534366352488-8b7b5f205086?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postedAt: "9 Hours Ago",
    },
  ];

  return (
    <>
      <SafeAreaView className="h-full w-full">
        <ScrollView
          className="px-4 bg-gray-50"
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
            activeTab === "Privacy" ||
            activeTab === "Transactions") && (
            <View className="flex-row items-center justify-between mt-2">
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
                } px-3 py-2 rounded-sm  flex-row items-center mr-3`}
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
                } px-3 py-2 rounded-sm  flex-row items-center mr-3`}
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
                } px-3 py-2 rounded-sm  flex-row items-center mr-3`}
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
                } px-3 py-2 rounded-sm  flex-row items-center mr-3`}
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
                } px-3 py-2 rounded-sm  flex-row items-center mr-3`}
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
                } px-3 py-2 rounded-sm  flex-row items-center mr-3`}
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
              handleNext={() => handleNext()}
            />
          )}

          {activeTab === "Account" && <Account />}
          {activeTab === "Activities" && <Activities />}
          {activeTab === "Privacy" && <Privacy />}

          {activeTab === "Transactions" && <Transactions />}

          {activeTab === "Settings" && <Settings />}

          {activeTab === "Stories" && (
            <View className="flex-row flex-wrap justify-between  mt-10">
              {storiesData.map((story, index) => (
                <TouchableOpacity
                  key={story.id}
                  // onPress={() => handleStoryPress(story)}
                  className="w-[49%] mb-4"
                >
                  <Image
                    source={{ uri: story.imageUrl }}
                    className="w-full h-[240px] rounded-lg"
                    resizeMode="cover"
                  />
                  <View className="bg-[#9a41eebf] py-3 px-2 rounded-xl absolute bottom-3 text-left mx-1">
                    <Text className="text-white-normal font-axiformaBlack text-center text-[12px]">
                      Posted {story.postedAt}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {modalVisible && (
            <EditProfile
              closeModal={() => setModalVisible(false)}
              modalVisible={modalVisible}
            />
          )}
        </ScrollView>
        <StatusBar backgroundColor="#fffff" style="dark" />
      </SafeAreaView>
    </>
  );
};

export default Profile;
