import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import iphone from "../../assets/images/iphone.png";
import iphone2 from "../../assets/images/iphone2.png";
import iphone3 from "../../assets/images/iphone3.png";
import multipleArrows from "../../assets/images/multipleArrows.png";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Welcome = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <SafeAreaView className="bg-white flex-1">
        <View className="flex-1 relative">
          <View className="flex-1 justify-center items-center">
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
          <View className="absolute bottom-0 w-full h-[40vh] bg-purple-darker rounded-tr-[80px] px-6 pt-10 z-20">
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
                <Text className="text-[28px] font-bold text-white-normal mb-2 font-axiformaBlack leading-[45.67px]">
                  Are You Looking For The Right Match?
                </Text>
                <Text className="text-base text-white-normal font-axiformaLight font-light mb-6">
                  With{" "}
                  <Text className="text-purple-dark font-extrabold">Vybes</Text>
                  , finding your perfect date is just a few steps and clicks
                  away.
                </Text>
              </>
            )}

            {activeIndex === 1 && (
              <>
                <Text className="text-[28px] font-bold text-white-normal mb-2 font-axiformaBlack leading-[45.67px]">
                  Explore Your Desires
                </Text>
                <Text className="text-base text-white-normal font-axiformaLight font-light mb-6 text-justify">
                  Whether you're seeking passion, companionship, or just a
                  memorable night, our platform connects you with like-minded
                  individuals ready to explore.
                </Text>
              </>
            )}

            {activeIndex === 2 && (
              <>
                <Text className="text-[28px] font-bold text-white-normal mb-2 font-axiformaBlack leading-[45.67px]">
                  Unlock Opportunities And Empower Yourself.
                </Text>
                <Text className="text-base text-white-normal font-axiformaLight font-light mb-6 text-justify">
                  With vybes & dates creators have the option to create special
                  accounts for paid encounters.
                </Text>
              </>
            )}

            {(activeIndex === 0 || activeIndex === 1) && (
              <Image
                source={multipleArrows}
                className="w-[80px] h-[20px] self-center bottom-10absolute"
                resizeMode="contain"
              />
            )}

            {(activeIndex === 0 || activeIndex === 1) && (
              <View className="flex-row justify-between px-6 mt-8">
                <TouchableOpacity>
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
            )}

            {activeIndex === 2 && (
              <View className="flex-1 justify-center items-center">
                <TouchableOpacity className="self-center bg-purple-dark px-16 py-4 rounded-3xl flex-row items-center">
                  <Text className="text-white-normal font-axiformaBlack font-extrabold">
                    Now, Lets Get Started
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
      </SafeAreaView>
    </>
  );
};

export default Welcome;
