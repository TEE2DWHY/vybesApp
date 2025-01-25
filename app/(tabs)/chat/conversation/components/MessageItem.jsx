// MessageItem.js
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { formatMessageTime } from "../../../../../utils/formatMessageTime";

const MessageItem = ({ msg, user, onLongPress }) => {
  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };
  return (
    <TouchableOpacity onLongPress={() => onLongPress(msg)}>
      <View
        className={`my-2 flex-row items-end ${
          msg.senderId === user._id ? "justify-end" : "justify-start"
        }`}
      >
        {msg.audio ? (
          <View
            className={`p-3 rounded-lg ${
              msg.senderId === user._id ? "bg-[#5C6DBB]" : "bg-[#D6DDFD]"
            }`}
          >
            <View className="flex-row items-center">
              <Ionicons
                name={msg.isPlaying ? "pause" : "play"}
                size={24}
                color="#fff"
                onPress={() => {
                  /* play/pause logic */
                }}
              />
              <Text className="text-white-normal ml-2">
                {formatDuration(msg.duration)}
              </Text>
            </View>
            <Text
              className={`text-xs ml-2 font-axiformaRegular mt-2 ${
                msg.senderId === user._id ? "text-[#fff]" : "text-gray-500"
              }`}
            >
              {formatMessageTime(msg.createdAt)}
            </Text>
          </View>
        ) : (
          <View
            className={`p-3 rounded-lg ${
              msg.text
                ? msg.senderId === user._id
                  ? "bg-[#5C6DBB]"
                  : "bg-[#D6DDFD]"
                : "bg-transparent"
            }`}
          >
            {msg.image ? (
              <Image
                source={{ uri: msg.image }}
                className="w-[280px] h-[160px]"
                resizeMode="cover"
              />
            ) : (
              <Text
                className={`font-axiformaRegular ${
                  msg.senderId === user._id ? "text-[#fff]" : "text-[#3D4C5E]"
                }`}
              >
                {msg.text}
              </Text>
            )}
            <View className="flex-row items-center justify-end">
              <Text
                className={`text-xs mr-2 font-axiformaRegular mt-2 ${
                  msg.senderId === user._id ? "text-[#fff]" : "text-gray-500"
                }`}
              >
                {formatMessageTime(msg.createdAt)}
              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MessageItem;
