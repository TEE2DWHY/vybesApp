import { router, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import axios from "axios";
import { useToken } from "../../../../hooks/useToken";

const AddStory = () => {
  const { uri } = useLocalSearchParams();
  const decodedUri = decodeURIComponent(uri);
  const [caption, setCaption] = useState("");
  const [whoCanView, setWhOCanView] = useState(false);
  const [viewer, setViewer] = useState("");
  const [isStorySent, setIsStorySent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mediaType, setMediaType] = useState("");
  const token = useToken();

  // Determine the media type (image/video)
  const getMediaType = (uri) => {
    const extension = uri.split(".").pop();
    if (["jpg", "jpeg", "png", "gif"].includes(extension.toLowerCase())) {
      setMediaType("image");
    } else if (["mp4", "mov", "avi"].includes(extension.toLowerCase())) {
      setMediaType("video");
    } else {
      setMediaType("unknown");
    }
  };

  useEffect(() => {
    getMediaType(decodedUri);
  }, [decodedUri]);

  const handleSend = async () => {
    if (caption === "") {
      return Alert.alert("Error", "Please provide story caption");
    }
    if (mediaType === "unknown") {
      return Alert.alert("Error", "Unsupported media type");
    }

    setIsStorySent(true);
    setIsLoading(true);

    try {
      const fileUri = decodedUri;

      // Prepare the form data for the backend upload
      const formData = new FormData();
      formData.append("media", {
        uri: fileUri,
        type: mediaType === "image" ? "image/jpeg" : "video/mp4",
        name: `story-media.${mediaType === "image" ? "jpg" : "mp4"}`,
      });
      formData.append("caption", caption);
      formData.append("mediaType", mediaType);
      formData.append("viewer", viewer);

      // Upload the data to the backend (using axios)
      const response = await axios.post(
        "https://vybesapi.onrender.com/v1/story/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("Story uploaded successfully:", response.data);
      setIsLoading(false);
      setIsStorySent(true);

      // Go back to the previous screen after a delay
      setTimeout(() => {
        setIsLoading(false);
        router.back(); // Use the router to navigate back
      }, 2500);
    } catch (error) {
      console.error(
        "Error uploading story:",
        error.response?.data?.message || error.message
      );
      setIsLoading(false);
      Alert.alert("Error", "Failed to upload story");
    } finally {
      setIsLoading(false);
    }
  };

  const icons = [
    {
      icon: <Ionicons name="videocam" size={24} color="#546881" />,
      text: "video",
    },
    {
      icon: <Ionicons name="musical-notes-sharp" size={24} color="#546881" />,
      text: "music",
    },
    {
      icon: (
        <MaterialCommunityIcons name="text-shadow" size={24} color="#546881" />
      ),
      text: "text",
    },
    {
      icon: <FontAwesome5 name="images" size={24} color="#546881" />,
      text: "photo",
    },
  ];

  return (
    <SafeAreaView className="h-full">
      <View className="relative">
        {isStorySent && (
          <View className="z-40 absolute w-full h-full bg-[#1b1b1b60]  items-center justify-center">
            <View className="bg-white-normal rounded-lg justify-center items-center flex-row gap-2 p-2">
              {!isLoading && (
                <View className="w-6 h-6 rounded-full items-center justify-center bg-purple-normal border-none z-50">
                  <MaterialIcons name="done" size={20} color="#fff" />
                </View>
              )}
              <Text className="text-[#47586E] font-axiformaBlack capitalize">
                {isLoading ? "sending..." : "story sent successfully"}
              </Text>
            </View>
          </View>
        )}
        <View className="mt-6 absolute z-10 ml-4">
          <AntDesign
            name="left"
            size={24}
            color="#fff"
            onPress={() => router.back()}
          />
        </View>
        <View className="absolute top-[30%] right-4 z-10">
          {icons.map((icon, index) => (
            <View className="mb-6" key={index}>
              <View className="bg-white-normal p-1 items-center justify-center rounded-md">
                {icon.icon}
              </View>
              <Text className="font-axiformaRegular text-[10px] mt-2 ml-1 text-white-normal capitalize">
                {icon.text}
              </Text>
            </View>
          ))}
        </View>
        <Image
          source={{
            uri: decodedUri,
          }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute bottom-6 justify-center items-center w-full">
          <MaterialIcons
            name="keyboard-arrow-up"
            size={34}
            color="#fff"
            onPress={() => setWhOCanView(true)}
          />
          <Text className="capitalize font-axiformaRegular text-white-normal z-10 bg-transparent my-2">
            who can see my stories
          </Text>
          <View className="w-[95%] bg-white-normal rounded-lg p-3 mt-2 flex-row items-center justify-between shadow-sm">
            <TextInput
              placeholder="A Caption Makes Your Post Get Well Noticed"
              className="font-axiformaRegular text-sm"
              placeholderTextColor="#909DAD"
              value={caption}
              onChangeText={setCaption}
            />
            <MaterialCommunityIcons
              name="send-outline"
              size={24}
              color="#9941EE"
              onPress={handleSend}
            />
          </View>
        </View>
        {whoCanView && (
          <>
            <TouchableOpacity
              onPress={() => setWhOCanView(false)}
              className="absolute w-full h-full bg-[#1b1b1b60] opacity-20"
            />
            <View className="absolute bottom-0 w-full h-fit bg-[#FCFDFD] p-4 rounded-tr-[40px] rounded-tl-[40px] z-20 border-b border-[#DEEDFF] shadow-md">
              <Text className="font-axiformaBlack mt-4">
                Who Can See My Stories
              </Text>

              {[
                { label: "Only Vybers", value: "vyber" },
                { label: "Only Baddie", value: "baddie" },
                { label: "Only Subscribers", value: "subscribers" },
                { label: "All Vybers and Baddies", value: "vybersAndBaddie" },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => setViewer(option.value)}
                  className="flex-row items-center justify-between mt-6 border-b border-b-[#DEEDFF] pb-2"
                >
                  <Text className="font-axiformaRegular text-[#546881]">
                    {option.label}
                  </Text>
                  <View
                    className={`w-6 h-6 rounded-full items-center justify-center ${
                      viewer === option.value
                        ? "bg-purple-normal border-none"
                        : "border-2 border-[#B2BBC6]"
                    }`}
                  >
                    {viewer === option.value && (
                      <MaterialIcons name="done" size={16} color="#fff" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </View>

      <StatusBar style="dark" backgroundColor="#fffff" />
    </SafeAreaView>
  );
};

export default AddStory;
