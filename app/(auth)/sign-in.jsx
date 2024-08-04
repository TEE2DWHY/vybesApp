import { useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import userImages from "../../assets/images/user-images.png";
import logoTwo from "../../assets/images/logo2.png";
import union from "../../assets/images/union.png";

const SignIn = () => {
  const [section, setSection] = useState(1);
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
      {section === 1 && (
        <View className="bg-white-normal h-full -mt-[50px] pt-5 rounded-tr-[80px]">
          <Text className="self-center text-2xl font-axiformaBlack mt-3">
            Let's Know Your Gender
          </Text>
          <Text className="self-center text-sm font-axiformaLight mt-2 px-5 text-center">
            Selecting Your Gender Helps You Find Your Right Type Of Vybe.
          </Text>
          <View className="mt-5 px-5">
            <TouchableOpacity className="border border-blue-300 rounded-full py-4 px-6 mb-4 flex-row items-center justify-between">
              <Text className="text-purple-darker text-base font-axiformaBlack">
                Male
              </Text>
              <Text className="text-purple-darker text-base">♂️</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-blue-300 rounded-full py-4 px-6 mb-4 flex-row items-center justify-between">
              <Text className="text-purple-darker text-base font-axiformaBlack">
                Female
              </Text>
              <Text className="text-purple-darker text-lg">♀️</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-blue-300 rounded-full py-4 px-6 mb-4 flex-row items-center justify-between">
              <Text className="text-white text-base font-axiformaBlack">
                Non-Binary
              </Text>
              <Text className="text-white text-lg">⚧️</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="self-center bg-purple-dark rounded-full py-4 px-20 mt-5 w-[90%]"
            onPress={() => setSection(2)}
          >
            <Text className="text-white-normal text-lg text-center font-axiformaBlack">
              Next
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SignIn;
