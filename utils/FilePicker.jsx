import * as DocumentPicker from "expo-document-picker";
import { Alert } from "react-native";

export const pickDocument = async () => {
  try {
    let result = await DocumentPicker.getDocumentAsync({});

    if (result.canceled) {
      Alert.alert("Action Canceled", "User canceled picking a document.");
      return;
    }
    console.log(result);
  } catch (error) {
    console.log(error);
    Alert.alert("Error", "An error occurred while picking the document.");
  }
};

export const pickAudio = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
      copyToCacheDirectory: false,
    });
    if (result.canceled) {
      Alert.alert("Action Canceled", "User canceled picking an audio file.");
      return;
    }
    const allowedExtensions = [".mp3", ".m4a"];
    const fileExtension = result.name.slice(result.name.lastIndexOf("."));

    if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
      Alert.alert("Invalid file type", "Please select an .mp3 or .m4a file.");
      return;
    }
    console.log(result);
  } catch (error) {
    console.log(error);
    Alert.alert("Error", "An error occurred while picking the audio file.");
  }
};
