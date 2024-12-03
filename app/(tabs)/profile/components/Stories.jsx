import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { useAccount } from "../../../../hooks/useAccount";
import { router } from "expo-router";
import axios from "axios";
import { useToken } from "../../../../hooks/useToken";
import { formatDistanceToNow } from "date-fns";
import { Spinner } from "../../../../components/Spinner";

const Stories = () => {
  const token = useToken();
  const { user } = useAccount();
  const [storiesData, setStoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch stories function
  const getAllStories = async () => {
    try {
      if (!token) return;
      const response = await axios.get("http://localhost:8000/v1/story/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStoriesData(response.data.payload || []);
      setMessage(response.data?.message || "Stories fetched successfully");
    } catch (error) {
      console.error("Error fetching stories:", error);
      setMessage("Error fetching stories. Please try again.");
    } finally {
      setLoading(false); // Stop loading after fetch completes
      setRefreshing(false); // Stop refreshing after data is fetched
    }
  };

  // Initial data fetch and refresh
  useEffect(() => {
    getAllStories();
  }, [token]);

  const onRefresh = () => {
    setRefreshing(true); // Start the refresh
    getAllStories(); // Fetch the latest data
  };

  const formatPostedTime = (createdAt) => {
    try {
      return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
    } catch (error) {
      console.error("Error formatting date:", error.message);
      return "Unknown time";
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* User Info */}
      <View className="items-center justify-center mt-10">
        <Text className="capitalize font-axiformaBlack text-xl mb-4 bg-white-normal p-1 text-[#1D242D]">
          {user?.fullName}
        </Text>
        <Image
          source={{
            uri: user?.image,
          }}
          className="w-[150px] h-[150px] rounded-full border border-[#7A91F9]"
        />
      </View>

      {/* Section Title */}
      <View className="mt-8 flex-row justify-between items-center">
        <Text className="font-axiformaBlack text-[#3D4C5E] text-lg">
          My Stories
        </Text>
        <Feather name="settings" size={24} color="#909DAD" />
      </View>

      {/* Stories */}
      <View className="flex-row flex-wrap justify-between mt-6 border border-[#E9E9EB] rounded-lg p-3 mb-12">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <Spinner />
          </View>
        ) : message !== "No stories available" ? (
          // If stories data exists, display them
          storiesData.map((story) => (
            <TouchableOpacity
              key={story._id}
              onPress={() => router.push(`/profile/story/${story._id}`)}
              className="w-[49%] mb-4"
            >
              <Image
                source={{ uri: story.media }}
                className="w-full h-[240px] rounded-md"
                resizeMode="cover"
              />
              <View className="bg-[#9a41eea6] py-3 px-2 rounded-xl absolute bottom-3 text-left mx-1">
                <Text className="text-white-normal font-axiformaBlack text-center text-[11px]">
                  Posted {formatPostedTime(story.createdAt)}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          // If there are no stories after loading, show this message
          <Text className="text-gray-500 text-center w-full mt-4 font-axiformaRegular">
            No stories available.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Stories;
