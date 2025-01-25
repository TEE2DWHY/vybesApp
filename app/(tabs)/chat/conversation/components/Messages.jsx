import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { format } from "date-fns";
import { formatMessageTime } from "../../../../../utils/formatMessageTime";
import FullScreenImageModal from "./FullScreenImageModal";

const Messages = ({
  messages,
  user,
  onLongPress,
  showTips,
  playingMessageId,
  pauseAudio,
  playAudio,
  formatDuration,
  setPlayingMessageId,
  messagesScrollViewRef,
}) => {
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const handleImageClick = (uri) => {
    setSelectedImageUri(uri);
    setImageModalVisible(true);
  };

  const handleCloseImageModal = () => {
    setImageModalVisible(false);
    setSelectedImageUri(null);
  };

  return (
    !showTips && (
      <ScrollView
        className="flex-2 px-4 h-[60vh]"
        ref={messagesScrollViewRef}
        onContentSizeChange={() =>
          messagesScrollViewRef.current.scrollToEnd({ animated: true })
        }
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-end",
        }}
        inverted={true}
      >
        {messages.map((msg, index) => {
          const messageDate = new Date(msg.createdAt);
          const showDateHeader =
            index === 0 ||
            new Date(messages[index - 1].createdAt).toDateString() !==
              messageDate.toDateString();

          return (
            <View key={msg?._id}>
              {showDateHeader && (
                <Text className="text-center text-gray-400 my-2 font-axiformaRegular">
                  {format(messageDate, "dd/MM/yyyy")}
                </Text>
              )}

              <TouchableOpacity onLongPress={() => onLongPress(msg)}>
                <View
                  className={`my-2 flex-row items-end ${
                    msg.senderId === user?._id ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.audio ? (
                    <View
                      className={`p-3 rounded-lg ${
                        msg.senderId === user?._id
                          ? "bg-[#5C6DBB] rounded-tr-[40px] rounded-tl-[40px] rounded-br-[4px] rounded-bl-[40px] pt-6 px-4"
                          : "bg-[#D6DDFD] rounded-tr-[40px] rounded-tl-[40px] rounded-br-[40px] rounded-bl-[4px] pt-6 px-4"
                      }`}
                    >
                      <View className="flex-row items-center">
                        <Ionicons
                          name={playingMessageId === msg._id ? "pause" : "play"}
                          size={24}
                          color="#fff"
                          onPress={() => {
                            if (!msg.audio) {
                              console.log(
                                "Audio URI is null or undefined for message:",
                                msg
                              );
                              return;
                            }

                            if (playingMessageId === msg._id) {
                              pauseAudio();
                              setPlayingMessageId(null);
                            } else {
                              playAudio(msg.audio);
                              setPlayingMessageId(msg._id);
                            }
                          }}
                        />

                        <Text className="text-white-normal ml-2">
                          {formatDuration(msg.duration)}
                        </Text>
                      </View>

                      <Text
                        className={`${
                          msg.senderId === user._id
                            ? "text-[#fff]"
                            : "text-gray-500"
                        } text-xs ml-2 font-axiformaRegular mt-2`}
                      >
                        {formatMessageTime(msg.createdAt)}
                      </Text>
                    </View>
                  ) : (
                    <View
                      className={`p-3 rounded-lg ${
                        msg.text
                          ? msg.senderId === user?._id
                            ? "bg-[#5C6DBB] rounded-tr-[40px] rounded-tl-[40px] rounded-br-[4px] rounded-bl-[40px] pt-6 px-4"
                            : "bg-[#D6DDFD] rounded-tr-[40px] rounded-tl-[40px] rounded-br-[40px] rounded-bl-[4px] pt-6 px-4"
                          : "bg-transparent"
                      }`}
                    >
                      {msg.image ? (
                        <TouchableOpacity
                          onPress={() => handleImageClick(msg.image)}
                        >
                          <Image
                            source={{ uri: msg.image }}
                            className="w-[280px] h-[160px] rounded-2xl"
                            resizeMode="cover"
                          />
                        </TouchableOpacity>
                      ) : (
                        <Text
                          className={`${
                            msg.senderId === user._id
                              ? "text-[#fff]"
                              : "text-[#3D4C5E]"
                          } font-axiformaRegular`}
                        >
                          {msg.text}
                        </Text>
                      )}
                      <View className="flex-row items-center justify-end">
                        <Text
                          className={`${
                            msg.senderId === user._id
                              ? "text-[#fff]"
                              : "text-gray-500"
                          } text-xs mr-2 font-axiformaRegular mt-2`}
                        >
                          {formatMessageTime(msg.createdAt)}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
                {msg.senderId === user._id && (
                  <View className="self-end">
                    <Ionicons
                      name={
                        msg.status === "read"
                          ? "checkmark-done"
                          : msg.status === "delivered"
                          ? "checkmark"
                          : "checkmark-outline"
                      }
                      size={18}
                      color="#9941EE"
                    />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          );
        })}

        <FullScreenImageModal
          imageUri={selectedImageUri}
          visible={imageModalVisible}
          onClose={handleCloseImageModal}
        />
      </ScrollView>
    )
  );
};

export default Messages;
