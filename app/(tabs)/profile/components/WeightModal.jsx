import React, { useState } from "react";
import { Text, View } from "react-native";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

const WeightModal = ({ selectedWeight, setSelectedWeight, fn }) => {
  return (
    <View className="bg-purple-darker rounded-xl rounded-tl-[40px] rounded-tr-[40px] py-8 px-5 shadow-2xl">
      <View className="border-b border-[#fff] pb-1 mb-4">
        <Text className="capitalize font-axiformaBlack text-white-normal text-base">
          your assumed Weight (Kg)
        </Text>
      </View>

      <RadioButtonGroup
        containerStyle={{ marginBottom: 10 }}
        selected={selectedWeight}
        onSelected={(value) => {
          setSelectedWeight(value);
          fn();
        }}
        radioBackground="#16A34A"
      >
        <RadioButtonItem
          value="50kg - 60kg"
          label={
            <View className="flex-row items-center py-3">
              <Text className="text-white-normal font-axiformaRegular text-base ml-3">
                50kg -60kg
              </Text>
            </View>
          }
        />

        <RadioButtonItem
          value="60kg - 70kg"
          label={
            <View className="flex-row items-center py-3">
              <Text className="text-white-normal font-axiformaRegular text-base ml-3">
                60kg -70kg
              </Text>
            </View>
          }
        />

        <RadioButtonItem
          value="70kg - 80kg"
          label={
            <View className="flex-row items-center py-3">
              <Text className="text-white-normal font-axiformaRegular text-base ml-3">
                70kg -80kg
              </Text>
            </View>
          }
        />

        <RadioButtonItem
          value="80kg - 90kg"
          label={
            <View className="flex-row items-center py-3">
              <Text className="text-white-normal font-axiformaRegular text-base ml-3">
                80kg -90kg
              </Text>
            </View>
          }
        />
      </RadioButtonGroup>
    </View>
  );
};

export default WeightModal;
