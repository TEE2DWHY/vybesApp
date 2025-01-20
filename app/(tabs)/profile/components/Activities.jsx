import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import axios from "axios";
import { useToken } from "../../../../hooks/useToken";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ActivitiesModal from "../../../../modal/ActivitiesModal";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
const Activities = () => {
  const token = useToken();
  const [activities, setActivities] = useState([]);
  const [showActivitiesModal, setShowActivitiesModal] = useState(false);
  const [filterType, setFilterType] = useState("");

  // Fetch all notifications
  useEffect(() => {
    const fetchAllNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/v1/notification/notifications`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setActivities(response.data?.payload || []);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      fetchAllNotifications();
    }
  }, [token]);

  // Fetch recent notifications based on filter type
  useEffect(() => {
    const fetchRecentNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/v1/notification/recent-notifications`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { type: filterType },
          }
        );
        setActivities(response.data?.payload || []);
      } catch (error) {
        console.log(error);
      }
    };
    if (token && filterType) {
      fetchRecentNotifications();
    }
  }, [filterType, token]); // Add filterType and token as dependencies

  // Handle filter type selection from the modal
  const handleSelectType = (type) => {
    setFilterType(type); // Set the selected filter type
    setShowActivitiesModal(false); // Close the modal after selection
  };

  return (
    <ScrollView className="mt-8 mb-14">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-base font-axiformaMedium text-[#2E3E5C]">
          Recent Activities
        </Text>
        <TouchableOpacity
          onPress={() => setShowActivitiesModal(!showActivitiesModal)}
          className="bg-[#F3F9FF] rounded-md p-1"
        >
          <Feather
            name="sliders"
            size={20}
            style={{
              color: "#8BC0FE",
            }}
          />
        </TouchableOpacity>
      </View>

      {/* Activities Modal */}
      {showActivitiesModal && (
        <ActivitiesModal onSelectType={handleSelectType} />
      )}

      {/* Display Activities */}
      <ScrollView
        className={`border border-[#dedee0] rounded-lg  ${
          Platform.OS === "ios" ? "h-[280px]" : "h-[300px]"
        } overflow-y-scroll bg-white-light`}
        showsVerticalScrollIndicator={false}
      >
        {Array.isArray(activities) && activities.length === 0 ? (
          <View className="items-center justify-center h-[250px]">
            <Feather name="activity" size={24} color="purple" />
            <Text className="text-center text-gray-500 py-4 capitalize font-axiformaMedium">
              {filterType
                ? `No activities found yet for ${filterType}.`
                : `No activities found yet.`}
            </Text>
          </View>
        ) : (
          activities.map((activity) => (
            <View
              key={activity._id}
              className="flex-row items-center px-3 py-4 bg-white rounded-lg border-b border-gray-300"
            >
              <View className="flex justify-center items-center bg-purple-normal h-8 w-8 rounded-full mr-3">
                {activity.type === "friendRequest" ? (
                  <AntDesign name="plus" size={16} color="#fff" />
                ) : activity.type === "transaction" ? (
                  <FontAwesome name="send-o" size={16} color="#fff" />
                ) : (
                  ""
                )}
              </View>
              <View className="flex-1">
                <View className="flex-row gap-4">
                  <Text className="text-sm text-[#2E3E5C] font-axiformaMedium">
                    {activity.title}
                  </Text>
                  {activity.type && (
                    <Text
                      className={`capitalize rounded-md ${
                        activity.type === "Baddie"
                          ? "text-sm font-axiformaRegular bg-[#D9F3F1] px-1 text-[#6BADA9]"
                          : "text-sm font-axiformaRegular bg-[#DBEBFF] px-1 text-[#6F9ACB]"
                      }`}
                    >
                      {activity.type === "friendRequest"
                        ? "Friend Request"
                        : activity.type}
                    </Text>
                  )}
                </View>

                <Text className="text-xs font-axiformaRegular text-[#546881] mt-3 capitalize">
                  {activity.activity || activity.message}
                </Text>
              </View>

              <View className="flex-row items-center">
                {/* Icons based on activity type */}
                {activity.iconType === "Fontisto" && (
                  <Fontisto name={activity.icon} size={20} color="#FFB053" />
                )}
                {activity.iconType === "MaterialCommunityIcons" && (
                  <MaterialCommunityIcons
                    name={activity.icon}
                    size={20}
                    color="#BF843E"
                  />
                )}
                {activity.iconType === "Entypo" && (
                  <Entypo name={activity.icon} size={20} color="#FF9574" />
                )}
                {activity.iconType === "FontAwesome5" && (
                  <FontAwesome5
                    name={activity.icon}
                    size={20}
                    color="#9941EE"
                  />
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default Activities;
