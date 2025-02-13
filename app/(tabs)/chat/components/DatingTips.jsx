import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ConversationModal from "./ConversationModal";
import Options from "./Options";

const DatingTips = ({
  showTips,
  tips,
  closeTips,
  userName,
  accountType,
  gender,
}) => {
  const [conversationOptions, setConversationOptions] = useState(false);
  const [step, setStep] = useState(0);
  gender === "male" ? "he" : "her";

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

  return (
    <ScrollView className="bg-gray-50 relative mb-20">
      <View className="bg-white-normal rounded-lg p-4 w-[90%] self-center mt-4 text-justify text-sm h-fit ">
        <Text className="font-axiformaRegular leading-6 capitalize text-[#47586E]">
          @{userName} accepted your request, {gender === "male" ? "he" : "she"}{" "}
          has a {accountType} profile, if you would like to know more off and
          likely answered questions from her profile, click below.
        </Text>
        <TouchableOpacity
          className="flex-row items-center  self-end mt-4"
          onPress={showTips}
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
      {conversationOptions && <Options />}

      {tips && (
        <ConversationModal
          step={step}
          closeModal={closeTips}
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
                      disabled={step === 1}
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
                  @{userName}
                </Text>{" "}
                wants you to know more about {gender === "male" ? "him" : "her"}{" "}
                here, this does not stop you from chatting about it with her ,
                you can but these are help tips you know her better to bring up
                conversations topics to weigh in when having conversations,{" "}
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
  );
};

export default DatingTips;
