import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as DocumentPicker from "expo-document-picker";
import { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import ConversationModal from "./components/ConversationModal";

const Conversation = () => {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(0);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();
      if (parent) {
        parent.setOptions({
          tabBarStyle: { display: "none" },
        });

        return () => {
          parent.setOptions({
            tabBarStyle: undefined,
          });
        };
      }
    }, [navigation])
  );

  const handleNext = () => {
    if (step < 10) {
      setStep((prevState) => prevState + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep((prevState) => prevState - 1);
    }
  };

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg", "/images/jpeg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    } else {
      setTimeout(() => {
        console.log("nothing selected");
      }, 100);
    }
  };

  return (
    <>
      <SafeAreaView className="bg-white-normal h-full">
        <View className="flex-row items-center justify-between py-4 px-4">
          <View className="flex-row gap-3 items-center">
            <AntDesign
              name="left"
              size={24}
              color="#546881"
              onPress={() => router.push("/chat")}
            />
            <View className="flex-row items-center ml-2">
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/women/3.jpg",
                }}
                className="w-10 h-10 rounded-full"
              />
              <Text className="ml-2 text-[#6890BF] font-axiformaBlack capitalize">
                @dhemmexroxy
              </Text>
            </View>
          </View>
          <View className="flex-row gap-6">
            <AntDesign name="videocamera" size={24} color="#7A91F9" />
            <Ionicons name="call-outline" size={24} color="#7A91F9" />
            <Entypo name="dots-three-vertical" size={24} color="#7A91F9" />
          </View>
        </View>

        <ScrollView className="bg-gray-50 flex-1 relative">
          <View className="bg-white-normal rounded-lg p-4 w-[90%] self-center mt-10 text-justify">
            <Text className="font-axiformaRegular leading-6 capitalize text-[#47586E]">
              @dhemmexroxy accepted your request, she has a baddie profile, if
              you would like to know more off and likely answered questions from
              her profile, click below.
            </Text>
            <TouchableOpacity
              className="flex-row items-center  self-end mt-4"
              onPress={() => setShowModal(true)}
            >
              <Text className="font-axiformaRegular text-[#9941EE] capitalize mr-1">
                see her dating tips and interest
              </Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="#9941EE"
              />
            </TouchableOpacity>
          </View>

          {showModal && (
            <ConversationModal
              step={step}
              closeModal={() => setShowModal(false)}
              handleNext={() => setStep((prevState) => prevState + 1)}
              header={
                step === 0 ? (
                  <Text className="capitalize font-axiformaBlack text-lg mt-6">
                    likely date questions, answers and tips.
                  </Text>
                ) : (
                  (step === 1 ||
                    step === 2 ||
                    step == 3 ||
                    step === 4 ||
                    step === 5 ||
                    step === 6 ||
                    step === 7 ||
                    step === 8 ||
                    step === 9 ||
                    step === 10) && (
                    <>
                      <View className="flex-row  items-center justify-between w-full mt-8">
                        <Ionicons
                          name="chevron-back-circle-outline"
                          size={24}
                          disabled={step === 1 ? "true" : "false"}
                          color="black"
                          onPress={() => handlePrevious()}
                        />
                        <Text className="font-axiformaRegular text-[#A3ADBB]">
                          Tip {step}/10
                        </Text>
                        <Ionicons
                          name="chevron-forward-circle-outline"
                          size={24}
                          color={step === 10 ? "gray" : ""}
                          onPress={() => handleNext()}
                        />
                      </View>
                      <View
                        className={`w-[100%] mt-6 ${
                          step === 1
                            ? "bg-[#6890BF]"
                            : step === 2
                            ? "bg-[#FFB053]"
                            : step === 3
                            ? "bg-[#000AFF]"
                            : step === 4
                            ? "bg-[#7A91F9]"
                            : step === 5
                            ? "bg-[#919fe0]"
                            : step === 6
                            ? "bg-[#FF8674]"
                            : step === 7
                            ? "bg-[#EE5D2D]"
                            : step === 8
                            ? "bg-[#6DD3E1]"
                            : step === 9
                            ? "bg-[#7A91F9]"
                            : step === 10
                            ? "bg-[#D8ACB2]"
                            : ""
                        }  p-4 rounded-xl`}
                      >
                        <Text
                          className={`capitalize ${
                            step === 1
                              ? "text-white-normal"
                              : step === 2
                              ? "text-[#1b1b1b]"
                              : step === 3
                              ? "text-white-normal"
                              : step === 4
                              ? "text-white-normal"
                              : step === 5
                              ? "text-white-normal"
                              : step === 6
                              ? "text-white-normal"
                              : step === 7
                              ? "text-white-normal"
                              : step === 8
                              ? "text-black-darker"
                              : step === 9
                              ? "text-white-normal"
                              : step === 10
                              ? "text-white-normal"
                              : ""
                          }  font-axiformaBlack leading-5`}
                        >
                          {step === 1
                            ? "q1. what interests my fancy?"
                            : step === 2
                            ? "q2. where did you school?"
                            : step === 3
                            ? "q3. are you an introvert or extrovert?"
                            : step === 4
                            ? "q4. am i a kid lover ?"
                            : step === 5
                            ? "q5. am i a smoker ?"
                            : step === 6
                            ? "q6. i don't take strong alcohol such as?"
                            : step === 7
                            ? "q7. whats my star sign ?"
                            : step === 8
                            ? "q8. whats my type of pets?"
                            : step === 9
                            ? "q9. whats your religion?"
                            : step === 10
                            ? "q10. what are you bad at?"
                            : ""}
                        </Text>
                      </View>
                    </>
                  )
                )
              }
              content={
                step === 0 ? (
                  <Text className="font-axiformaRegular leading-5 mt-5 text-[#546881] text-justify">
                    <Text className="text-[#9941EE] font-extrabold">
                      @Dhemmexroxy
                    </Text>{" "}
                    wants you to know more about her here, this does not stop
                    you from chatting about it with her , you can but these are
                    help tips you know her better to bring up conversations
                    topics to weigh in when having conversations,{" "}
                    <Text className="text-[#1b1b1b] font-extrabold">
                      Click next
                    </Text>{" "}
                    to see likely questions and tips
                  </Text>
                ) : (
                  <View className="mt-8 w-[85%]">
                    <Text className="capitalize font-axiformaRegular text-[#546881] leading-5">
                      {step === 1 ? (
                        "my interest includes"
                      ) : step === 2 ? (
                        "i am currently a student of chemistry department in"
                      ) : step == 3 ? (
                        "i am an introvert"
                      ) : step == 4 ? (
                        "Yeah , i love children a lot and would prefer to have 3 kids"
                      ) : step === 5 ? (
                        "I take cigarettes only"
                      ) : step === 6 ? (
                        "i don't take strong alcohol such as"
                      ) : step === 7 ? (
                        <>
                          <View className="flex-row items-center gap-2">
                            <Text className="capitalize  font-axiformaRegular">
                              i am
                            </Text>
                            <View className="border p-2 border-[#FFF3F1] bg-[#FFD9D4]">
                              <Text className="capitalize font-axiformaRegular   text-[#CC6B5D]">
                                Aries
                              </Text>
                            </View>
                          </View>
                        </>
                      ) : step === 8 ? (
                        "i love dogs."
                      ) : step === 9 ? (
                        <>
                          <View className="flex-row items-center gap-2">
                            <Text className="capitalize font-axiformaRegular">
                              i am a
                            </Text>
                            <View className="border p-2 border-[#6274C7] bg-[#BFC8F6]">
                              <Text className="capitalize font-axiformaRegular   text-[#6274C7]">
                                Christian
                              </Text>
                            </View>
                          </View>
                        </>
                      ) : step === 10 ? (
                        "i'm very bad at"
                      ) : (
                        ""("")
                      )}
                    </Text>
                    <View className="flex-row flex-wrap items-center gap-2 w-full mt-2">
                      {step === 1 ? (
                        <>
                          <View className="whitespace-nowrap border p-2 border-[#6F9ACB] bg-[#DBEBFF]">
                            <Text className="text-[#6F9ACB] font-axiformaBlack">
                              Movies
                            </Text>
                          </View>
                          <View className="whitespace-nowrap border p-2 border-[#6F9ACB] bg-[#DBEBFF]">
                            <Text className="text-[#6F9ACB] font-axiformaBlack">
                              Cycling
                            </Text>
                          </View>
                          <View className="whitespace-nowrap border p-2 border-[#6F9ACB] bg-[#DBEBFF]">
                            <Text className="text-[#6F9ACB] font-axiformaBlack">
                              Football
                            </Text>
                          </View>
                          <View className="whitespace-nowrap border p-2 border-[#6F9ACB] bg-[#DBEBFF]">
                            <Text className="text-[#6F9ACB] font-axiformaBlack">
                              Reading
                            </Text>
                          </View>
                          <View className="whitespace-nowrap border p-2 border-[#6F9ACB] bg-[#DBEBFF]">
                            <Text className="text-[#6F9ACB] font-axiformaBlack">
                              Gaming
                            </Text>
                          </View>
                          <View className="whitespace-nowrap border p-2 border-[#6F9ACB] bg-[#DBEBFF]">
                            <Text className="text-[#6F9ACB] font-axiformaBlack">
                              Cooking
                            </Text>
                          </View>
                        </>
                      ) : step === 2 ? (
                        <>
                          <View className="border p-2 border-[#FFE7CA] bg-[#FFF7EE]">
                            <Text className="font-axiformaRegular  text-[#734F25]">
                              Federal University of Agriculture Abeokuta
                            </Text>
                          </View>
                          <View className="border p-2 border-[#FFE7CA] bg-[#FFF7EE]">
                            <Text className="font-axiformaRegular  text-[#734F25]">
                              400L
                            </Text>
                          </View>
                          <View className="border p-2 border-[#FFE7CA] bg-[#FFF7EE]">
                            <Text className="font-axiformaRegular  text-[#734F25]">
                              Vice President
                            </Text>
                          </View>
                          <View className="border p-2 border-[#FFE7CA] bg-[#FFF7EE]">
                            <Text className="font-axiformaRegular  text-[#734F25]">
                              Head Of Class
                            </Text>
                          </View>
                        </>
                      ) : step === 3 ? (
                        ""
                      ) : step === 4 ? (
                        <>
                          <View className="border p-2 border-[#6274C7] bg-[#F2F4FE]">
                            <Text className="font-axiformaRegular  text-[#6274C7]">
                              Boys
                            </Text>
                          </View>
                          <View className="border p-2 border-[#6274C7] bg-[#F2F4FE]">
                            <Text className="font-axiformaRegular  text-[#6274C7]">
                              Girls
                            </Text>
                          </View>
                        </>
                      ) : step === 5 ? (
                        ""
                      ) : step === 6 ? (
                        <>
                          <View className="border p-2 border-[#FFF3F1] bg-[#FFD9D4]">
                            <Text className="font-axiformaRegular  text-[#CC6B5D]">
                              Four Cousins
                            </Text>
                          </View>
                          <View className="border p-2 border-[#FFF3F1] bg-[#FFD9D4]">
                            <Text className="font-axiformaRegular  text-[#CC6B5D]">
                              Origin
                            </Text>
                          </View>
                          <View className="border p-2 border-[#FFF3F1] bg-[##CC6B5D]">
                            <Text className="font-axiformaRegular  text-[#CC6B5D]">
                              Coco Samba
                            </Text>
                          </View>
                          <View className="border p-2 border-[#FFF3F1] bg-[#FFD9D4]">
                            <Text className="font-axiformaRegular  text-[#CC6B5D]">
                              Magic Moment
                            </Text>
                          </View>
                          <View className="border p-2 border-[#FFF3F1] bg-[#FFD9D4]">
                            <Text className="font-axiformaRegular  text-[#CC6B5D]">
                              Hennessy
                            </Text>
                          </View>
                        </>
                      ) : step === 7 ? (
                        ""
                      ) : step === 8 ? (
                        <>
                          <View className="border p-2 border-[#57A9B4] bg-[#F0FBFC]">
                            <Text className="font-axiformaRegular  text-[#57A9B4]">
                              German Shepard
                            </Text>
                          </View>
                          <View className="border p-2 border-[#57A9B4] bg-[#F0FBFC]">
                            <Text className="font-axiformaRegular  text-[#57A9B4]">
                              Rotweiller
                            </Text>
                          </View>
                          <View className="border p-2 border-[#57A9B4] bg-[#F0FBFC]">
                            <Text className="font-axiformaRegular  text-[#57A9B4]">
                              Caucassian
                            </Text>
                          </View>
                          <View className="border p-2 border-[#57A9B4] bg-[#F0FBFC]">
                            <Text className="font-axiformaRegular  text-[#57A9B4]">
                              Eskimo
                            </Text>
                          </View>
                          <View className="border p-2 border-[#57A9B4] bg-[#F0FBFC]">
                            <Text className="font-axiformaRegular  text-[#57A9B4]">
                              Lhasa Aspo
                            </Text>
                          </View>
                        </>
                      ) : step === 9 ? (
                        ""
                      ) : step === 10 ? (
                        <>
                          <View className="border p-2 border-[#4C3C3E] bg-[#F3E5E7]">
                            <Text className="font-axiformaRegular  text-[#4C3C3E]">
                              Exercising
                            </Text>
                          </View>
                          <View className="border p-2 border-[#4C3C3E] bg-[#F3E5E7]">
                            <Text className="font-axiformaRegular  text-[#4C3C3E]">
                              Eating In Public
                            </Text>
                          </View>
                          <View className="border p-2 border-[#4C3C3E] bg-[#F3E5E7]">
                            <Text className="font-axiformaRegular  text-[#4C3C3E]">
                              Replying Chats
                            </Text>
                          </View>
                        </>
                      ) : (
                        ""
                      )}
                    </View>
                  </View>
                )
              }
            />
          )}
        </ScrollView>

        {!showModal && (
          <View className="absolute bottom-8 left-0 right-0 flex-row items-center justify-between w-[93%] bg-white-normal p-4 rounded-md self-center mb-4 mx-4">
            <View className="flex-row items-center gap-4 flex-1">
              <Entypo name="attachment" size={24} color="#B2BBC6" />

              <TextInput
                className="text-[#3D4C5E] font-axiformaRegular flex-1"
                placeholder="Type a Message..."
                multiline={true}
                textAlignVertical="top"
              />
            </View>
            <View className="flex-row items-center gap-4 ml-2">
              <AntDesign name="camera" size={24} color="#B2BBC6" />
              <MaterialIcons name="keyboard-voice" size={24} color="#9941EE" />
            </View>
          </View>
        )}

        <StatusBar backgroundColor="#fff" style="dark" />
      </SafeAreaView>
    </>
  );
};

export default Conversation;
