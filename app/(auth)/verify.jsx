import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import verifyImage from "../../assets/images/verify-img.png";
import topVerify from "../../assets/images/top-verify.png";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

const Verify = () => {
  const [verificationCode, setVerificationCode] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(58);
  const [buttonText, setButtonText] = useState("Verify");
  const inputsRef = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setButtonText("Send Code Again");
    }
  }, [timer]);

  const handleVerify = () => {
    if (buttonText === "Send Code Again") {
      setTimer(58);
      setButtonText("Verify");
    } else if (verificationCode.includes("")) {
      return Alert.alert("Please provide the complete verification code.");
    } else {
      // Proceed with verification logic
      console.log("Verification Code:", verificationCode.join(""));
    }
  };

  const handleChangeText = (value, index) => {
    const newCode = [...verificationCode];
    newCode[index] = value;

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    } else if (!value && index > 0) {
      inputsRef.current[index - 1].focus();
    }

    setVerificationCode(newCode);
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && verificationCode[index] === "") {
      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  return (
    <>
      <SafeAreaView className="h-full bg-white-normal">
        <ScrollView
          containerStyles={{ backgroundColor: "#fff", height: "100%" }}
        >
          <View className="flex-row items-center mt-4 mb-6 ">
            <TouchableOpacity onPress={() => router.push("/sign-up")}>
              <View className="ml-4">
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  size={24}
                  color={"gray"}
                />
              </View>
            </TouchableOpacity>
            <Image
              source={topVerify}
              className="ml-auto w-20 h-20 mr-[-10px]"
              resizeMode="contain"
            />
          </View>
          <View className="h-full px-6">
            <View className="mb-2">
              <Text className="text-2xl text-left font-axiformaBlack mb-2 mt-6">
                Enter 6 Digit Code
              </Text>
              <Text className="text-left text-sm font-axiformaLight text-gray-600 w-4/5">
                Your 6 Digit Verification Code Was Sent Via Your E-Mail
                @Exa...@Gmail.Com
              </Text>
            </View>
            <View className="flex-row justify-center space-x-2 my-8">
              {[...Array(6)].map((_, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputsRef.current[index] = ref)}
                  maxLength={1}
                  keyboardType="numeric"
                  className="border-b border-gray-400 text-center text-xl font-axiformaRegular w-10"
                  value={verificationCode[index]}
                  onChangeText={(value) => handleChangeText(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              ))}
            </View>
            <Text className="text-left text-sm text-gray-600 px-">
              Resend Code {timer}s
            </Text>
            <TouchableOpacity
              className="self-center bg-purple-dark rounded-full py-4 px-20 mt-8"
              onPress={handleVerify}
            >
              <Text className="text-white-normal text-base text-center font-axiformaBlack">
                {buttonText}
              </Text>
            </TouchableOpacity>
            <Image
              source={verifyImage}
              className="mt-32 self-center w-full h-24"
              resizeMode="contain"
            />
          </View>
        </ScrollView>

        <StatusBar backgroundColor="#ffff" style="dark" />
      </SafeAreaView>
    </>
  );
};

export default Verify;
