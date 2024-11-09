import React, { useEffect } from "react";
import { View, Animated } from "react-native";

export const Spinner = () => {
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    const startSpin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => startSpin());
    };
    startSpin();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <View className="w-[40px] h-[40px] rounded-full border-[4px] border-transparent border-t-[#a241ee]" />
    </Animated.View>
  );
};
