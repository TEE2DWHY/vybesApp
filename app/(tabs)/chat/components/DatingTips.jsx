import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState, useCallback, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ConversationModal from "./ConversationModal";
import Options from "./Options";

const DatingTips = () => {
  const [conversationOptions, setConversationOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < 10) {
      setStep((prevState) => prevState + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep((prevState) => prevState - 1);
    }
  };

  return <ScrollView className="bg-gray-50 flex-1 relative"></ScrollView>;
};

export default DatingTips;
