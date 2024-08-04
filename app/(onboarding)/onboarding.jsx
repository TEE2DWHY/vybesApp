import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import iphone from "../../assets/images/iPhone.png";
import multipleArrows from "../../assets/images/multipleArrows.png";

const Onboarding = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <SafeAreaView className="bg-white flex-1">
        <View className="flex-1 relative">
          <View className="flex-1 justify-center items-center">
            <Image
              source={iphone}
              className="w-[90%] self-center"
              resizeMode="contain"
            />
          </View>
          <View className="absolute bottom-0 w-full h-[40vh] bg-purple-darker rounded-tr-[80px] px-6 pt-10 z-20">
            <View className="flex-row items-center  mb-4">
              {[0, 1, 2].map((index) => (
                <View
                  key={index}
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
              ))}
            </View>

            <Text className="text-[28px] font-bold text-white-normal mb-2 font-axiformaBlack leading-[45.67px]">
              Are You Looking For The Right Match?
            </Text>
            <Text className="text-base text-white-normal font-axiformaLight font-light mb-6">
              With <Text className="text-purple-dark">Vybes</Text>, finding your
              perfect date is just a few steps and clicks away.
            </Text>
            <TouchableOpacity>
              <Image
                source={multipleArrows}
                className="w-[80px] h-[20px] self-center mb-8"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="flex-row justify-between px-6">
              <TouchableOpacity>
                <Text className="text-white-normal font-axiformaBlack">
                  Skip
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text className="text-white-normal font-axiformaBlack">
                  Arrow
                </Text>
                {/* <Image
                  source={arrowIcon}
                  className="w-[24px] h-[24px]"
                  resizeMode="contain"
                /> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Onboarding;
