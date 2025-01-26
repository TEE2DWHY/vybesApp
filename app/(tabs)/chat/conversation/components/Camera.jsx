import { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import axios from "axios";
import { CameraView, useCameraPermissions } from "expo-camera";
import PhotoPreviewSection from "./PhotoPreview";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { handleImageSelect } from "../../../../../utils/handleImageSelect";

export default function Camera({
  chatId,
  userId,
  token,
  socket,
  user,
  setMessages,
  messagesScrollViewRef,
  setShowCamera,
}) {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (permission?.granted === false) {
      alert("Camera permission is required to take photos!");
    }
  }, [permission]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={() => requestPermission()}
        >
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true, exif: false };
      const takenPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(takenPhoto);
    }
  };

  const handleRetakePhoto = () => setPhoto(null);

  const sendImage = async () => {
    try {
      const response = await axios.post(
        "https://vybesapi.onrender.com/v1/messages/send-message",
        {
          chatId: chatId,
          receiverId: userId,
          image: photo?.uri,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newMessage = {
        ...response.data.payload,
        senderId: user._id,
      };
      setMessages((prev) => [...prev, newMessage]);
      messagesScrollViewRef.current?.scrollToEnd({ animated: true });
      socket.emit("sendMessage", { ...newMessage, recipientId: userId });

      Alert.alert("Success", "Image sent successfully!", [
        { text: "OK", onPress: () => setShowCamera(false) },
      ]);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);

      Alert.alert(
        "Error",
        "There was an issue sending the image. Please try again.",
        [{ text: "OK", onPress: () => setShowCamera(false) }]
      );
    }
  };

  if (photo) {
    return (
      <PhotoPreviewSection
        photo={photo}
        handleRetakePhoto={handleRetakePhoto}
        sendImage={sendImage}
      />
    );
  }

  return (
    <View style={styles.container} className="flex-1 bg-[#121212]">
      <View className="mt-4 ml-4 mb-4">
        <Ionicons
          name="arrow-back-outline"
          size={24}
          color="#fff"
          onPress={() => setShowCamera(false)}
        />
      </View>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <Text className="text-white-normal text-[20px]"> </Text>
        <View className="flex-row justify-around items-center mb-[20px]">
          <TouchableOpacity
            onPress={toggleCameraFacing}
            className=" justify-center items-center"
          >
            <MaterialIcons name="cameraswitch" size={26} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[70px] h-[70px] bg-purple-normal rounded-[40px] border-2 border-white-normal items-center justify-center"
            onPress={handleTakePhoto}
          >
            <MaterialCommunityIcons
              name="star-three-points"
              size={46}
              color={"#fff"}
              style={{ marginTop: "-5" }}
            />
          </TouchableOpacity>
          <TouchableOpacity className="justify-center items-center">
            <FontAwesome
              name="image"
              size={26}
              color="#fff"
              // onPress={() => handleImageSelect()}
            />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: "space-between",
  },

  permissionText: {
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: "#6E44FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
