import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { StatusBar } from "expo-status-bar";
import notificationImage from "../../../assets/images/notification.png";
import { useToken } from "../../../hooks/useToken";
import axios from "axios";
import { router } from "expo-router";
import { Spinner } from "../../../components/Spinner";

const Notification = () => {
  const token = useToken();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const hasFetchedNotifications = useRef(false);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:8000/v1/notification/notifications",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { page: 1, limit: 10 },
        }
      );
      // console.log(response.data);
      setNotifications(response.data.payload || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch notifications. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const markNotificationsAsRead = async (notificationId) => {
    try {
      await axios.patch(
        `http://localhost:8000/v1/notification/notifications/${notificationId}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (err) {
      console.log(err);
      console.log("Error marking notification as read:", err.response?.data);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  };

  useEffect(() => {
    if (token && !hasFetchedNotifications.current) {
      fetchNotifications();
      hasFetchedNotifications.current = true;
    }
  }, [token]);

  return (
    <SafeAreaView className="h-full bg-white">
      <View className="flex-row items-center justify-between px-4 py-4 mt-6">
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="arrow-left-top-bold"
            size={24}
            color="#546881"
            onPress={() => router.back()}
          />
        </TouchableOpacity>
        <Text className="font-axiformaBlack text-xl">Notifications</Text>
        <TouchableOpacity>
          <Feather name="settings" size={24} color="#546881" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading && (
          <View className="flex-1 items-center justify-center min-h-[70vh]">
            <Spinner />
            {/* <ActivityIndicator size="large" color="#6C63FF" /> */}
          </View>
        )}

        {error && !loading && (
          <View className="items-center justify-center min-h-[70vh]">
            <Text className="text-red-600 text-center mt-2 font-axiformaRegular leading-4 mb-2">
              {error}
            </Text>
          </View>
        )}

        {!loading && notifications.length > 0 && !error && (
          <View>
            <Text className="text-gray-600 font-axiformaBlack text-sm my-4">
              Recent Notifications
            </Text>
            {notifications.map((notification) => (
              <TouchableOpacity
                key={notification._id}
                className="flex-row items-center justify-between bg-white-normal mb-4 p-4 rounded-lg shadow-sm"
                onPress={() => {
                  if (!notification.isRead) {
                    markNotificationsAsRead(notification._id);
                  }
                  if (notification.link) {
                    router.push(notification.link);
                  }
                }}
              >
                <View className="flex-1">
                  <View className="flex-row items-center space-x-2">
                    <View className="bg-pink-200 w-8 h-8 flex items-center justify-center rounded-full">
                      <Text className="font-axiformaBlack text-lg text-pink-700 text-center">
                        {notification.title[0]}{" "}
                      </Text>
                    </View>
                    <Text className="font-axiformaRegular text-sm text-gray-900 truncate capitalize">
                      {notification.title}
                    </Text>
                  </View>
                  <Text className="text-gray-600 mt-1 text-sm leading-5 font-axiformaRegular capitalize">
                    {notification.message}
                  </Text>
                </View>

                <View className="ml-4 items-end">
                  <Text className="text-gray-400 text-xs font-axiformaRegular">
                    {new Date(notification.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </Text>
                  {!notification.isRead && (
                    <View className="bg-purple-500 w-3 h-3 rounded-full mt-2" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {!loading && notifications.length === 0 && !error && (
          <View className="items-center justify-center min-h-[70vh]">
            <Image
              source={notificationImage}
              className="w-[120px] h-[120px]"
              resizeMode="contain"
            />
            <Text className="font-axiformaBlack text-xl capitalize">
              No notifications yet
            </Text>
            <Text className="text-purple-normal text-center mt-2 font-axiformaRegular leading-4 mb-2">
              Your notifications will appear here once you’ve received them.
            </Text>
          </View>
        )}
      </ScrollView>
      <StatusBar backgroundColor="#ffffff" style="dark" />
    </SafeAreaView>
  );
};

export default Notification;
