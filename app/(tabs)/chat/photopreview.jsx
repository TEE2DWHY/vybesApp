import React from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";

const PhotoPreviewSection = ({ photo, handleRetakePhoto, sendImage }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Image style={styles.previewContainer} source={{ uri: photo.uri }} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRetakePhoto}>
          <Fontisto name="trash" size={36} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={sendImage}>
          <Fontisto name="arrow-right" size={36} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    borderRadius: 15,
    padding: 1,
    width: "95%",
    backgroundColor: "darkgray",
    justifyContent: "center",
    alignItems: "center",
  },
  previewContainer: {
    width: "95%",
    height: "85%",
    borderRadius: 15,
  },
  buttonContainer: {
    marginTop: "4%",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "gray",
    borderRadius: 25,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PhotoPreviewSection;
