import React, { useState } from "react";
import { Text, View } from "react-native";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

const GenderModal = ({ gender, setGender, fn }) => {
  return (
    <View className="bg-purple-darker rounded-xl rounded-tl-[40px] rounded-tr-[40px] py-8 px-5 shadow-2xl">
      <Text className="font-axiformaBlack text-white-normal text-2xl mb-4">
        Gender
      </Text>
      <View className="border-b border-[#fff] pb-1 mb-4">
        <Text className="capitalize font-axiformaBlack text-white-normal text-base">
          selecting your gender attract you to opposite sex
        </Text>
      </View>

      <RadioButtonGroup
        containerStyle={{ marginBottom: 10 }}
        selected={gender}
        onSelected={(value) => {
          setGender(value);
          fn();
        }}
        radioBackground="#16A34A"
      >
        <RadioButtonItem
          value="male"
          label={
            <View className="flex-row items-center py-3">
              <Text className="text-white-normal font-axiformaRegular text-base ml-3 capitalize">
                Male
              </Text>
            </View>
          }
        />

        <RadioButtonItem
          value="female"
          label={
            <View className="flex-row items-center py-3">
              <Text className="text-white-normal font-axiformaRegular text-base ml-3 capitalize">
                Female
              </Text>
            </View>
          }
        />
      </RadioButtonGroup>
    </View>
  );
};

export default GenderModal;
