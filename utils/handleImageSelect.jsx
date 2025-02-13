import * as ImagePicker from "expo-image-picker";

const getCurrentTime = () => {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const handleImageSelect = async ({}) => {
  try {
    const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const newMessage = {
          id: messages.length + 1,
          sender: "me",
          image: result.assets[0].uri,
          time: getCurrentTime(),
          status: "sent",
        };
        setMessages([...messages, newMessage]);
      }
    } else {
      console.log("Permission denied");
    }
  } catch (error) {
    console.log("ImagePicker Error:", error);
  }
};
