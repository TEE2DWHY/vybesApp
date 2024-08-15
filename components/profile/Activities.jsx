import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ActivitiesModal from "../../modal/ActivitiesModal";

const activities = [
  {
    id: 1,
    username: "Anita_jay1",
    type: "Vyber",
    activity: "wants to be friends with you",
    icon: "bell-alt",
    iconType: "Fontisto",
    profileImage: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    username: "Ade12",
    type: "Baddie",
    activity: "wants you to grant access to view your stories and profile",
    icon: "diamond-stone",
    iconType: "MaterialCommunityIcons",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    username: "Jayden1245",
    type: "Vyber",
    activity: "liked your story",
    icon: "heart",
    iconType: "Entypo",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 4,
    username: "Demi_lade",
    type: "Vyber",
    activity: "checked some of your stories",
    icon: "bell-alt",
    iconType: "Fontisto",
    profileImage: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 5,
    username: "Phil_elr",
    type: "Baddie",
    activity: "sent you some images",
    icon: "image",
    iconType: "MaterialIcons",
    profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 6,
    username: "Pelum_567",
    type: "Vyber",
    activity: "sent some coins to your wallet",
    icon: "coins",
    iconType: "FontAwesome5",
    profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 7,
    username: "Confirmed Transaction",
    activity: "You received 450 vybe coin from @pelumi_567",
    icon: "coins",
    iconType: "FontAwesome5",
    profileImage: "https://randomuser.me/api/portraits/lego/1.jpg",
  },
];

const Activities = () => {
  const [showActivitiesModal, setShowActivitiesModal] = useState(false);
  return (
    <ScrollView className="mt-8">
      <View className="flex-row justify-between item-center mb-4">
        <Text className="text-lg font-axiformaBlack text-[#2E3E5C]">
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

      <ScrollView
        className="border border-[#dedee0] rounded-md  h-[454px] overflow-y-scroll"
        showsVerticalScrollIndicator={false}
      >
        {showActivitiesModal && <ActivitiesModal />}
        {activities.map((activity) => (
          <View
            key={activity.id}
            className="flex-row items-center mb-4 px-3 py-4 bg-white rounded-lg"
          >
            <Image
              source={{ uri: activity.profileImage }}
              className="h-12 w-12 rounded-full mr-3"
            />
            <View className="flex-1">
              <View className="flex-row gap-4">
                <Text className="text-sm font-axiformaBlack text-[#2E3E5C]">
                  {activity.username}
                </Text>
                {activity.type && (
                  <Text
                    className={`${
                      activity.type === "Baddie"
                        ? "text-sm font-axiformaRegular bg-[#D9F3F1] px-1 text-[#6BADA9]"
                        : "text-sm font-axiformaRegular bg-[#DBEBFF] px-1 text-[#6F9ACB]"
                    }`}
                  >
                    {activity.type}
                  </Text>
                )}
              </View>

              <Text className="text-xs font-axiformaLight text-[#546881] mt-3 capitalize">
                {activity.activity}
              </Text>
            </View>

            <View className="flex-row items-center">
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

              {activity.iconType === "MaterialIcons" && (
                <MaterialIcons name={activity.icon} size={20} color="#7095BF" />
              )}

              {activity.iconType === "FontAwesome5" && (
                <FontAwesome5 name={activity.icon} size={20} color="#9941EE" />
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default Activities;
