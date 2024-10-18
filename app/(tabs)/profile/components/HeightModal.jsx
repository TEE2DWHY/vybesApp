import React, { useState } from "react";
import { Text, View } from "react-native";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

const HeightModal = () => {
  const [selectedHeight, setSelectedHeight] = useState("");

  return (
    <View className="bg-purple-darker rounded-xl rounded-tl-[40px] rounded-tr-[40px] py-8 px-5 shadow-2xl">
      <View className="border-b border-[#fff] pb-1 mb-4">
        <Text className="capitalize font-axiformaBlack text-white-normal text-base">
          your assumed height (m)
        </Text>
      </View>

      <RadioButtonGroup
        containerStyle={{ marginBottom: 10 }}
        selected={selectedHeight}
        onSelected={(value) => setSelectedHeight(value)}
        radioBackground="#16A34A"
      >
        <RadioButtonItem
          value="60m - 70m"
          label={
            <View className="flex-row items-center py-3">
              <Text className="text-white-normal font-axiformaRegular text-base ml-3">
                60m - 70m
              </Text>
            </View>
          }
        />

        <RadioButtonItem
          value="71m - 80m"
          label={
            <View className="flex-row items-center py-3">
              <Text className="text-white-normal font-axiformaRegular text-base ml-3">
                71m - 80m
              </Text>
            </View>
          }
        />

        <RadioButtonItem
          value="81m - 90m"
          label={
            <View className="flex-row items-center py-3">
              <Text className="text-white-normal font-axiformaRegular text-base ml-3">
                81m - 90m
              </Text>
            </View>
          }
        />

        <RadioButtonItem
          value="91m - 100m"
          label={
            <View className="flex-row items-center py-3">
              <Text className="text-white-normal font-axiformaRegular text-base ml-3">
                91m - 100m
              </Text>
            </View>
          }
        />
      </RadioButtonGroup>
    </View>
  );
};

export default HeightModal;
