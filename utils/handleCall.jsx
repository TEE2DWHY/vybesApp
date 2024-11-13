import * as Linking from "expo-linking";

export const handleCall = (phoneNumber) => {
  const url = `tel:${phoneNumber}`;
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.warn("Phone number is not available.");
      }
    })
    .catch((err) => console.error("An error occurred", err));
};
