import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  Switch,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useToken } from "../../../../hooks/useToken";

const PrivacySwitch = ({ label, value, onValueChange }) => (
  <View className="border-b border-gray-200 py-4 flex-row justify-between items-center">
    <Text className="text-base font-axiformaRegular text-[#546881]">
      {label}
    </Text>
    <View className="flex-row items-center">
      <Text
        className={`mr-2 text-base font-axiformaRegular ${
          value ? "text-[#3D4C5E]" : "text-[#B2BBC6]"
        }`}
      >
        {value ? "On" : "Off"}
      </Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  </View>
);

const PrivacySettings = () => {
  const [privacySettings, setPrivacySettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useToken();

  // Default settings to use if none are found
  const defaultSettings = {
    chatPrivacy: true,
    profilePrivacy: true,
    videoCallPrivacy: true,
    callPrivacy: true,
    profileSearchPrivacy: false,
    myStoriesPrivacy: false,
  };

  useEffect(() => {
    const fetchPrivacySettings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/v1/privacy-settings/get-settings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPrivacySettings(response.data.payload);
      } catch (error) {
        if (
          error.response &&
          error.response.data.message ===
            "Privacy settings not found for this user."
        ) {
          // If no settings are found, use the default settings
          setPrivacySettings(defaultSettings);
          // Optionally, initialize settings in the backend
          await initializeSettingsInBackend(defaultSettings);
        } else {
          console.error(
            "Error fetching privacy settings:",
            error.response?.data || error.message
          );
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPrivacySettings();
    }
  }, [token]);

  const initializeSettingsInBackend = async (settings) => {
    try {
      await axios.post(
        "http://localhost:8000/v1/privacy-settings/create",
        settings,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error(
        "Error initializing privacy settings:",
        error.response?.data || error.message
      );
    }
  };

  const handleToggle = async (setting) => {
    const newSettings = {
      ...privacySettings,
      [setting]: !privacySettings[setting],
    };
    setPrivacySettings(newSettings);

    try {
      await axios.put(
        "http://localhost:8000/v1/privacy-settings/update",
        newSettings,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error(
        "Error updating privacy settings:",
        error.response?.data || error.message
      );
      // Revert the change if the request fails
      setPrivacySettings((prevSettings) => ({
        ...prevSettings,
        [setting]: !prevSettings[setting],
      }));
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center mt-10">
        <ActivityIndicator size="large" color="#8BC0FE" />
      </View>
    );
  }

  if (!privacySettings) {
    return (
      <Text className="text-center text-[#3D4C5E]">
        Could not load privacy settings.
      </Text>
    );
  }

  return (
    <>
      <Text className="text-lg font-axiformaBlack mt-8 text-[#3D4C5E]">
        Privacy Settings
      </Text>
      <ScrollView className="mt-4 bg-white px-4 py-4 rounded-md border border-[#dedee0] mb-12">
        <PrivacySwitch
          label="Turn Chat Privacy"
          value={privacySettings.chatPrivacy}
          onValueChange={() => handleToggle("chatPrivacy")}
        />
        <PrivacySwitch
          label="Turn Profile Privacy"
          value={privacySettings.profilePrivacy}
          onValueChange={() => handleToggle("profilePrivacy")}
        />
        <PrivacySwitch
          label="Turn Video Call Privacy"
          value={privacySettings.videoCallPrivacy}
          onValueChange={() => handleToggle("videoCallPrivacy")}
        />
        <PrivacySwitch
          label="Turn Call Privacy"
          value={privacySettings.callPrivacy}
          onValueChange={() => handleToggle("callPrivacy")}
        />
        <PrivacySwitch
          label="Turn Profile Search Privacy"
          value={privacySettings.profileSearchPrivacy}
          onValueChange={() => handleToggle("profileSearchPrivacy")}
        />
        <PrivacySwitch
          label="Turn My Stories Privacy"
          value={privacySettings.myStoriesPrivacy}
          onValueChange={() => handleToggle("myStoriesPrivacy")}
        />
      </ScrollView>
    </>
  );
};

export default PrivacySettings;
