import { View, Text, TouchableOpacity, Image, Modal } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const ShareProfile = ({ closeModal, showProfile, userImage }) => {
  return (
    <>
      <Modal visible={showProfile} transparent={true} animationType="fade">
        <TouchableOpacity
          onPress={closeModal}
          className="flex-1 bg-[#1b1b1b67] justify-center items-center"
        />
        <View className="bg-purple-darker rounded-tl-[40px] rounded-tr-[40px] z-20 fixed bottom-0 p-6 mt-[-30px] w-full">
          <Image
            source={{ uri: userImage }}
            alt="user-image"
            className="rounded-full mt-4 w-[70px] h-[70px] self-center border-2 border-white-normal"
          />
          <View className="flex-row items-center justify-between mt-8">
            <View className="flex-row items-center gap-2">
              <Text className="capitalize text-white-normal font-axiformaRegular text-sm">
                Share Your Profile Via
              </Text>
              <AntDesign name="sharealt" size={20} color="#fff" />
            </View>

            <View className="flex-row items-center">
              <Text className="text-[#B2BBC6] font-axiformaRegular mr-2">
                Copy Link
              </Text>
              <Ionicons name="link-sharp" size={20} color="#9941EE" />
            </View>
          </View>
          <View className="bg-white-normal rounded-[8px] flex-wrap mt-4 p-3 border border-gray-300">
            <View className="w-full flex-row items-center justify-evenly mb-6">
              <TouchableOpacity className="items-center">
                <FontAwesome name="facebook-square" size={24} color="#000AFF" />
                <Text className="text-xs text-gray-800 font-axiformaRegular">
                  Facebook
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center">
                <Fontisto name="messenger" size={24} color="#B2BBC6" />
                <Text className="text-xs text-gray-800 font-axiformaRegular">
                  Messenger
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center">
                <FontAwesome6 name="tiktok" size={24} color="#3A1078" />
                <Text className="text-xs text-gray-800 font-axiformaRegular">
                  Tiktok
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center">
                <Entypo name="instagram" size={24} color="#3795BD" />
                <Text className="text-xs text-gray-800 font-axiformaRegular">
                  Instagram
                </Text>
              </TouchableOpacity>
            </View>
            <View className="w-full flex-row items-center justify-evenly mb-2">
              <TouchableOpacity className="items-center">
                <FontAwesome name="reddit" size={24} color="#FF8343" />
                <Text className="text-xs text-gray-800 font-axiformaRegular">
                  Reddit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center">
                <AntDesign name="linkedin-square" size={24} color="#3FA2F6" />
                <Text className="text-xs text-gray-800 font-axiformaRegular">
                  LinkedIn
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center">
                <Entypo name="twitter-with-circle" size={24} color="#1A2130" />
                <Text className="text-xs text-gray-800 font-axiformaRegular">
                  Twitter
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center">
                <FontAwesome5
                  name="whatsapp-square"
                  size={24}
                  color="#88D66C"
                />
                <Text className="text-xs text-gray-800">WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={closeModal}
            className="mt-4 border-t border-white-normal w-full items-center pt-4"
          >
            <Text className="font-axiformaRegular text-[#909DAD] text-sm">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default ShareProfile;
