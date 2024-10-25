import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
  Animated,
  Modal,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { userInstance } from "../../../../config/axios";
import { useEffect, useState } from "react";
import { getItem } from "../../../../utils/AsyncStorage";
import DateTimePicker from "@react-native-community/datetimepicker";
import HeightModal from "./HeightModal";
import GenderModal from "./GenderModal";
import WeightModal from "./WeightModal";

const Personality = ({ active, handleNext }) => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    userName: user?.userName || "",
    bio: user?.bio || "",
    accountType: user?.accountType || "",
    email: user?.email || "",
    phoneNumber: user?.phonNumber || "",
    location: user?.location || "",
    dateOfBirth: user?.dateOfBirth || "",
    availabilityStatus: user?.availabilityStatus || "",
    gender: user?.gender || "",
    height: user?.height || "",
    weight: user?.weight || "",
    premiumRate: user?.premiumRate || "",
  });
  const [authToken, setAuthToken] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [heightModal, setHeightModal] = useState(false);
  const [genderModal, setGenderModal] = useState(false);
  const [weightModal, setWeightModal] = useState(false);

  const slideAnim = useState(new Animated.Value(300))[0];

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setFormData({
      ...formData,
      dateOfBirth: currentDate.toISOString().split("T")[0],
    });
    setShow(false);
  };

  const showDatePicker = () => {
    setShow(!show);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await getItem("token");
        if (token) {
          setAuthToken(token);
          const userRoute = userInstance(token);
          const response = await userRoute.get("/get-user");
          setUser(response.data.payload.user);
          setFormData((prevData) => ({
            ...prevData,
            ...response.data.payload.user,
            dateOfBirth: response.data.payload.user?.dateOfBirth || "",
          }));
        }
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleModal = () => {
    setHeightModal(!heightModal);
    if (!heightModal) {
      // Slide up when opening the modal
      Animated.timing(slideAnim, {
        toValue: 0, // The animation moves slideAnim from 300 (off-screen) to 0 (fully on-screen). This brings the modal into view.
        duration: 300, // The animation takes 300 milliseconds.
        useNativeDriver: true, // This optimizes the animation by running it on the native thread for better performance.
      }).start();
    } else {
      // Slide down when closing the modal
      Animated.timing(slideAnim, {
        toValue: 300, // The modal slides from position 0 (on-screen) to 300 (off-screen). This hides the modal from view.
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const toggleGenderModal = () => {
    setGenderModal(!genderModal);
    if (!genderModal) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Slide down when closing the modal
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const toggleWeightModal = () => {
    setWeightModal(!weightModal);
    if (!weightModal) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-full">
          {active === 1 && (
            <View className="mt-8">
              <View className="bg-purple-darker py-6 px-4 rounded-2xl mb-3">
                <Text className=" text-white-normal text-center  font-axiformaBlack leading-6">
                  Complete Your Personality Profile To Be Able To Find Similar
                  Match And To Be Identified By Vybers Or Baddies
                </Text>
              </View>

              <View className="mt-4">
                <Text className="text-gray-500 font-axiformaBook">
                  Your Name
                </Text>
                <TextInput
                  placeholder="John Doe"
                  className="border-b border-gray-300 py-2 text-base font-axiformaRegular"
                  value={formData.fullName.toLowerCase()}
                  onChangeText={(value) => handleInputChange("fullName", value)}
                  editable={!user?.fullName}
                />
              </View>

              <View className="mt-4">
                <Text className="text-gray-500 font-axiformaBook">
                  Your User Name
                </Text>
                <TextInput
                  placeholder="Enter a Username Here"
                  className="border-b border-gray-300 py-2 text-base font-axiformaRegular"
                  onChangeText={(value) => handleInputChange("userName", value)}
                  value={formData.userName}
                  editable={!user?.userName}
                />
              </View>

              <View className="mt-4">
                <Text className="text-gray-500 font-axiformaBook">
                  Write A Little Bio About You
                </Text>
                <TextInput
                  placeholder="Make It Catchy And Be Expressive About It...."
                  className="border-b border-gray-300 py-2 text-base font-axiformaRegular"
                  onChangeText={(value) => handleInputChange("bio", value)}
                  value={formData.bio}
                  editable={!user?.bio}
                />
              </View>

              <View className="mt-8">
                <Text className="text-gray-500 font-axiformaBook leading-5">
                  Select Preferred Type Of Account To Create
                </Text>
                <View className="flex-row justify-between mt-2">
                  <TouchableOpacity
                    className={`flex-1 p-5 rounded-md mr-2 bg-[#E4D7F5] border-none ${
                      formData.accountType === "baddie" ? "bg-blue-600" : ""
                    }`}
                    onPress={() =>
                      setFormData({ ...formData, accountType: "baddie" })
                    }
                  >
                    <Text
                      className={`text-center text-[#C4B1F3] font-axiformaRegular ${
                        formData.accountType === "baddie"
                          ? " text-white-normal"
                          : ""
                      }`}
                    >
                      Baddie
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`flex-1 p-5 rounded-md ml-2 bg-[#D6DDFD] border-none ${
                      formData.accountType === "vyber"
                        ? "bg-blue-600 text-white-normal"
                        : ""
                    }`}
                    onPress={() =>
                      setFormData({ ...formData, accountType: "vyber" })
                    }
                  >
                    <Text
                      className={`text-center text-[#6274C7] font-axiformaRegular ${
                        formData.accountType === "vyber"
                          ? "text-white-normal"
                          : ""
                      }`}
                    >
                      Vyber
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => handleNext()}
                className="bg-purple-600 mt-8 py-4 rounded-3xl w-2/5 self-center mb-14"
              >
                <Text className="text-center text-white-normal text-base font-axiformaRegular">
                  Next
                </Text>
              </TouchableOpacity>
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
              {formData.accountType && (
                <Text className="text-center  font-axiformaRegular leading-5 text-xs text-[#47586E]">
                  You selected
                  <Text className="text-[#6BADA9] bg-[#D9F3F1] p-2">
                    {"  "}
                    {formData.accountType}
                    {"  "}
                  </Text>
                  as as your preferred account type
                </Text>
              )}
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
                  value={formData.email}
                  editable={!user?.email}
                  onChangeText={(value) => handleInputChange("email", value)}
                />
              </View>

              <View className="mt-4">
                <Text className="text-gray-500 font-axiformaBook">
                  Your Phone No
                </Text>
                <TextInput
                  placeholder="09032546781"
                  className="border-b border-gray-300 py-2 text-base font-axiformaRegular"
                  onChangeText={(value) =>
                    handleInputChange("phoneNumber", value)
                  }
                  editable={!user?.phoneNumber}
                  value={formData.phoneNumber}
                />
              </View>

              <View className="mt-4">
                <Text className="text-gray-500 font-axiformaBook">
                  Your Location/State /City
                </Text>
                <TextInput
                  placeholder="Abeokuta Ogun State"
                  className="border-b border-gray-300 py-2 text-base font-axiformaRegular"
                  onChangeText={(value) => handleInputChange("location", value)}
                  editable={!user?.location}
                  value={formData.location}
                />
              </View>
              <TouchableOpacity
                onPress={() => handleNext()}
                className="bg-purple-600 mt-8 py-4 rounded-3xl w-2/5 self-center mb-14"
              >
                <Text className="text-center text-white-normal text-base font-axiformaRegular">
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {active === 3 && (
            <View>
              <View className="mt-8">
                <View className="bg-purple-darker py-2 px-4 rounded-2xl mb-3">
                  <Text className="bg-purple-darker text-white-normal text-center py-4 px-4 font-axiformaBlack leading-6 mb-3 capitalize">
                    One More Section And You Are Ready To Vybe. Provide Details
                    On Your Relationship And Physical Characteristics
                  </Text>
                </View>
                {formData.accountType && (
                  <Text className="text-center  font-axiformaRegular leading-5 text-xs text-[#47586E]">
                    You selected
                    <Text className="text-[#6BADA9] bg-[#D9F3F1] p-2">
                      {"  "}
                      {formData.accountType}
                      {"  "}
                    </Text>
                    as your preferred account type
                  </Text>
                )}
                <Text className="text-center text-2xl font-axiformaBlack my-2">
                  Physical Characteristics
                </Text>

                <View className="mt-4 border-b border-gray-300">
                  <Text className="text-gray-500 font-axiformaBook">
                    Date of Birth
                  </Text>
                  <View className="flex-row items-center justify-between">
                    <TextInput
                      placeholder="YY/MM/DD"
                      className="py-2 text-base font-axiformaRegular"
                      editable={false}
                      value={formData.dateOfBirth}
                    />
                    <AntDesign
                      name="calendar"
                      size={24}
                      color="gray"
                      onPress={showDatePicker}
                    />
                  </View>

                  {show && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      onChange={onChange}
                      display={Platform.OS === "ios" ? "spinner" : "default"} // Customize display as needed
                    />
                  )}
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
                      {/* Available Button */}
                      <TouchableOpacity
                        className={`flex-1 bg-[#E6F3EC] p-3 rounded-md mr-2 ${
                          formData.availabilityStatus === "Available"
                            ? "bg-blue-600"
                            : ""
                        }`}
                        onPress={() =>
                          setFormData({
                            ...formData,
                            availabilityStatus: "Available",
                          })
                        }
                      >
                        <Text
                          className={`text-center text-[#3AB04D] font-axiformaRegular ${
                            formData.availabilityStatus === "Available"
                              ? "text-white-normal"
                              : ""
                          }`}
                        >
                          Available
                        </Text>
                      </TouchableOpacity>

                      {/* Not Available Button */}
                      <TouchableOpacity
                        className={`flex-1 bg-[#FBE8E7] p-3 rounded-md mx-2 ${
                          formData.availabilityStatus === "Not Available"
                            ? "bg-blue-600"
                            : ""
                        }`}
                        onPress={() =>
                          setFormData({
                            ...formData,
                            availabilityStatus: "Not Available",
                          })
                        }
                      >
                        <Text
                          className={`text-center text-[#E2341D] font-axiformaRegular ${
                            formData.availabilityStatus === "Not Available"
                              ? "text-white-normal"
                              : ""
                          }`}
                        >
                          Not Available
                        </Text>
                      </TouchableOpacity>

                      {/* Should Be Available In Next Hour Button */}
                      <TouchableOpacity
                        className={`flex-1 bg-[#F8F3E7] p-3 rounded-md ml-2 ${
                          formData.availabilityStatus ===
                          "Should Be Available In Next Hour"
                            ? "bg-blue-600"
                            : ""
                        }`}
                        onPress={() =>
                          setFormData({
                            ...formData,
                            availabilityStatus:
                              "Should Be Available In Next Hour",
                          })
                        }
                      >
                        <Text
                          className={`text-center text-[#F6C535] font-axiformaRegular ${
                            formData.availabilityStatus ===
                            "Should Be Available In Next Hour"
                              ? "text-white-normal"
                              : ""
                          }`}
                        >
                          Should Be Available In Next Hour
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>

                <View className="mt-4">
                  <View className="w-full flex-row items-center justify-between py-2">
                    <Text className="text-base font-axiformaRegular text-[#47586E]">
                      Your Assumed Height{" "}
                      {formData.height && `(${formData.height})`}{" "}
                      {!formData.height && `(m)`}
                    </Text>
                    <TouchableOpacity onPress={() => setHeightModal(true)}>
                      <AntDesign name="caretdown" size={18} color="gray" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View className="mt-4">
                  <View className="w-full flex-row items-center justify-between  py-2">
                    <Text className="text-base font-axiformaRegular text-[#47586E]">
                      Your Assumed Weight{" "}
                      {formData.weight && `(${formData.weight})`}{" "}
                      {!formData.weight && `(kg)`}
                    </Text>
                    <TouchableOpacity onPress={() => setWeightModal(true)}>
                      <AntDesign name="caretdown" size={18} color="gray" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View className="mt-4">
                  <View className="w-full flex-row items-center justify-between py-2">
                    <Text className="text-base font-axiformaRegular text-[#47586E]">
                      Gender {formData.gender && `(${formData.gender})`}
                    </Text>
                    <TouchableOpacity onPress={() => setGenderModal(true)}>
                      <AntDesign name="caretdown" size={18} color="gray" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => handleNext()}
                className="bg-purple-600 mt-8 py-4 rounded-3xl w-2/5 self-center mb-14"
              >
                <Text className="text-center text-white-normal text-base font-axiformaRegular">
                  Next
                </Text>
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={heightModal}
                animationType="fade"
              >
                {/* Backdrop */}
                <TouchableOpacity
                  className="flex-1 bg-[#1b1b1b67]"
                  onPress={toggleModal}
                  activeOpacity={1} // Dismiss modal on backdrop click
                />

                {/* Modal content sliding from the bottom */}
                <Animated.View
                  style={{
                    transform: [{ translateY: slideAnim }],
                  }}
                  className="absolute bottom-[300px] left-0 right-0"
                >
                  <HeightModal
                    fn={() => setHeightModal(false)}
                    selectedHeight={formData.height}
                    setSelectedHeight={(newHeight) =>
                      setFormData({ ...formData, height: newHeight })
                    }
                  />
                </Animated.View>
              </Modal>

              <Modal
                transparent={true}
                visible={genderModal}
                animationType="fade"
              >
                {/* Backdrop */}
                <TouchableOpacity
                  className="flex-1 bg-[#1b1b1b67]"
                  onPress={toggleGenderModal}
                  activeOpacity={1} // Dismiss modal on backdrop click
                />

                {/* Modal content sliding from the bottom */}
                <Animated.View
                  style={{
                    transform: [{ translateY: slideAnim }],
                  }}
                  className="absolute bottom-[300px] left-0 right-0"
                >
                  <GenderModal
                    fn={() => setGenderModal(false)}
                    gender={formData.gender}
                    setGender={(newGender) =>
                      setFormData({ ...formData, gender: newGender })
                    }
                  />
                </Animated.View>
              </Modal>

              <Modal
                transparent={true}
                visible={weightModal}
                animationType="fade"
              >
                {/* Backdrop */}
                <TouchableOpacity
                  className="flex-1 bg-[#1b1b1b67]"
                  onPress={toggleWeightModal}
                  activeOpacity={1}
                />

                <Animated.View
                  style={{
                    transform: [{ translateY: slideAnim }],
                  }}
                  className="absolute bottom-[300px] left-0 right-0"
                >
                  <WeightModal
                    fn={() => setWeightModal(false)}
                    selectedWeight={formData.weight}
                    setSelectedWeight={(newWeight) =>
                      setFormData({ ...formData, weight: newWeight })
                    }
                  />
                </Animated.View>
              </Modal>
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
                  What rate would you like to set to unlock access to your
                  profile for Vybers?
                </Text>
              </View>
              <View className="mt-4">
                <Text className="text-gray-500 font-axiformaBook">
                  VybeCoin
                </Text>
                <TextInput
                  placeholder="60 vybe coin"
                  className="border-b border-gray-300 py-2 text-base font-axiformaRegular"
                  onChangeText={(value) =>
                    handleInputChange("premiumRate", value)
                  }
                  value={formData.premiumRate}
                />
              </View>
              <Text className="mt-2 text-xs text-[#909DAD] font-axiformaBook">
                Vybers often choose rates between 50-70 Vybes Coins.
              </Text>
              <TouchableOpacity
                className="bg-purple-600 mt-8 py-4 rounded-3xl w-2/5 self-center mb-14"
                onPress={() => handleNext(formData)}
              >
                <Text className="text-center text-white-normal font-axiformaBlack">
                  {active === 4 ? "Complete" : "Next"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Personality;
