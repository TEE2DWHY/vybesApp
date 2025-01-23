import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";
import { CameraView, useCameraPermissions, FlashMode } from "expo-camera";

const CameraComponent = ({ onPictureTaken, onClose }) => {
  const [facing, setFacing] = useState("back"); // Use string literals instead of CameraType
  const [permission, requestPermission] = useCameraPermissions();

  // Request camera permission if not granted
  useEffect(() => {
    (async () => {
      if (permission?.granted === false) {
        const { status } = await requestPermission();
        if (status !== "granted") {
          alert("Camera permission is required to use this feature.");
        }
      }
    })();
  }, [permission, requestPermission]);

  const takePicture = async () => {
    // Implement picture taking logic here
  };

  if (!permission) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No access to camera</Text>
        <TouchableOpacity onPress={requestPermission} className="mt-4">
          <Text className="text-blue-500">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Modal visible={true} animationType="slide">
      <View className="flex-1 absolute">
        <CameraView style={{ flex: 1 }} facing={facing}>
          <View className="flex-1 bg-transparent flex-row">
            <TouchableOpacity
              className="flex-0.1 self-end items-center"
              onPress={() => {
                setFacing(
                  (prevFacing) => (prevFacing === "back" ? "front" : "back") // Toggle between 'back' and 'front'
                );
              }}
            >
              <Text className="text-white text-lg mb-2">Flip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-0.1 self-end items-center mb-4"
              onPress={takePicture}
            >
              <Text className="text-white text-lg mb-2">Take Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-0.1 self-end items-center mb-4"
              onPress={onClose}
            >
              <Text className="text-white text-lg mb-2">Close</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              className="flex-0.1 self-end items-center mb-4"
              onPress={() => {
                setFlash((prevFlash) =>
                  prevFlash === FlashMode.off ? FlashMode.on : FlashMode.off
                );
              }}
            >
              <Text className="text-white text-lg mb-2">
                {flash === FlashMode.off ? "Turn Flash On" : "Turn Flash Off"}
              </Text>
            </TouchableOpacity> */}
          </View>
        </CameraView>
      </View>
    </Modal>
  );
};

export default CameraComponent;
