import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Vibration,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const Settings = () => {
  const [showNotificationDropDown, setShowNotificationDropDown] =
    useState(true);
  const [showProfileDropDown, setShowProfileDropDown] = useState(true);
  const [showAboutDropDown, setShowAboutDropDown] = useState(true);
  const [showSupportDropDown, setShowSupportDropDown] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [vibrate, setVibrate] = useState(false);

  useEffect(() => {
    if (vibrate) Vibration.vibrate();
  }, [vibrate]);

  return (
    <>
      <ScrollView className="mt-6">
        <View className="bg-white rounded-lg mb-4">
          <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
            <Text className="font-axiformaBlack text-base text-[#47586E]">
              Notification Setting
            </Text>
            <AntDesign
              name="down"
              size={16}
              color="#546881"
              onPress={() =>
                setShowNotificationDropDown(!showNotificationDropDown)
              }
            />
          </View>
          {showNotificationDropDown && (
            <View className="px-4 py-3  border border-gray-200 rounded-lg mt-5 bg-white-dark">
              <View className="flex-row justify-between items-center mb-5 border-b border-gray-200 pb-3">
                <Text className="text-base text-gray-700 font-axiformaRegular">
                  Show Notification
                </Text>
                <Switch
                  value={showNotification}
                  onValueChange={() => setShowNotification(!showNotification)}
                />
              </View>
              <View className="flex-row justify-between items-center mb-5 border-b border-gray-200 pb-3">
                <Text className="text-base text-gray-700 font-axiformaRegular">
                  Vibrate
                </Text>
                <Switch
                  value={vibrate}
                  onValueChange={() => setVibrate(!vibrate)}
                  //   thumbColor={"#a241ee"}
                />
              </View>
              <View className="flex-row justify-between items-center mb-5 border-b border-gray-200 pb-3">
                <Text className="text-base text-gray-700 font-axiformaRegular">
                  Call Sound
                </Text>
                <TouchableOpacity className="flex-row items-center gap-2">
                  <Text className="text-base text-gray-400 font-axiformaRegular">
                    Tequila
                  </Text>
                  <AntDesign name="right" size={16} color="#B2BBC6" />
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-base text-gray-700 font-axiformaRegular">
                  Chat Sound
                </Text>
                <TouchableOpacity className="flex-row items-center gap-2">
                  <Text className="text-base text-gray-400 font-axiformaRegular">
                    Tequila
                  </Text>
                  <AntDesign name="right" size={16} color="#B2BBC6" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <View className="bg-white rounded-lg mb-4">
          <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
            <Text className="font-axiformaBlack text-base text-[#47586E]">
              Profile Setting
            </Text>
            <AntDesign
              name="down"
              size={16}
              color="#546881"
              onPress={() => setShowProfileDropDown(!showProfileDropDown)}
            />
          </View>
          {showProfileDropDown && (
            <View className="px-4 py-3  border border-gray-200 rounded-lg mt-5 bg-white-dark">
              <View className="flex-row justify-between items-center mb-5 border-b border-gray-200 pb-3">
                <Text className="text-base text-gray-700 font-axiformaRegular">
                  Profile Privacy
                </Text>
                <TouchableOpacity className="flex-row items-center gap-2">
                  <AntDesign name="right" size={16} color="#B2BBC6" />
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-between items-center mb-5 border-b border-gray-200 pb-3">
                <Text className="text-base text-gray-700 font-axiformaRegular">
                  App Language
                </Text>
                <TouchableOpacity className="flex-row items-center gap-2">
                  <AntDesign name="right" size={16} color="#B2BBC6" />
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-between items-center mb-5 border-b border-gray-200 pb-3">
                <Text className="text-base text-gray-700 font-axiformaRegular">
                  Availability Settings
                </Text>
                <TouchableOpacity className="flex-row items-center gap-2">
                  <AntDesign name="right" size={16} color="#B2BBC6" />
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-base text-gray-700 font-axiformaRegular">
                  Two Step Verification
                </Text>
                <TouchableOpacity className="flex-row items-center gap-2">
                  <AntDesign name="right" size={16} color="#B2BBC6" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <View className="bg-white rounded-lg  mb-4">
          <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
            <Text className="font-axiformaBlack text-base text-[#47586E]">
              About Vybes & Date
            </Text>
            <AntDesign
              name="down"
              size={16}
              color="#546881"
              onPress={() => setShowAboutDropDown(!showAboutDropDown)}
            />
          </View>
          {showAboutDropDown && (
            <View className="px-4 py-3  border border-gray-200 rounded-lg mt-5 bg-white-dark">
              <View className="flex-row justify-between items-center mb-5 border-b border-gray-200 pb-3">
                <Text className="text-base text-gray-700 font-axiformaRegular">
                  Privacy Policy
                </Text>
                <TouchableOpacity className="flex-row items-center gap-2">
                  <AntDesign name="right" size={16} color="#B2BBC6" />
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-between items-center mb-5">
                <Text className="text-base text-gray-700 font-axiformaRegular">
                  Terms of Service
                </Text>
                <TouchableOpacity className="flex-row items-center gap-2">
                  <AntDesign name="right" size={16} color="#B2BBC6" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <View className="bg-white rounded-lg mb-4">
          <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
            <Text className="font-axiformaBlack text-base text-[#47586E]">
              Vybes & Date Support
            </Text>
            <AntDesign
              name="down"
              size={16}
              color="#546881"
              onPress={() => setShowSupportDropDown(!showSupportDropDown)}
            />
          </View>
          {showSupportDropDown && (
            <View className="px-4 py-3  border border-gray-200 rounded-lg mt-5 bg-white-dark">
              <View className="flex-row justify-between items-center mb-5 border-b border-gray-200 pb-3">
                <Text className="text-base text-gray-700 font-axiformaRegular">
                  Report a Problem
                </Text>
                <TouchableOpacity className="flex-row items-center gap-2">
                  <AntDesign name="right" size={16} color="#B2BBC6" />
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-between items-center mb-5 border-b border-gray-200 pb-3">
                <Text className="text-base text-gray-700 font-axiformaRegular">
                  Help Center
                </Text>
                <TouchableOpacity className="flex-row items-center gap-2">
                  <AntDesign name="right" size={16} color="#B2BBC6" />
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-between items-center mb-5">
                <Text className="text-base text-gray-700 font-axiformaRegular">
                  Frequently Asked Questions
                </Text>
                <TouchableOpacity className="flex-row items-center gap-2">
                  <AntDesign name="right" size={16} color="#B2BBC6" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <View className="flex-row justify-between mt-4 ">
          <TouchableOpacity className="flex-1 items-center py-3 mr-2 border border-[#E4D7F5] rounded-lg">
            <Text className="text-[#C4B1F3] font-axiformaRegular">Log Out</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 items-center py-3 ml-2 border border-[#FFDBDB] rounded-lg">
            <Text className="text-[#FF7474] font-axiformaRegular">
              Switch Accounts
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default Settings;
