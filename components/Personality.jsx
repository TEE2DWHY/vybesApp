import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const Personality = ({ active, fn }) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="w-full px-4">
        {active === 1 && (
          <View className="mt-8">
            <Text className="bg-purple-darker text-white-normal text-center py-6 px-4 rounded-md font-axiformaBlack leading-6 mb-3">
              Complete Your Personality Profile To Be Able To Find Similar Match
              And To Be Identified By Vybers Or Baddies
            </Text>
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
            <Text className="bg-purple-darker text-white-normal text-center py-6 px-4 rounded-md font-axiformaBlack leading-6 mb-3">
              Lets continue your profile set-up by providing your contact
              details
            </Text>
            <Text className="text-center  font-axiformaRegular leading-5 text-xs text-[#47586E]">
              You selected
              <Text className="text-[#6BADA9]"> baddie </Text>
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
              <Text className="font-axiformaRegular ml-1 px-3 leading-4 text-[#909DAD]">
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
        <TouchableOpacity
          className="bg-purple-600 mt-8 py-4 rounded-3xl w-2/5 self-center"
          onPress={fn}
        >
          <Text className="text-center text-white-normal font-axiformaBlack">
            Next
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Personality;
