import { useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
} from "react-native";
import userImages from "../../assets/images/user-images.png";
import logoTwo from "../../assets/images/logo2.png";
import union from "../../assets/images/union.png";
import { router } from "expo-router";

const SignUp = () => {
  const [section, setSection] = useState(1);
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

  const handleSignUp = () => {
    const { email, fullName, password, confirmPassword } = formData;
    if (!email || !fullName || !password || !confirmPassword) {
      Alert.alert("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }
    router.push("/verify");
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
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
          //   resizeMode="contain"
        />
      </View>
      {section === 1 ? (
        <View className="bg-white-normal h-full -mt-[50px] pt-5 rounded-tr-[80px]">
          <Text className="self-center text-2xl font-axiformaBlack mt-1">
            Let's Know Your Gender
          </Text>
          <Text className="self-center text-sm font-axiformaLight mt-2 px-5 text-center">
            Selecting Your Gender Helps You Find Your Right Type Of Vybe.
          </Text>
          <View className="mt-5 px-5">
            <TouchableOpacity
              className={`border ${
                formData.gender === "Male"
                  ? "bg-purple-darker"
                  : "border-blue-300"
              } rounded-full py-4 px-6 mb-4 flex-row items-center justify-between`}
              onPress={() => handleInputChange("gender", "Male")}
            >
              <Text
                className={
                  formData.gender === "Male"
                    ? "bg-purple-darker text-white-normal  text-base font-axiformaBlack"
                    : "text-purple-darker text-base font-axiformaBlack"
                }
              >
                Male
              </Text>
              <Text className="text-purple-darker text-base">♂️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`border ${
                formData.gender === "Female"
                  ? "bg-purple-darker text-white-normal"
                  : "border-blue-300"
              } rounded-full py-4 px-6 mb-4 flex-row items-center justify-between`}
              onPress={() => handleInputChange("gender", "Female")}
            >
              <Text
                className={
                  formData.gender === "Female"
                    ? "bg-purple-darker text-white-normal  text-base font-axiformaBlack"
                    : "text-purple-darker text-base font-axiformaBlack"
                }
              >
                Female
              </Text>
              <Text className="text-purple-darker text-lg">♀️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`border ${
                formData.gender === "Non-Binary"
                  ? "bg-purple-darker text-white-normal"
                  : "border-blue-300"
              } rounded-full py-4 px-6 mb-4 flex-row items-center justify-between`}
              onPress={() => handleInputChange("gender", "Non-Binary")}
            >
              <Text
                className={
                  formData.gender === "Non-Binary"
                    ? "bg-purple-darker text-white-normal  text-base font-axiformaBlack"
                    : "text-purple-darker text-base font-axiformaBlack"
                }
              >
                Non-Binary
              </Text>
              <Text className="text-white text-lg">⚧️</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="self-center bg-purple-dark rounded-full py-4 px-20 mt-2 w-[90%]"
            onPress={handleNext}
          >
            <Text className="text-white-normal text-lg text-center font-axiformaBlack">
              Next
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="bg-white-normal h-full -mt-[50px] pt-2 rounded-tr-[80px]">
          <Text className="self-center text-2xl font-axiformaBlack mt-2">
            Sign Up
          </Text>
          <Text className="self-center text-sm font-axiformaLight mt-2 px-5 text-center">
            Let's Get Started By Connecting You To The Community Of Love
          </Text>
          <View className="mt-2 px-5">
            <TextInput
              placeholder="Example@Gmail.Com"
              className="border-b border-purple-300 py-2 text-base font-axiformaRegular mb-4"
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
            />
            <TextInput
              placeholder="Your Name"
              className="border-b border-purple-300 py-2 text-base font-axiformaRegular mb-4"
              value={formData.fullName}
              onChangeText={(value) => handleInputChange("fullName", value)}
            />
            <TextInput
              placeholder="Your Password"
              secureTextEntry
              className="border-b border-purple-300 py-2 text-base font-axiformaRegular mb-4"
              value={formData.password}
              onChangeText={(value) => handleInputChange("password", value)}
            />
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry
              className="border-b border-purple-300 py-2 text-base font-axiformaRegular mb-4"
              value={formData.confirmPassword}
              onChangeText={(value) =>
                handleInputChange("confirmPassword", value)
              }
            />
          </View>
          <TouchableOpacity
            className="self-center bg-purple-dark rounded-full py-4 px-20 mt-2 w-[90%]"
            onPress={handleSignUp}
          >
            <Text className="text-white-normal text-lg text-center font-axiformaBlack">
              Sign-Up
            </Text>
          </TouchableOpacity>
          <Text className="self-center text-sm font-axiformaRegular mt-3">
            Already A Member?
            <TouchableOpacity onPress={() => router.push("/sign-in")}>
              <Text className="font-axiformaBlack ml-1">Login</Text>
            </TouchableOpacity>
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SignUp;
