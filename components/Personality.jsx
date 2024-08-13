import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const Personality = ({ active, handleNext }) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="w-full px-4">
        {active === 1 && (
          <View className="mt-8">
            <View className="bg-purple-darker py-6 px-4 rounded-2xl mb-3">
              <Text className=" text-white-normal text-center  font-axiformaBlack leading-6">
                Complete Your Personality Profile To Be Able To Find Similar
                Match And To Be Identified By Vybers Or Baddies
              </Text>
            </View>

            <View className="mt-4">
              <Text className="text-gray-500 font-axiformaBook">Your Name</Text>
              <TextInput
                placeholder="John Doe"
                className="border-b border-gray-300 py-2 text-base font-axiformaRegular"
              />
            </View>

            <View className="mt-4">
              <Text className="text-gray-500 font-axiformaBook">
                Your User Name
              </Text>
              <TextInput
                placeholder="12ab34cd56ef78gh"
                className="border-b border-gray-300 py-2 text-base font-axiformaRegular"
              />
            </View>

            <View className="mt-4">
              <Text className="text-gray-500 font-axiformaBook">
                Write A Little Bio About You
              </Text>
              <TextInput
                placeholder="Make It Catchy And Be Expressive About It...."
                className="border-b border-gray-300 py-2 text-base font-axiformaRegular"
              />
            </View>

            <View className="mt-8">
              <Text className="text-gray-500 font-axiformaBook">
                Select Preferred Type Of Account To Create
              </Text>
              <View className="flex-row justify-between mt-2">
                <TouchableOpacity className="flex-1 p-5 rounded-md mr-2 bg-[#E4D7F5] border-none">
                  <Text className="text-center text-[#C4B1F3] font-axiformaRegular">
                    Baddie
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 p-5 rounded-md ml-2 bg-[#D6DDFD] border-none">
                  <Text className="text-center text-[#6274C7] font-axiformaRegular">
                    Vyber
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {active === 2 && (
          <View className="mt-8">
            <View className="bg-purple-darker py-6 px-4 rounded-2xl mb-3">
              <Text className="bg-purple-darker text-white-normal text-center py-2 px-4 rounded-md font-axiformaBlack leading-6 mb-3">
                Lets continue your profile set-up by providing your contact
                details
              </Text>
            </View>
            <Text className="text-center  font-axiformaRegular leading-5 text-xs text-[#47586E]">
              You selected
              <Text className="text-[#6BADA9] bg-[#D9F3F1] p-2"> baddie </Text>
              as as your preferred account type
            </Text>
            <Text className="text-center text-2xl font-axiformaBlack my-2">
              Contact Details
            </Text>
            <View className="flex-row items-center">
              <AntDesign
                name="exclamationcircleo"
                size={24}
                style={{ color: "#FFB053" }}
              />
              <Text className="font-axiformaRegular ml-1 px-3 leading-4 text-[#909DAD] mt-2">
                All your contact details are kept private and not displayed
                until displayed by you
              </Text>
            </View>
            <View className="mt-4">
              <Text className="text-gray-500 font-axiformaBook">
                Your Email
              </Text>
              <TextInput
                placeholder="John@gmail.com"
                className="border-b border-gray-300 py-2 text-base font-axiformaRegular"
              />
            </View>

            <View className="mt-4">
              <Text className="text-gray-500 font-axiformaBook">
                Your Phone No
              </Text>
              <TextInput
                placeholder="09032546781"
                className="border-b border-gray-300 py-2 text-base font-axiformaRegular"
              />
            </View>

            <View className="mt-4">
              <Text className="text-gray-500 font-axiformaBook">
                Your Location/State /City
              </Text>
              <TextInput
                placeholder="Abeokuta Ogun State"
                className="border-b border-gray-300 py-2 text-base font-axiformaRegular"
              />
            </View>
          </View>
        )}
        {active === 3 && (
          <View className="mt-8">
            <View className="bg-purple-darker py-2 px-4 rounded-2xl mb-3">
              <Text className="bg-purple-darker text-white-normal text-center py-4 px-4 font-axiformaBlack leading-6 mb-3 capitalize">
                One More Sections And You Are Ready To Vybe. Provide Details On
                Your Relationship And Physical Characteristics
              </Text>
            </View>
            <Text className="text-center  font-axiformaRegular leading-5 text-xs text-[#47586E]">
              You selected
              <Text className="text-[#6BADA9] bg-[#D9F3F1] p-2"> baddie </Text>
              as as your preferred account type
            </Text>
            <Text className="text-center text-xl font-axiformaBlack my-2 capitalize">
              Physical And Relationship Details
            </Text>
            <View className="flex-row items-center justify-center mt-2 mb-4">
              <AntDesign
                name="exclamationcircleo"
                size={20}
                style={{ color: "#FFB053" }}
              />
              <Text className="font-axiformaRegular ml-2 leading-6 text-[#909DAD] text-xs">
                Your Age, Availability Status, Height, Weight Details Would Be
                Displayed Once Vybers Click On Profile.
              </Text>
            </View>
            <View className="mt-4">
              <Text className="text-gray-500 font-axiformaBook">
                Your Date Of Birth
              </Text>
              <View className="w-full flex-row items-center justify-between border-b border-gray-300 py-2">
                <TextInput
                  className="text-base font-axiformaRegular text-[#47586E] w4/6"
                  placeholder="11-Aug-1950"
                />
                <TouchableOpacity>
                  <AntDesign name="calendar" size={24} color="gray" />
                </TouchableOpacity>
              </View>
            </View>

            <Text className="text-gray-500 font-axiformaBook mt-5">
              Your Availability Status
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-2"
            >
              <View className="mt-1">
                <View className="flex-row justify-between mt-2">
                  <TouchableOpacity className="flex-1 bg-[#E6F3EC] p-3 rounded-md mr-2">
                    <Text className="text-center text-[#3AB04D]">
                      Available
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-1 bg-[#FBE8E7] p-3 rounded-md mx-2">
                    <Text className="text-center text-[#E2341D]">
                      Not Available
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-1 bg-[#F8F3E7] p-3 rounded-md ml-2">
                    <Text className="text-center text-[#F6C535]">
                      Should Be Available In Next Hour
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>

            <View className="mt-4">
              <View className="w-full flex-row items-center justify-between py-2">
                <Text className="text-base font-axiformaRegular text-[#47586E]">
                  Your Assumed Height (m)
                </Text>
                <TouchableOpacity>
                  <AntDesign name="caretdown" size={18} color="gray" />
                </TouchableOpacity>
              </View>
            </View>

            <View className="mt-4">
              <View className="w-full flex-row items-center justify-between  py-2">
                <Text className="text-base font-axiformaRegular text-[#47586E]">
                  Your Assumed Weight (Kg)
                </Text>
                <TouchableOpacity>
                  <AntDesign name="caretdown" size={18} color="gray" />
                </TouchableOpacity>
              </View>
            </View>

            <View className="mt-4">
              <View className="w-full flex-row items-center justify-between py-2">
                <Text className="text-base font-axiformaRegular text-[#47586E]">
                  Gender
                </Text>
                <TouchableOpacity>
                  <AntDesign name="caretdown" size={18} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {active === 4 && (
          <View className="mt-8">
            <View className="bg-purple-darker py-3 px-4 rounded-2xl mb-3">
              <Text className="bg-purple-darker text-white-normal text-center py-4 px-4 font-axiformaBlack leading-6 mb-3 capitalize">
                Finally, Set your rate and attract Vybers who crave access to
                your amazing profile.
              </Text>
            </View>
            <Text className="text-center text-xl font-axiformaBlack my-2 capitalize mt-6">
              set up your premium rate
            </Text>
            <View className="flex-row items-center justify-center mt-2 mb-4">
              <AntDesign
                name="exclamationcircleo"
                size={20}
                style={{ color: "#FFB053" }}
              />
              <Text className="font-axiformaRegular ml-2 leading-6 text-[#909DAD] text-xs">
                What rate would you like to set to unlock access to your profile
                for Vybers?
              </Text>
            </View>
            <View className="mt-4">
              <Text className="text-gray-500 font-axiformaBook">VybeCoin</Text>
              <TextInput
                placeholder="60 vybe coin"
                className="border-b border-gray-300 py-2 text-base font-axiformaRegular"
              />
            </View>
            <Text className="mt-2 text-xs text-[#909DAD] font-axiformaBook">
              Vybers often choose rates between 50-70 Vybes Coins.
            </Text>
          </View>
        )}

        <TouchableOpacity
          className="bg-purple-600 mt-8 py-4 rounded-3xl w-2/5 self-center"
          onPress={handleNext}
        >
          <Text className="text-center text-white-normal font-axiformaBlack">
            {active === 4 ? "Complete" : "Next"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Personality;
