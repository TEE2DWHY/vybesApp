import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import iphone from "../../assets/images/iphone.png";
import iphone2 from "../../assets/images/iphone2.png";
import iphone3 from "../../assets/images/iphone3.png";
import multipleArrows from "../../assets/images/multipleArrows.png";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { setItem } from "../../utils/AsyncStorage";

const Welcome = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await setItem("isAppLaunched", true);
    })();
  }, []);

  return (
    <SafeAreaView className={`flex-1 ${Platform.OS === "android" && "mt-10"}`}>
      <View className="flex-1 relative">
        <View className="flex-1 justify-center items-center">
          {/* Display images based on activeIndex */}
          {activeIndex === 0 && (
            <Image
              source={iphone}
              className="w-[90%] self-center mt-2"
              resizeMode="contain"
            />
          )}
          {activeIndex === 1 && (
            <Image
              source={iphone2}
              className="w-[90%] self-center mt-2"
              resizeMode="contain"
            />
          )}
          {activeIndex === 2 && (
            <Image
              source={iphone3}
              className="w-[90%] self-center mt-2"
              resizeMode="contain"
            />
          )}
        </View>

        <View
          className={`absolute bottom-0 w-full h-fit bg-purple-darker rounded-tr-[80px] ${
            Platform.OS === "android" ? "pt-4" : "pt-10"
          } px-6 z-20`}
        >
          <View className="flex-row items-center gap-2 mb-4">
            {[0, 1, 2].map((index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveIndex(index)}
              >
                <View
                  className={`w-4 h-4 mx-1 ${
                    activeIndex === index
                      ? "bg-white-normal rounded-full flex items-center justify-center"
                      : "w-2 h-2 bg-white-normal rounded-full"
                  }`}
                >
                  {activeIndex === index && (
                    <View className="w-2 h-2 bg-purple-darker rounded-full" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {activeIndex === 0 && (
            <>
              <Text className="text-[28px] text-white-normal mb-2 font-axiformaBlack leading-[45.67px]">
                Are You Looking For The Right Match?
              </Text>
              <Text className="text-base text-white-normal font-axiformaRegular font-light mb-6">
                With{" "}
                <Text className="text-purple-normal font-extrabold">Vybes</Text>
                , finding your perfect date is just a few steps and clicks away.
              </Text>
            </>
          )}

          {activeIndex === 1 && (
            <>
              <Text className="text-[28px] text-white-normal mb-2 font-axiformaBlack leading-[45.67px]">
                Explore Your Desires
              </Text>
              <Text className="text-base text-white-normal font-axiformaRegular font-light mb-6 text-justify">
                Whether you're seeking passion, companionship, or just a
                memorable night, our platform connects you with like-minded
                individuals ready to explore.
              </Text>
            </>
          )}

          {activeIndex === 2 && (
            <>
              <Text className="text-[24px] text-white-normal mb-2 font-axiformaBlack leading-[45.67px]">
                Unlock Opportunities And Empower Yourself.
              </Text>
              <Text className="text-base text-white-normal font-axiformaRegular font-light mb-6 text-justify">
                With Vybes & dates, creators have the option to create special
                accounts for paid encounters.
              </Text>
            </>
          )}

          {(activeIndex === 0 || activeIndex === 1) && (
            <>
              <Image
                source={multipleArrows}
                className="w-[80px] h-[20px] self-center bottom-10 absolute"
                resizeMode="contain"
              />
              <View className="flex-row justify-between px-6 mt-8 pb-2">
                <TouchableOpacity onPress={() => router.push("/sign-up")}>
                  <Text className="text-white-normal font-axiformaBlack">
                    Skip
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setActiveIndex(activeIndex + 1)}
                >
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </>
          )}

          {activeIndex === 2 && (
            <View className="flex-1 justify-center items-center">
              <TouchableOpacity
                className="self-center bg-purple-dark px-16 py-4 mb-3 rounded-3xl flex-row items-center"
                onPress={() => router.push("/sign-in")}
              >
                <Text className="text-white-normal font-axiformaBlack">
                  Now, Let’s Get Started
                </Text>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size={18}
                  color="white"
                  style={{ marginLeft: 8, marginTop: -3 }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <StatusBar backgroundColor="#ffffff" style="dark" />
    </SafeAreaView>
  );
};

export default Welcome;
