import React from "react";
import {
  Modal,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

const FullScreenImageModal = ({ imageUri, visible, onClose }) => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.overlay} onPress={onClose}>
          <Image
            source={{ uri: imageUri }}
            style={{
              width: screenWidth,
              height: screenHeight,
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
});

export default FullScreenImageModal;
