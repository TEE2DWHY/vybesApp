import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import ticketFour from "../../../../assets/images/ticket-4.png";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import ShareModal from "../components/modal/ShareModal";

const Event = () => {
  const [selectedTicket, setSelectedTicket] = useState("Regular");
  const { id } = useLocalSearchParams();
  // console.log(id);
  const [showModal, setShowModal] = useState(false);
  const slideAnim = useState(new Animated.Value(300))[0]; // Initial position for the modal (off-screen)

  // Function to handle the modal appearance with a slide-up animation
  const toggleModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      // Slide up when opening the modal
      Animated.timing(slideAnim, {
        toValue: 0, // The animation moves slideAnim from 300 (off-screen) to 0 (fully on-screen). This brings the modal into view.
        duration: 300, // The animation takes 300 milliseconds.
        useNativeDriver: true, // This optimizes the animation by running it on the native thread for better performance.
      }).start();
    } else {
      // Slide down when closing the modal
      Animated.timing(slideAnim, {
        toValue: 300, // The modal slides from position 0 (on-screen) to 300 (off-screen). This hides the modal from view.
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  // so the modal will "slide up" from 300 pixels below the screen into view (position 0).

  return (
    <SafeAreaView className="mt-10">
      <ScrollView>
        {/* Header Section */}
        <View className="flex-row items-center justify-between mb-8">
          <View className="flex-row items-center gap-4 px-4">
            <AntDesign
              name="left"
              size={24}
              color="#546881"
              onPress={() => router.push("/ticket")}
            />
            <Text className="text-base font-axiformaRegular text-[#344559]">
              Ticket Details
            </Text>
          </View>
          <View className="flex-row gap-4 px-4">
            <Feather name="search" size={24} color="#7A91F9" />
            <AntDesign
              name="sharealt"
              size={24}
              color="#7A91F9"
              onPress={toggleModal} // Toggle modal visibility on click
            />
          </View>
        </View>

        {/* Event Image */}
        <View className="relative w-[90%] h-[280px] self-center mb-4">
          <TouchableOpacity
            className="absolute left-[-15px] z-50 top-[50%]  bg-[#7A91F9] rounded-full p-2"
            onPress={() => console.log("Scroll Left")}
          >
            <AntDesign name="left" size={16} color="#fff" />
          </TouchableOpacity>
          <Image
            source={ticketFour}
            resizeMode="cover"
            className="w-full h-full rounded-xl"
          />
          <TouchableOpacity
            className="absolute right-[-15px] z-50 top-[50%]  bg-[#7A91F9] rounded-full p-2"
            onPress={() => console.log("Scroll Right")}
          >
            <AntDesign name="right" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Event Description */}
        <Text className="capitalize font-axiformaRegular text-[#3D4C5E] w-[90%] leading-7 px-6">
          shadde eniola is hosting her birthday party and want the masses to
          celebrate with her
        </Text>

        {/* Event Location */}
        <View className="flex-row gap-2 px-6 mt-2 w-4/5">
          <EvilIcons name="location" size={22} color="#7A91F9" />
          <Text className="capitalize text-[#495795] font-axiformaRegular leading-5">
            club room 14, oke-mosan, Abeokuta Ogun state
          </Text>
        </View>

        {/* Available Tickets Section */}
        <View className="mt-6 px-6 bg-white-normal w-[90%] rounded-md self-center p-4">
          <Text className="font-axiformaRegular text-[#3D4C5E] text-lg mb-4">
            Available Ticket
          </Text>

          <View className="flex-row justify-between mb-4 border-b border-[#E9E9EB] pb-2">
            <Text className="font-axiformaRegular text-[#3D4C5E]">Regular</Text>
            <Text className="font-axiformaRegular text-[#3D4C5E]">100/120</Text>
          </View>

          <View className="flex-row justify-between mb-4 border-b border-[#E9E9EB] pb-2">
            <Text className="font-axiformaRegular text-[#47586E]">Vip</Text>
            <Text className="font-axiformaRegular text-[#47586E]">100/120</Text>
          </View>

          <View className="flex-row justify-between mb-4 border-b border-[#E9E9EB] pb-2">
            <Text className="font-axiformaRegular text-[#47586E]">Vvip</Text>
            <Text className="font-axiformaRegular text-[#47586E]">100/120</Text>
          </View>
        </View>

        {/* Featured Artist Section */}
        <View className="mt-6 px-6 bg-white-normal w-[90%] rounded-md self-center p-4">
          <Text className="font-axiformaRegular text-[#3D4C5E] text-lg mb-4">
            Featured Artist
          </Text>
          <View className="flex-row gap-4">
            <View className="border rounded-lg px-4 py-2 border-[#E5E7EB]">
              <Text className="font-axiformaRegular text-[#3D4C5E]">
                DJ Premium
              </Text>
            </View>
            <View className="border rounded-lg px-4 py-2 border-[#E5E7EB]">
              <Text className="font-axiformaRegular text-[#3D4C5E]">
                DJ Party
              </Text>
            </View>
          </View>
          <Text className="font-axiformaRegular text-[#47586E] text-lg mt-6 mb-4">
            Select Your Preferred Type Of Ticket
          </Text>

          <View className="flex-row justify-between mb-4">
            <TouchableOpacity
              onPress={() => setSelectedTicket("Regular")}
              className={`px-4 py-4 rounded-lg  ${
                selectedTicket === "Regular" ? "bg-[#3C615F]" : "bg-[#E5E7EB]"
              }`}
            >
              <Text
                className={`font-axiformaRegular ${
                  selectedTicket === "Regular"
                    ? "text-white-normal"
                    : "text-black-dark"
                }`}
              >
                Regular
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedTicket("Vip")}
              className={`px-4 py-4 rounded-lg ${
                selectedTicket === "Vip" ? "bg-[#7A91F9]" : "bg-[#E5E7EB]"
              }`}
            >
              <Text
                className={`font-axiformaRegular ${
                  selectedTicket === "Vip"
                    ? "text-white-normal"
                    : "text-black-dark"
                }`}
              >
                Vip
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedTicket("Vvip")}
              className={`px-4 py-4 rounded-lg ${
                selectedTicket === "Vvip" ? "bg-[#F97316]" : "bg-[#E5E7EB]"
              }`}
            >
              <Text
                className={`font-axiformaRegular ${
                  selectedTicket === "Vvip" ? "text-white" : "text-black-dark"
                }`}
              >
                Vvip
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Buy Ticket Button */}
        <View className="px-6 mb-10 w-2/5 self-center my-6">
          <TouchableOpacity
            onPress={() => router.push("/profile/ticketPayment")}
            className="bg-[#8B5CF6] py-4 rounded-full"
          >
            <Text className="text-white-normal text-center font-axiformaRegular">
              Buy Ticket
            </Text>
          </TouchableOpacity>
        </View>

        <Modal transparent={true} visible={showModal} animationType="fade">
          {/* Backdrop */}
          <TouchableOpacity
            className="flex-1 bg-[#1b1b1b67]"
            onPress={toggleModal}
            activeOpacity={1} // Dismiss modal on backdrop click
          />

          {/* Modal content sliding from the bottom */}
          <Animated.View
            style={{
              transform: [{ translateY: slideAnim }],
            }}
            className="absolute bottom-0 left-0 right-0"
          >
            <ShareModal />
          </Animated.View>
        </Modal>
      </ScrollView>
      <StatusBar backgroundColor="#fff" style="dark" />
    </SafeAreaView>
  );
};

export default Event;
