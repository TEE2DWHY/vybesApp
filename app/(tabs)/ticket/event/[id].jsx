import React, { useState, useEffect, useCallback } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import ShareModal from "../components/modal/ShareModal";
import axios from "axios";
import { Skeleton } from "moti/skeleton";

const Event = () => {
  const { id } = useLocalSearchParams();
  const [ticket, setTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allEvents, setAllEvents] = useState([]);
  const slideAnim = useState(new Animated.Value(300))[0];

  const getAllEvents = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://vybesapi.onrender.com/v1/event/all-events`
      );
      setAllEvents(response.data?.payload || []);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  useEffect(() => {
    if (!id) return;
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://vybesapi.onrender.com/v1/event/get-event/${id}`
        );
        setTicket(response.data.payload);
        setTickets(response.data.payload.tickets);
      } catch (error) {
        console.error(
          "Error fetching event:",
          error.response?.data?.message || error.message
        );
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const toggleModal = () => {
    setShowModal(!showModal);
    Animated.timing(slideAnim, {
      toValue: showModal ? 300 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const checkTicketAvailability = (ticketType) => {
    return tickets.some(
      (ticketItem) => ticketItem.type.toLowerCase() === ticketType.toLowerCase()
    );
  };

  const updateEvent = (direction) => {
    const currentEventIndex = allEvents.findIndex(
      (event) => event._id === ticket._id
    );
    if (currentEventIndex < 0) return;

    const nextIndex = currentEventIndex + direction;
    if (nextIndex < 0 || nextIndex >= allEvents.length) return;

    const newEvent = allEvents[nextIndex];
    setTicket(newEvent);
    setTickets(newEvent.tickets);
    setSelectedTicket("");
    setLoading(true);
    setLoading(false);
  };

  const handleNext = () => updateEvent(1);
  const handlePrevious = () => updateEvent(-1);

  const currentEventIndex = allEvents.findIndex(
    (event) => event._id === ticket?._id
  );
  const isLastEvent = currentEventIndex === allEvents.length - 1;
  const isFirstEvent = currentEventIndex === 0;

  return (
    <SafeAreaView className="pt-10">
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
          {!loading && (
            <TouchableOpacity
              className={`absolute left-[-15px] z-50 top-[50%] p-2 rounded-full ${
                isFirstEvent ? "bg-gray-400" : "bg-[#7A91F9]"
              }`}
              onPress={handlePrevious}
              disabled={isFirstEvent}
            >
              <AntDesign name="left" size={14} color="#fff" />
            </TouchableOpacity>
          )}
          {loading ? (
            <Skeleton
              height={240}
              width="95%"
              radius={12}
              className="self-center"
              colorMode="light"
            />
          ) : (
            <View className="w-full h-full rounded-[20px] overflow-hidden">
              <Image
                source={{ uri: ticket?.image }}
                resizeMode="cover"
                className="h-full w-full"
              />
            </View>
          )}

          {!loading && (
            <TouchableOpacity
              className={`absolute right-[-15px] z-50 top-[50%] p-2 rounded-full ${
                isLastEvent ? "bg-gray-400" : "bg-[#7A91F9]"
              }`}
              onPress={handleNext}
              disabled={isLastEvent}
            >
              <AntDesign name="right" size={14} color="#fff" />
            </TouchableOpacity>
          )}
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
          <View className="flex-row flex-wrap gap-4">
            {ticket?.dj?.[0]?.split(",").map((dj, index) => (
              <View
                className="px-4 py-4 rounded-lg border border-gray-400 mb-2"
                key={index}
              >
                <Text className="font-axiformaMedium text-gray-500">
                  {dj.trim()}
                </Text>
              </View>
            ))}
          </View>

          <Text className="font-axiformaRegular text-[#47586E] text-lg mt-6 mb-4">
            Select Your Preferred Type Of Ticket
          </Text>

          <View className="flex-row justify-between mb-4">
            {["Regular", "Vip", "Vvip"].map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => setSelectedTicket(type)}
                className={`px-4 py-4 rounded-lg ${
                  selectedTicket === type
                    ? `bg-[#${
                        type === "Regular"
                          ? "3C615F"
                          : type === "Vip"
                          ? "7A91F9"
                          : "F97316"
                      }]`
                    : "bg-[#E5E7EB]"
                }`}
              >
                <Text
                  className={`font-axiformaRegular ${
                    selectedTicket === type
                      ? "text-white-normal"
                      : "text-black-dark"
                  }`}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Buy Ticket Button */}
        <View className="px-6 mb-10 w-2/5 self-center my-6">
          <TouchableOpacity
            onPress={() => {
              if (!selectedTicket)
                return Alert.alert("Note", "Please select a ticket type");
              if (!checkTicketAvailability(selectedTicket)) {
                return Alert.alert(
                  "Ticket Not Available",
                  `${selectedTicket} ticket type is not available for this event.`
                );
              }
              router.push(
                `ticket/buyticket?id=${id}&ticketType=${selectedTicket}&ticketImage=${ticket?.image}&ticketName=${ticket?.name}&location=${ticket?.location}`
              );
            }}
            className="bg-[#8B5CF6] py-4 rounded-full"
          >
            <Text className="text-white-normal text-center font-axiformaRegular">
              Buy Ticket
            </Text>
          </TouchableOpacity>
        </View>

        <Modal transparent visible={showModal} animationType="fade">
          <TouchableOpacity
            className="flex-1 bg-[#1b1b1b67]"
            onPress={toggleModal}
            activeOpacity={1}
          />
          <Animated.View
            style={{ transform: [{ translateY: slideAnim }] }}
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
