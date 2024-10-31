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
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import userImages from "../../assets/images/user-images.png";
import logoTwo from "../../assets/images/logo2.png";
import union from "../../assets/images/union.png";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { authInstance } from "../../config/axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import { setItem } from "../../utils/AsyncStorage";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    const { email, password } = formData;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert("Please enter a valid email address.");
      return;
    }
    if (!email || !password) {
      Alert.alert("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const response = await authInstance.post("/login", formData);
      await setItem("token", response.data.payload.token);
      await setItem("isLoggedIn", true);
      router.push("/home");
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
          <ScrollView className="bg-white-normal h-full -mt-[50px] pt-5 rounded-tr-[80px]">
            <View>
              <Text className="self-center text-2xl font-axiformaBlack mt-1">
                Lets Sign You In
              </Text>
              <Text className="self-center text-sm font-axiformaRegular mt-2 px-5 text-center">
                Find Your Life Partner, Earn, Meet New People And Enjoy A Good
                Time
              </Text>
              <View className="mt-5 px-5">
                <Text className="text-base font-axiformaBlack mb-2">
                  Your Vybes & Date E-Mail
                </Text>
                <TextInput
                  placeholder="Example@Gmail.Com"
                  className="border-b border-purple-300 py-2 text-base font-axiformaRegular mb-4"
                  value={formData.email}
                  onChangeText={(value) => handleInputChange("email", value)}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoComplete="email"
                  autoCapitalize="none"
                />
                <Text className="text-base font-axiformaBlack mb-2">
                  Your Vybes & Date Password
                </Text>
                <View className="border-b border-purple-300 py-2 mb-4 flex-row items-center">
                  <TextInput
                    placeholder="Your Password"
                    secureTextEntry={!showPassword}
                    className="text-base font-axiformaRegular  flex-1"
                    value={formData.password}
                    onChangeText={(value) =>
                      handleInputChange("password", value)
                    }
                  />
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#A0A0A0"
                    onPress={() => setShowPassword(!showPassword)}
                  />
                </View>
              </View>
              <TouchableOpacity
                className="self-center bg-purple-dark rounded-full py-4 px-20 mt-2 w-[90%]"
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text className="text-white-normal text-lg text-center font-axiformaBlack">
                    Login
                  </Text>
                )}
              </TouchableOpacity>
              <View className="flex-row items-center justify-center mt-3 mb-10">
                <Text className="text-sm font-axiformaRegular">
                  Don't Have An Account?
                </Text>
                <TouchableOpacity onPress={() => router.push("/sign-up")}>
                  <Text className="font-axiformaBlack ml-1">Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <StatusBar backgroundColor="#391753" style="light" />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;
