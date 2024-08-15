import React, { useState } from "react";
import { ScrollView, Text, View, Switch } from "react-native";

const PrivacySwitch = ({ label, value, onValueChange }) => (
  <View className="border-b border-gray-200 py-4 flex-row justify-between items-center">
    <Text className="text-base font-axiformaRegular text-[#546881]">
      {label}
    </Text>
    <Switch value={value} onValueChange={onValueChange} />
  </View>
);

const PrivacySettings = () => {
  const [privacySettings, setPrivacySettings] = useState({
    chatPrivacy: true,
    profilePrivacy: true,
    videoCallPrivacy: true,
    callPrivacy: true,
    profileSearchPrivacy: false,
    myStoriesPrivacy: false,
  });

  const handleToggle = (setting) => {
    setPrivacySettings((prevSettings) => ({
      ...prevSettings,
      [setting]: !prevSettings[setting],
    }));
  };

  return (
    <>
      <Text className="text-lg font-axiformaBlack mt-8 text-[#3D4C5E]">
        Privacy Settings
      </Text>
      <ScrollView className="mt-4 bg-white px-4 py-4 rounded-md border border-[#dedee0]">
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
