import { useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
} from "react-native";
import userImages from "../../assets/images/user-images.png";
import logoTwo from "../../assets/images/logo2.png";
import union from "../../assets/images/union.png";
import { router } from "expo-router";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = () => {
    const { email, password } = formData;
    if (!email || !password) {
      Alert.alert("Please fill in all fields");
      return;
    }
    // Handle login logic here
  };

  return (
    <SafeAreaView className="h-full bg-purple-darker">
      <StatusBar backgroundColor="#391753" barStyle="light-content" />
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
      <View className="bg-white-normal h-full -mt-[50px] pt-5 rounded-tr-[80px]">
        <Text className="self-center text-2xl font-axiformaBlack mt-3">
          Lets Sign You In
        </Text>
        <Text className="self-center text-sm font-axiformaLight mt-2 px-5 text-center">
          Find Your Life Partner, Earn, Meet New People And Enjoy A Good Time
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
          />
          <Text className="text-base font-axiformaBlack  mb-2">
            Your Vybes & Date Password
          </Text>
          <TextInput
            placeholder="Your Password"
            secureTextEntry
            className="border-b border-purple-300 py-2 text-base font-axiformaRegular mb-4"
            value={formData.password}
            onChangeText={(value) => handleInputChange("password", value)}
          />
        </View>
        <TouchableOpacity
          className="self-center bg-purple-dark rounded-full py-4 px-20 mt-5 w-[90%]"
          onPress={handleLogin}
        >
          <Text className="text-white-normal text-lg text-center font-axiformaBlack">
            Login
          </Text>
        </TouchableOpacity>
        <Text className="self-center text-sm font-axiformaRegular mt-3">
          Don't Have An Account?
          <TouchableOpacity onPress={() => router.push("/sign-up")}>
            <Text className="font-axiformaBlack ml-1">Register</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
