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

const App = () => {
  const [activeSection, setActiveSection] = useState("Baddies");
  const token = useToken();
  // const [baddiesData, setBaddiesData] = useState([]);
  // const [vybersData, setVybersData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/v1/user/get-users-by-account-type/${activeSection}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        if (activeSection === "Baddies") {
          setBaddiesData(response.data.payload);
        }
        if (activeSection === "Vybers") {
          setVybersData(response.data.payload);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [activeSection]);

  // Request permissions for media library and camera
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
      // Pick an image or video
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All, // Allow images and videos
        allowsEditing: false, // Disable editing
        quality: 1, // Maximum quality
      });

      if (!result.canceled) {
        const source = { uri: result.assets[0].uri };
        console.log("Selected media: ", source);
        // You can upload the media to your server or do other actions here
      } else {
        console.log("User canceled image picker");
      }
    } catch (error) {
      console.log("Error picking media: ", error);
      Alert.alert("Error", "Something went wrong while picking the media.");
    }
  };

  const baddiesData = [
    {
      id: 1,
      name: "Olayemi",
      imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 2,
      name: "Roxy",
      imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Sayo",
      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 4,
      name: "Tayo",
      imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 5,
      name: "Bola",
      imageUrl: "https://randomuser.me/api/portraits/women/10.jpg",
    },
  ];

  const vybersData = [
    {
      id: 1,
      name: "Michael",
      imageUrl: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
      id: 2,
      name: "Sarah",
      imageUrl: "https://randomuser.me/api/portraits/women/15.jpg",
    },
    {
      id: 3,
      name: "James",
      imageUrl: "https://randomuser.me/api/portraits/men/20.jpg",
    },
    {
      id: 4,
      name: "Anna",
      imageUrl: "https://randomuser.me/api/portraits/women/25.jpg",
    },
    {
      id: 5,
      name: "John",
      imageUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    },
  ];

  const data = activeSection === "Baddies" ? baddiesData : vybersData;
  const sectionTitle =
    activeSection === "Baddies" ? "Baddie Story" : "Vybers Story";

  return (
    <SafeAreaView className="bg-white-normal h-full mt-10">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-center mt-4 mb-2">
          <TouchableOpacity
            className="w-[40%]"
            onPress={() => setActiveSection("Vybers")}
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
            onPress={() => setActiveSection("Baddies")}
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
                  onPress={handleMediaUpload} // Call the media upload function
                >
                  <View className="absolute bottom-[-4px] right-[-6px] z-10">
                    <Ionicons name="add-circle" size={22} color="#fff" />
                  </View>
                </TouchableOpacity>
                <Text className="text-white-normal text-center font-axiformaRegular text-xs mt-2">
                  Add Story
                </Text>
              </View>
              {data.map((story) => (
                <View key={story.id} className="items-center">
                  <TouchableOpacity className="rounded-full overflow-hidden w-20 h-16 border-2 border-white-normal">
                    <Image
                      source={{ uri: story.imageUrl }}
                      className="w-full h-full"
                    />
                  </TouchableOpacity>
                  <Text className="text-white-normal text-center mt-2 font-axiformaRegular text-xs">
                    {story.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        <View>
          <Image
            source={{
              uri:
                activeSection === "Baddies"
                  ? "https://images.unsplash.com/photo-1627130596911-985450bd4d63?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  : "https://images.unsplash.com/photo-1627130595904-ebeeb6540a93?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            className="w-full h-[500px]"
            resizeMode="cover"
          />

          <View className="absolute top-0 left-0 right-0 px-4 pt-4 flex-row justify-between">
            {[...Array(5)].map((_, index) => (
              <View
                key={index}
                className="w-[15%] h-[1px] bg-white-normal rounded-full"
              />
            ))}
          </View>
          <View className="flex-row items-center justify-between absolute top-[60%] w-full px-2">
            <View className="bg-[#3d4c5ee9] py-8 px-4 rounded-[24px] border border-gray-500 w-[90%] mx-auto shadow-2xl">
              <View className="flex-row gap-8 items-center mb-2">
                <Image
                  source={{
                    uri:
                      activeSection === "Baddies"
                        ? "https://images.unsplash.com/photo-1627130596911-985450bd4d63?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "
                        : "https://images.unsplash.com/photo-1627130595904-ebeeb6540a93?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  }}
                  className="w-12 h-12 object-cover rounded-full border-2 border-red-300"
                  resizeMode="cover"
                />
                <View className="flex-1">
                  <View className="flex-row gap-2">
                    <Text className="capitalize text-white-normal font-axiformaBlack text-xl">
                      {activeSection === "Baddies" ? "Bolanle" : "Yvonne"}, 25
                    </Text>
                    <MaterialIcons name="verified" size={24} color="#6DD3E1" />
                  </View>

                  <Text className="capitalize font-axiformaRegular text-white-normal text-xs">
                    {activeSection === "Baddies"
                      ? "Loves having fun and meeting new friends"
                      : " Movie Addict and  great chef."}
                  </Text>
                </View>
              </View>
              <View className="flex-row flex-wrap gap-2">
                <View className="border-2 border-[#86D8D3] rounded-full px-2 py-1 flex items-center justify-center">
                  <Text className="text-[#65A29E] capitalize font-axiformaRegular text-xs">
                    {activeSection === "Baddies" ? "Baddie" : "Vyber"}
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
                <Ionicons name="chatbubbles-sharp" size={34} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name="user-plus" size={34} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name="favorite" size={34} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
