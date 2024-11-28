import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, SafeAreaView, Text, TextInput, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const AddStory = () => {
  const { uri } = useLocalSearchParams();
  const decodedUri = decodeURIComponent(uri);

  const icons = [
    {
      icon: <Ionicons name="videocam" size={24} color="#546881" />,
      text: "video",
    },
    {
      icon: <Ionicons name="musical-notes-sharp" size={24} color="#546881" />,
      text: "music",
    },
    {
      icon: (
        <MaterialCommunityIcons name="text-shadow" size={24} color="#546881" />
      ),
      text: "text",
    },
    {
      icon: <FontAwesome5 name="images" size={24} color="#546881" />,
      text: "photo",
    },
  ];

  return (
    <SafeAreaView className="h-full">
      <View className="relative">
        <View className="mt-6 absolute z-10 ml-4">
          <AntDesign
            name="left"
            size={24}
            color="#fff"
            onPress={() => router.back()}
          />
        </View>
        <View className="absolute top-[30%] right-4 z-10">
          {icons.map((icon, index) => (
            <View className="mb-6" key={index}>
              <View className="bg-white-normal p-1 items-center justify-center rounded-md">
                {icon.icon}
              </View>
              <Text className="font-axiformaRegular text-[10px] mt-2 ml-1 text-white-normal capitalize">
                {icon.text}
              </Text>
            </View>
          ))}
        </View>
        <Image
          source={{
            uri: "https://s3-alpha-sig.figma.com/img/0adf/1e8b/f4a6968c88d687eab196052a14b6b656?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FmK3Mw5J0ycvX0zTSehDeMP9ghNGHfvryHTukErat0eCoSg1zQD~24TBeBC41Z9xz3J-NZi-33r6JdLXhO75NqVZhbtgjykkt4kskQhPSxcvgOjCcfQ7Qg73NwG5q4wQaLKN8lqPy2F-kaMEgysutx5SugybDokCfNbEKHvHn~yojVp7OE1n-NBHtV-xHzrCVEPqfQLxOCpBb-m5A4~uPqQhrWPq3X0WRnsjud4kQO6IH-VCz78~FEE7RTnLgHZay3Qc4sciEyW~Hi4iRQbZ6RD4OTThnmmS8Ph8e6RGLVs7bUtG5Tf-WEDXj6Uvw6-BIHfslmtbdDQHvAHeO1~XZQ__",
          }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute bottom-10 justify-center items-center w-full">
          <MaterialIcons name="keyboard-arrow-up" size={34} color="#fff" />
          <Text className="capitalize font-axiformaRegular text-white-normal z-10 bg-transparent my-2">
            who can see my stories
          </Text>
          <View className="w-[95%] bg-white-normal rounded-lg p-3 mt-2 flex-row items-center justify-between shadow-sm">
            <TextInput
              placeholder="A Caption Makes Your Post Get Well Noticed"
              className="font-axiformaRegular text-sm"
              placeholderTextColor="#909DAD"
            />
            <MaterialCommunityIcons
              name="send-outline"
              size={24}
              color="#9941EE"
            />
          </View>
        </View>
      </View>
      <StatusBar style="dark" backgroundColor="#fffff" />
    </SafeAreaView>
  );
};

export default AddStory;
