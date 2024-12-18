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
// import ticketFour from "../../../../assets/images/ticket-4.png";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import ShareModal from "../components/modal/ShareModal";
import axios from "axios";

const Event = () => {
  const params = useLocalSearchParams();
  const { id } = params;
  const [ticket, setTicket] = useState();
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const slideAnim = useState(new Animated.Value(300))[0];

  useEffect(() => {
    const fetchEvents = async () => {
      if (!id) {
        console.log("No ID provided");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8000/v1/event/${id}`
        );
        setTicket(response.data.payload);
        setTickets(response.data.payload.tickets);
      } catch (error) {
        console.log(
          "Error fetching event:",
          error.response?.data.message || error.message
        );
      }
    };

    fetchEvents();
  }, [id]);

  const toggleModal = () => {
    setShowModal(!showModal);
    Animated.timing(slideAnim, {
      toValue: showModal ? 300 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

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
              onPress={toggleModal}
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
          <View className="w-full h-full rounded-[20px] overflow-hidden">
            <Image
              source={{ uri: ticket?.image }}
              resizeMode="cover"
              className="h-full w-full"
            />
          </View>

          <TouchableOpacity
            className="absolute right-[-15px] z-50 top-[50%]  bg-[#7A91F9] rounded-full p-2"
            onPress={() => console.log("Scroll Right")}
          >
            <AntDesign name="right" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Event Description */}
        <Text className="capitalize font-axiformaRegular text-[#3D4C5E] w-[90%] leading-7 px-6">
          {ticket?.description}
        </Text>

        {/* Event Location */}
        <View className="flex-row gap-2 px-6 mt-2 w-4/5">
          <EvilIcons name="location" size={22} color="#7A91F9" />
          <Text className="capitalize text-[#495795] font-axiformaRegular leading-5">
            {ticket?.location}
          </Text>
        </View>

        {/* Available Tickets Section */}
        <View className="mt-6 px-6 bg-white-normal w-[90%] rounded-md self-center p-4">
          <Text className="font-axiformaRegular text-[#3D4C5E] text-lg mb-4">
            Available Ticket
          </Text>

          {tickets.map((ticketItem, index) => (
            <View
              key={index}
              className="flex-row justify-between mb-4 border-b border-[#E9E9EB] pb-2"
            >
              <Text className="font-axiformaRegular text-[#3D4C5E]">
                {ticketItem.type}
              </Text>
              <Text className="font-axiformaRegular text-[#3D4C5E]">{`${ticketItem.available}/120`}</Text>
            </View>
          ))}
        </View>

        {/* Featured Artist Section */}
        <View className="mt-6 px-6 bg-white-normal w-[90%] rounded-md self-center p-4">
          <Text className="font-axiformaRegular text-[#3D4C5E] text-lg mb-4">
            Featured Artist
          </Text>

          <Text className="font-axiformaRegular text-[#47586E] text-lg mt-6 mb-4">
            Select Your Preferred Type Of Ticket
          </Text>

          <View className="flex-row justify-between mb-4">
            <TouchableOpacity
              onPress={() => {
                setSelectedTicket("Regular");
                console.log("Selected Ticket:", "Regular");
              }}
              className={`px-4 py-4 rounded-lg ${
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
              onPress={() => {
                setSelectedTicket("Vip");
                console.log("Selected Ticket:", "Vip");
              }}
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
              onPress={() => {
                setSelectedTicket("Vvip");
                console.log("Selected Ticket:", "Vvip");
              }}
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
            activeOpacity={1}
          />

          {/* Modal content sliding from the bottom */}
          <Animated.View
            style={{
              transform: [{ translateY: slideAnim }],
            }}
            className="absolute bottom-0 left-0 right-0"
          >
            <ShareModal image={ticket?.image} />
          </Animated.View>
        </Modal>
      </ScrollView>
      <StatusBar backgroundColor="#fff" style="dark" />
    </SafeAreaView>
  );
};

export default Event;
