import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { useToken } from "../../../hooks/useToken";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import empty from "../../../assets/images/empty-box.png";
import { StatusBar } from "expo-status-bar";
import { useAccount } from "../../../hooks/useAccount";

const App = () => {
  const [activeSection, setActiveSection] = useState("Baddies");
  const token = useToken();
  const { user } = useAccount();
  const [baddiesData, setBaddiesData] = useState([]);
  const [vybersData, setVybersData] = useState([]);
  const [selectedUserStory, setSelectedUserStory] = useState(null);
  const currentYear = new Date().getFullYear();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [myContacts, setMyContact] = useState([]);

  const handlePrevStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextStory = () => {
    if (currentIndex < selectedUserStory?.stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const getCurrentContacts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/v1/contact/get-contacts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMyContact(response.data?.payload);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getCurrentContacts();
    }
  }, [selectedUserStory]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/v1/story/get-active-stories/${activeSection}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      activeSection === "Baddies"
        ? setBaddiesData(response.data.payload)
        : setVybersData(response.data.payload);

      // console.log(response.data.payload);
    } catch (error) {
      console.error(error);
      console.log(error.response.data.message);
    }
  };

  const sendFriendRequest = async () => {
    if (token) {
      try {
        const response = await axios.post(
          "http://localhost:8000/v1/contact/add-contact",
          {
            contactId: selectedUserStory?.user?._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data);
        setMyContact(response.data.payload.allContacts);
        Alert.alert("Success", response.data?.message);
        getCurrentContacts();
      } catch (error) {
        console.log(error);
        Alert.alert("Error", error?.response.data?.message);
      }
    }
  };

  const likeStory = async () => {
    const currentStory = selectedUserStory?.stories[currentIndex];

    if (currentStory.likes.includes(user?._id)) {
      await unlikeStory();
    } else {
      try {
        const response = await axios.patch(
          "http://localhost:8000/v1/story/like",
          {
            storyId: currentStory.storyId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Update the local state to reflect the new likes
        const updatedStories = [...selectedUserStory.stories];
        const updatedStory = updatedStories[currentIndex];

        // Add the user ID to the likes
        updatedStory.likes.push(user?._id);

        setSelectedUserStory({
          ...selectedUserStory,
          stories: updatedStories,
        });

        // console.log(response.data);
      } catch (error) {
        console.log(error);
        Alert.alert("Error", error?.response.data?.message);
      }
    }
  };

  const unlikeStory = async () => {
    try {
      await axios.patch(
        "http://localhost:8000/v1/story/unlike",
        {
          storyId: selectedUserStory?.stories[currentIndex]?.storyId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the local state to reflect the new likes
      const updatedStories = [...selectedUserStory.stories];
      const currentStory = updatedStories[currentIndex];

      // Remove the user ID from the likes
      currentStory.likes = currentStory.likes.filter((id) => id !== user?._id);

      setSelectedUserStory({
        ...selectedUserStory,
        stories: updatedStories,
      });

      // console.log(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error?.response.data?.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token, activeSection]);

  useEffect(() => {
    const requestPermissions = async () => {
      const mediaPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!mediaPermission.granted || !cameraPermission.granted) {
        Alert.alert(
          "Permission Required",
          "Please grant permission to access media library and camera to use the app."
        );
      }
    };

    requestPermissions();
  }, []);

  const handleMediaUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        const source = { uri: result.assets[0].uri };
        // console.log("Selected media: ", source);
        const encodedUri = encodeURIComponent(source.uri);
        router.push(`/vybes/addStory?uri=${encodedUri}`);
      } else {
        console.log("User canceled image picker");
      }
    } catch (error) {
      console.log("Error picking media: ", error);
      Alert.alert("Error", "Something went wrong while picking the media.");
    }
  };

  // const baddiesData = [
  const data = activeSection === "Baddies" ? baddiesData : vybersData;
  const sectionTitle =
    activeSection === "Baddies" ? "Baddie Story" : "Vybers Story";

  return (
    <SafeAreaView className="bg-white-normal h-full mt-10">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-center mt-4 mb-2">
          <TouchableOpacity
            className="w-[40%]"
            onPress={() => {
              setActiveSection("Vybers");
              setSelectedUserStory(null);
            }}
          >
            {activeSection === "Vybers" ? (
              <LinearGradient
                colors={["#9C27B0", "#4CAF50"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="px-4 py-3 rounded-full"
              >
                <Text className="text-white-normal font-axiformaBlack text-center text-base">
                  Vybers
                </Text>
              </LinearGradient>
            ) : (
              <View className="px-4 py-3 rounded-full border-[#D3E6E6] border">
                <Text className="text-[#344559] font-axiformaBlack text-center text-base">
                  Vybers
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[40%] ml-4"
            onPress={() => {
              setActiveSection("Baddies");
              setSelectedUserStory(null);
            }}
          >
            {activeSection === "Baddies" ? (
              <LinearGradient
                colors={["#9C27B0", "#4CAF50"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="px-4 py-3 rounded-full"
              >
                <Text className="text-white-normal font-axiformaBlack text-center text-base">
                  Baddie
                </Text>
              </LinearGradient>
            ) : (
              <View className="px-4 py-3 rounded-full border-[#D3E6E6] border">
                <Text className="text-[#344559] font-axiformaBlack text-center text-base">
                  Baddie
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {data.length === 0 ? (
          <>
            <View className="items-center justify-center absolute top-[50%] w-full z-50">
              <Image
                source={empty}
                className="w-20 h-20 my-4"
                resizeMode="contain"
              />
              <Text className="font-axiformaRegular text-[#909DAD]">
                No user story found at the moment.
              </Text>
              <TouchableOpacity
                className="bg-purple-normal px-8 py-4 rounded-full font-axiformaRegular text-white-normal mt-4"
                onPress={handleMediaUpload}
              >
                <Text className="font-axiformaBlackItalic text-white-normal">
                  Add Story
                </Text>
              </TouchableOpacity>

              <Text className="text-purple-normal font-axiformaRegular text-center w-[60%] leading-5 text-sm mt-4 z-50">
                Only stories within the last 24hrs will appear here.
              </Text>
            </View>
          </>
        ) : (
          <ScrollView
            className="bg-purple-normal px-6 py-4 mt-6"
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View>
              <Text className="text-white-normal font-axiformaRegular text-lg mb-4">
                {activeSection === "Baddies" ? "Baddie Story" : "Vybers Story"}
              </Text>

              <View className="flex-row items-center gap-4">
                <View className="items-center">
                  <TouchableOpacity
                    className="border-2 border-white-normal border-dashed w-14 h-14 rounded-full mb-2 justify-center items-center relative"
                    onPress={handleMediaUpload}
                  >
                    <View className="absolute bottom-[-4px] right-[-6px] z-10">
                      <Ionicons name="add-circle" size={22} color="#fff" />
                    </View>
                  </TouchableOpacity>
                  <Text className="text-white-normal text-center font-axiformaRegular text-xs mt-2">
                    Add Story
                  </Text>
                </View>
                {data.map((user, index) => (
                  <View key={index} className="items-center">
                    <TouchableOpacity
                      onPress={() => setSelectedUserStory(user)}
                      className="rounded-full overflow-hidden w-20 h-16 border-2 border-white-normal"
                    >
                      <Image
                        source={{ uri: user?.user?.image }}
                        className="w-full h-full"
                      />
                    </TouchableOpacity>
                    <Text className="text-white-normal text-center mt-2 font-axiformaRegular text-xs capitalize">
                      {user?.user?.userName}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        )}

        <View className="w-full h-[500px]">
          {selectedUserStory?.stories.length > 1 && (
            <View className="absolute z-10 top-[30%] left-0 right-0 flex-row items-center justify-between w-full px-4">
              <TouchableOpacity
                className="bg-purple-dark rounded-full w-8 h-8 justify-center items-center"
                onPress={handlePrevStory}
                disabled={currentIndex === 0}
              >
                <MaterialIcons
                  name="arrow-back-ios"
                  size={18}
                  color={currentIndex === 0 ? "#ccc" : "#fff"}
                  style={{
                    marginLeft: 8,
                    opacity: currentIndex === 0 ? 0.5 : 1,
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-purple-dark rounded-full w-8 h-8 justify-center items-center"
                onPress={handleNextStory}
                disabled={
                  currentIndex === selectedUserStory?.stories.length - 1
                }
              >
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={18}
                  color={
                    currentIndex === selectedUserStory?.stories.length - 1
                      ? "#ccc"
                      : "#fff"
                  }
                  style={{
                    opacity:
                      currentIndex === selectedUserStory?.stories.length - 1
                        ? 0.5
                        : 1,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}

          {selectedUserStory ? (
            selectedUserStory?.stories.length === 1 ? (
              selectedUserStory?.stories.map((story, index) => (
                <Image
                  source={{
                    uri: story?.media,
                  }}
                  className="h-full w-full"
                  resizeMode="cover"
                  key={index}
                />
              ))
            ) : (
              <Image
                source={{
                  uri: selectedUserStory?.stories[currentIndex]?.media,
                }}
                className="h-full w-full"
                resizeMode="cover"
              />
            )
          ) : (
            data.length >= 1 && (
              <View className="items-center justify-center h-[50vh]">
                <View>
                  <MaterialCommunityIcons
                    name="cursor-default-click"
                    size={30}
                    color="#7e22ce"
                  />
                </View>

                <Text className="font-axiformaRegular capitalize mt-4 text-[#3D4C5E]">
                  Please select a user to view their story.
                </Text>
              </View>
            )
          )}

          {selectedUserStory && (
            <View className="flex-row items-center justify-between absolute top-[60%] w-full px-2">
              <View className="bg-[#3d4c5ee9] py-8 px-4 rounded-[24px] border border-gray-500 w-[90%] mx-auto shadow-2xl">
                <View className="flex-row gap-8 items-center mb-2">
                  <Image
                    source={{
                      uri: selectedUserStory?.user?.image,
                    }}
                    className="w-12 h-12 object-cover rounded-full border-2 border-red-300"
                    resizeMode="cover"
                  />
                  <View className="flex-1">
                    <View className="flex-row gap-2">
                      <Text className="capitalize text-white-normal font-axiformaBlack text-xl">
                        {selectedUserStory?.user?.userName},{" "}
                        {currentYear -
                          Number(
                            selectedUserStory?.user?.dateOfBirth?.split("-")[0]
                          )}
                      </Text>
                      <MaterialIcons
                        name="verified"
                        size={24}
                        color="#6DD3E1"
                      />
                    </View>

                    <Text className="capitalize font-axiformaRegular text-white-normal text-xs">
                      {selectedUserStory?.user?.bio}
                    </Text>
                  </View>
                </View>
                <View className="flex-row flex-wrap gap-2">
                  <View className="border-2 border-[#86D8D3] rounded-full px-2 py-1 flex items-center justify-center">
                    <Text className="text-[#65A29E] capitalize font-axiformaRegular text-xs">
                      {selectedUserStory?.user?.accountType}
                    </Text>
                  </View>
                  <View className="border border-[#8BC0FE] rounded-full px-2 py-1 flex-row items-center justify-center">
                    <Text className="text-[#6F9ACB] capitalize font-axiformaRegular text-xs ml-2">
                      2 Miles Away
                    </Text>
                    <EvilIcons name="location" size={20} color="#6F9ACB" />
                  </View>
                  <View className="border-2 border-[#86D8D3] rounded-full px-2 py-1 flex items-center justify-center">
                    <Text className="text-[#65A29E] capitalize font-axiformaRegular text-xs">
                      Available
                    </Text>
                  </View>
                </View>
              </View>
              <View className="flex-col gap-6 ml-1">
                <TouchableOpacity>
                  <FontAwesome5 name="bookmark" size={30} color="#fff" />
                </TouchableOpacity>
                {!myContacts.some(
                  (contact) => contact?.contact === selectedUserStory?.user?._id
                ) && (
                  <TouchableOpacity onPress={() => sendFriendRequest()}>
                    <Feather name="user-plus" size={30} color="#fff" />
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => likeStory()}>
                  <MaterialIcons
                    name="favorite"
                    size={30}
                    color={
                      !selectedUserStory?.stories[currentIndex]?.likes.includes(
                        user?._id
                      )
                        ? "#fff"
                        : "#ff0000"
                    }
                  />
                  {selectedUserStory?.stories[currentIndex]?.likes.length >=
                    1 && (
                    <Text className="text-white-normal text-center font-axiformaBlack mt-1">
                      {selectedUserStory?.stories[currentIndex].likes.length}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#fffff" style="dark" />
    </SafeAreaView>
  );
};

export default App;
