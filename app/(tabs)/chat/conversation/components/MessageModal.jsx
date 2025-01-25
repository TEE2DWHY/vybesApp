import { Modal, Text, TouchableOpacity, View } from "react-native";

const MessageModal = ({
  showModal,
  selectedMessage,
  setSelectedMessage,
  setShowModal,
  setMessage,
}) => {
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMessage(null);
    setMessage("");
  };

  const handleEditMessage = () => {
    if (selectedMessage) {
      setMessage(selectedMessage?.text);
      setShowModal(false);
    }
  };

  return (
    <>
      <Modal visible={showModal} transparent={true} animationType="slide">
        <View className="flex-1 justify-center items-center bg-[#1b1b1ba0] bg-opacity-50">
          <View className="w-4/5 bg-white-normal p-4 rounded-lg">
            {selectedMessage && (
              <>
                <TouchableOpacity onPress={handleEditMessage}>
                  <Text className="text-base text-[#3D4C5E] mb-3 font-axiformaRegular">
                    Edit Message
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log("Delete message")}>
                  <Text className="text-base text-[#3D4C5E] mb-3 font-axiformaRegular">
                    Delete Message
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => console.log("React with emoji")}
                >
                  <Text className="text-base text-[#3D4C5E] mb-3 font-axiformaRegular">
                    React With Emoji
                  </Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity onPress={handleCloseModal} className="self-end">
              <Text className="text-base text-red-500 mt-4">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default MessageModal;
