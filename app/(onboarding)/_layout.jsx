import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const OnBoardingLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  );
};

export default OnBoardingLayout;
