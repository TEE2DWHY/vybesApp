import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Text,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

const InputArea = ({
  message,
  setMessage,
  sendMessage,
  startRecording,
  stopRecording,
  isRecording,
  sendVoiceRecording,
  handleTyping,
  setShowAttachmentModal,
  recordingDuration,
}) => {
  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <View
      className={`flex-row items-center justify-between w-[93%] border-2 border-[#F3F9FF] bg-white-normal ${
        Platform.OS === "ios" ? "p-4 my-4" : "p-2 my-8 mb-5"
      } rounded-md self-center mx-4`}
    >
      <View className="flex-row items-center gap-4 flex-1">
        {isRecording ? (
          <>
            <Text className="text-[#3D4C5E] font-axiformaRegular">
              Recording... {formatDuration(recordingDuration)}
            </Text>
            <TouchableOpacity onPress={stopRecording}>
              <Ionicons name="stop" size={24} color="#a241ee" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Entypo
              name="attachment"
              size={22}
              color="#5C6DBB"
              onPress={() => setShowAttachmentModal(true)}
            />
            <TextInput
              className="text-[#3D4C5E] font-axiformaRegular flex-1"
              placeholder="Type a Message..."
              multiline={true}
              textAlignVertical="top"
              value={message}
              onChangeText={handleTyping} // This is correct now
            />
          </>
        )}
      </View>

      <View className="flex-row items-center gap-4 ml-2">
        {isRecording ? (
          <TouchableOpacity onPress={sendVoiceRecording}>
            <Ionicons name="send" size={24} color="#9941EE" />
          </TouchableOpacity>
        ) : message.length === 0 ? (
          <>
            <AntDesign
              name="camera"
              size={24}
              color="#B2BBC6"
              //   onPress={} // Implement camera functionality if required
            />
            <MaterialIcons
              name="keyboard-voice"
              size={24}
              color="#9941EE"
              onPress={startRecording} // Start recording on press
            />
          </>
        ) : (
          <TouchableOpacity onPress={sendMessage}>
            <Ionicons name="send" size={24} color="#9941EE" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputArea;
