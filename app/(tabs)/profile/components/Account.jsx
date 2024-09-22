import { Text, TouchableOpacity, View, Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Account = () => {
  return (
    <>
      <View className="items-center mt-4">
        <Text className="capitalize font-axiformaBlack text-xl my-3">
          @WhistleDown112
        </Text>
        <Image
          source={{
            uri: "https://plus.unsplash.com/premium_photo-1673792686302-7555a74de717?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          className="w-[150px] h-[150px] rounded-[80px] border-[10px]  border-[#EEF6FF]"
        />
      </View>

      <View className="mt-4">
        <View className="flex-row justify-between">
          <Text className="font-axiformaBlack text-lg">
            Account Information
          </Text>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-purple-dark opacity-50 font-axiformaBlack">
              Edit
            </Text>
            <AntDesign
              name="edit"
              size={24}
              style={{ color: "#7a31b3", opacity: 0.5 }}
            />
          </TouchableOpacity>
        </View>
        <View className="p-4 mt-2 rounded-lg border-[#FFFFFF] border-2">
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2 mt-3">
            <Text className="text-[#546881] font-axiformaBlack">Name:</Text>
            <Text className="font-axiformaBlack">Penelope Bridgerton</Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaBlack">UserName:</Text>
            <Text className="font-axiformaBlack"> @WhistleDown</Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaBlack">
              Date Of Birth:
            </Text>
            <Text className="font-axiformaBlack"> 12-Aug-1990</Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaBlack">
              Account Type:
            </Text>
            <Text className="font-axiformaBlack">Vyber</Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaBlack">Password:</Text>
            <Text className="font-axiformaBlack"> 12ab34cd56ef</Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaBlack">
              Wallet Balance:
            </Text>
            <Text className="font-axiformaBlack">15,000 Vybes Coin</Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaBlack">
              Gifted Coins:
            </Text>
            <Text className="font-axiformaBlack">5,000 Vybes Coin</Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaBlack">
              Subscribers:
            </Text>
            <Text className="font-axiformaBlack"> 15</Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaBlack">E-Mail:</Text>
            <Text className="font-axiformaBlack">Pen...Bridge@gmail.com.</Text>
          </View>
          <View className="flex-row justify-between mb-4 border-b-[#E9E9EB] border-b-[1px] pb-2">
            <Text className="text-[#546881] font-axiformaBlack">Phone No:</Text>
            <Text className="font-axiformaBlack">08167715252</Text>
          </View>
        </View>
      </View>

      <Text className="font-axiformaBlack mt-8 text-lg">
        Penelope Bridgerton
      </Text>

      <View className="mt-4">
        <Text className="font-axiformaBook text-sm text-[#546881] mb-3">
          Bio Description
        </Text>
        <View className="border py-8 px-4 mt-2 rounded-lg flex-row justify-between">
          <View className="w-1/2 pr-2">
            <Text className="text-center font-axiformaBlack text-[#546881] mb-3">
              Following
            </Text>
            <View className="flex-row justify-between">
              <View className="flex-1 items-center">
                <Text className="text-[#7A91F9] text-xl">112</Text>
                <Text className="text-[#546881] font-axiformaRegular">
                  Vybers
                </Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-[#2AB49B] text-xl">20</Text>
                <Text className="text-[#546881] font-axiformaRegular">
                  Baddies
                </Text>
              </View>
            </View>
          </View>
          <View className="w-1/2 pl-2">
            <Text className="text-center font-axiformaBlack text-[#546881] mb-3">
              Followers
            </Text>
            <View className="flex-row justify-between">
              <View className="flex-1 items-center">
                <Text className="text-[#7A91F9] text-xl">112</Text>
                <Text className="text-[#546881] font-axiformaRegular">
                  Vybers
                </Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-[#2AB49B] text-xl">20</Text>
                <Text className="text-[#546881] font-axiformaRegular">
                  Baddies
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="mt-4 space-y-4">
        <View className="bg-white rounded-lg shadow-lg">
          <TouchableOpacity className="px-4 py-4 border-b border-[#EEF1F4] flex-row justify-between items-center">
            <Text className="text-[#546881] font-axiformaBlack">Analytics</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="#546881"
            />
          </TouchableOpacity>
          <TouchableOpacity className="px-4 py-4 border-b border-[#EEF1F4] flex-row justify-between items-center">
            <Text className="text-[#546881] font-axiformaBlack">
              Share QR Code
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="#546881"
            />
          </TouchableOpacity>
          <TouchableOpacity className="px-4 py-4 border-b border-[#EEF1F4] flex-row justify-between items-center">
            <Text className="text-[#546881] font-axiformaBlack">
              Share Profile
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="#546881"
            />
          </TouchableOpacity>
          <TouchableOpacity className="px-4 py-4 flex-row justify-between items-center">
            <Text className="text-[#546881] font-axiformaBlack">
              App Language
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="#546881"
            />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between mt-8">
          <TouchableOpacity className="flex-1 items-center py-3 mr-2 border border-[#E4D7F5] rounded-lg">
            <Text className="text-[#C4B1F3] font-axiformaRegular">Log Out</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 items-center py-3 ml-2 border border-[#FFDBDB] rounded-lg">
            <Text className="text-[#FF7474] font-axiformaRegular">
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Account;
