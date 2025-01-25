import { useRef, useState, useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useLocalSearchParams } from "expo-router";
import PhotoPreviewSection from "./photopreview";

export default function Camera() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  const {
    chatId,
    userId,
    token,
    socket,
    user,
    setMessages,
    messagesScrollViewRef,
  } = useLocalSearchParams();

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
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={() => requestPermission()} title="Grant Permission" />
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

  // Send the captured image
  const sendImage = async () => {
    try {
      const response = await axios.post(
        "https://ad3e-2605-6440-3008-5000-a39b-8df0-592c-90bb.ngrok-free.app/v1/messages/send-message",
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
      console.log(response);
      setMessages((prev) => [...prev, newMessage]);
      messagesScrollViewRef.current?.scrollToEnd({ animated: true });
      socket.emit("sendMessage", { ...newMessage, recipientId: userId });
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
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
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <AntDesign name="retweet" size={44} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <AntDesign name="camera" size={44} color="black" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: "gray",
    borderRadius: 10,
  },
});
