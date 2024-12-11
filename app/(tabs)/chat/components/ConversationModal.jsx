import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ConversationModal = ({
  header,
  content,
  closeModal,
  step,
  handleNext,
}) => {
  return (
    <View className="bg-white-normal w-[90%] items-center justify-center p-2 self-center rounded-t-[40px] mt-[8%] h-fit">
      <View className="self-start mt-2 ml-2">
        <MaterialIcons
          name="cancel"
          size={20}
          color="#B2BBC6"
          onPress={closeModal}
        />
      </View>
      {header}
      {content}
      {step === 0 && (
        <TouchableOpacity
          className="font-axiformaBlackItalic  bg-purple-normal py-3 rounded-3xl w-2/5 mt-5 mb-4"
          onPress={handleNext}
        >
          <Text className="text-white-normal text-center font-axiformaBlackItalic text-base">
            Next
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ConversationModal;
