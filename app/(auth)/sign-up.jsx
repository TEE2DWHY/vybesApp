import { useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import userImages from "../../assets/images/user-images.png";
import logoTwo from "../../assets/images/logo2.png";
import union from "../../assets/images/union.png";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { authInstance } from "../../config/axios";
import { setItem } from "../../utils/AsyncStorage";
import Ionicons from "@expo/vector-icons/Ionicons";

const SignUp = () => {
  const [section, setSection] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    gender: "",
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });

  const handleNext = () => {
    if (!formData.gender) {
      Alert.alert("Please select your gender");
      return;
    }
    setSection(2);
  };

  const handleSignUp = async () => {
    const { email, fullName, password, confirmPassword } = formData;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert("Please enter a valid email address.");
      return;
    }

    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(fullName)) {
      Alert.alert("Please enter a valid full name (letters only).");
      return;
    }

    if (!fullName || !password || !confirmPassword) {
      Alert.alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const response = await authInstance.post("/register", formData);
      await setItem("userEmail", response.data.payload.email);
      Alert.alert(
        "Success!",
        response.data.message,
        [
          {
            text: "Verify My Account",
            onPress: () => {
              router.push("/verify");
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "An error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <SafeAreaView className="h-full bg-purple-darker">
      <View className="bg-purple-darker h-[350px] items-center justify-center relative overflow-hidden">
        <Image
          source={union}
          className="w-[137.15px] h-[100px] mt-[-70px] ml-[180px] absolute top-20 right-[-15px]"
          resizeMode="contain"
        />
        <Image
          source={logoTwo}
          className="w-[137.15px] h-[50px] mt-[-70px] ml-[180px]"
          resizeMode="contain"
        />
        <Text className="text-white-normal text-[48px] font-axiformaBlack absolute">
          Vybes
        </Text>
        <Image
          source={userImages}
          className="w-[350px] h-[60px] absolute bottom-20"
        />
      </View>
      {section === 1 ? (
        <ScrollView className="bg-white-normal h-full -mt-[50px] pt-5 rounded-tr-[80px]">
          <Text className="self-center text-2xl font-axiformaBlack mt-1">
            Let's Know Your Gender
          </Text>
          <Text className="self-center text-sm font-axiformaRegular mt-2 px-5 text-center">
            Selecting Your Gender Helps You Find Your Right Type Of Vybe.
          </Text>
          <View className="mt-5 px-5">
            <TouchableOpacity
              className={`border ${
                formData.gender === "male"
                  ? "bg-purple-darker"
                  : "border-blue-300"
              } rounded-full py-4 px-6 mb-4 flex-row items-center justify-between`}
              onPress={() => handleInputChange("gender", "male")}
            >
              <Text
                className={
                  formData.gender === "male"
                    ? "bg-purple-darker text-white-normal text-base font-axiformaBlack"
                    : "text-purple-darker text-base font-axiformaBlack"
                }
              >
                Male
              </Text>
              <Text className="text-purple-darker text-base">♂️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`border ${
                formData.gender === "female"
                  ? "bg-purple-darker text-white-normal"
                  : "border-blue-300"
              } rounded-full py-4 px-6 mb-4 flex-row items-center justify-between`}
              onPress={() => handleInputChange("gender", "female")}
            >
              <Text
                className={
                  formData.gender === "female"
                    ? "bg-purple-darker text-white-normal text-base font-axiformaBlack"
                    : "text-purple-darker text-base font-axiformaBlack"
                }
              >
                Female
              </Text>
              <Text className="text-purple-darker text-lg">♀️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`border ${
                formData.gender === "non-binary"
                  ? "bg-purple-darker text-white-normal"
                  : "border-blue-300"
              } rounded-full py-4 px-6  flex-row items-center justify-between`}
              onPress={() => handleInputChange("gender", "non-binary")}
            >
              <Text
                className={
                  formData.gender === "non-binary"
                    ? "bg-purple-darker text-white-normal text-base font-axiformaBlack"
                    : "text-purple-darker text-base font-axiformaBlack"
                }
              >
                Non-Binary
              </Text>
              <Text className="text-white text-lg">⚧️</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="self-center bg-purple-dark rounded-full my-2 py-4 px-20 w-[90%] mb-10"
            onPress={handleNext}
          >
            <Text className="text-white-normal text-lg text-center font-axiformaBlack">
              Next
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <ScrollView className="bg-white-normal h-full -mt-[50px] rounded-tr-[80px]">
          <View>
            <Text className="self-center text-2xl font-axiformaBlack mt-4">
              Sign Up
            </Text>
            <Text className="self-center text-sm font-axiformaRegular mt-2 px-5 text-center">
              Let's Get Started By Connecting You To The Community Of Love
            </Text>
            <View className="mt-2 px-5">
              <View className="mb-4">
                <Text className="text-base font-axiformaRegular text-purple-darker mb-1">
                  Email
                </Text>
                <TextInput
                  placeholder="Example@Gmail.Com"
                  className="border-b border-purple-300 py-2 text-base font-axiformaRegular"
                  value={formData.email}
                  onChangeText={(value) => handleInputChange("email", value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  textContentType="emailAddress"
                />
              </View>
              <View className="mb-4">
                <Text className="text-base font-axiformaRegular text-purple-darker mb-1">
                  Full Name
                </Text>
                <TextInput
                  placeholder="Your Name"
                  className="border-b border-purple-300 py-2 text-base font-axiformaRegular"
                  value={formData.fullName}
                  onChangeText={(value) => handleInputChange("fullName", value)}
                  keyboardType="default"
                  onBlur={() => {
                    // Validate to remove numbers when input loses focus
                    if (!/^[A-Za-z\s]*$/.test(formData.fullName)) {
                      Alert.alert(
                        "Please enter a valid full name (letters only)."
                      );
                      handleInputChange("fullName", ""); // Clear invalid input
                    }
                  }}
                />
              </View>
              <View className="border-b border-purple-300 py-2 mb-4 flex-row items-center">
                <TextInput
                  placeholder="Your Password"
                  secureTextEntry={!showPassword}
                  className="text-base font-axiformaRegular  flex-1"
                  value={formData.password}
                  onChangeText={(value) => handleInputChange("password", value)}
                />
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#A0A0A0"
                  onPress={() => setShowPassword(!showPassword)}
                />
              </View>
              <View className="border-b border-purple-300 py-2 mb-4 flex-row items-center">
                <TextInput
                  placeholder="Confirm Password"
                  secureTextEntry={!showConfirmPassword}
                  className="text-base font-axiformaRegular  flex-1"
                  value={formData.confirmPassword}
                  onChangeText={(value) =>
                    handleInputChange("confirmPassword", value)
                  }
                />
                <Ionicons
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#A0A0A0"
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </View>
            </View>
            <TouchableOpacity
              className="self-center bg-purple-dark rounded-full py-4 px-20 mt-2 w-[90%]"
              onPress={handleSignUp}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-white-normal text-lg text-center font-axiformaBlack">
                  Sign-Up
                </Text>
              )}
            </TouchableOpacity>
            <View className="flex-row justify-center items-center mt-3">
              <Text className="text-sm font-axiformaRegular">
                Already A Member?
              </Text>
              <TouchableOpacity onPress={() => router.push("/sign-in")}>
                <Text className="font-axiformaBlack ml-1">Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
      <StatusBar backgroundColor="#391753" style="light" />
    </SafeAreaView>
  );
};

export default SignUp;
