import { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  Image,
  RefreshControl,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import HeaderComponent from "./components/HeaderComponent";
import axios from "axios";
import { useToken } from "../../../hooks/useToken";
import { Spinner } from "../../../components/Spinner";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useAccount } from "../../../hooks/useAccount";

const Add = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addingUser, setAddingUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [notFound, setNotFound] = useState(
    "No pending or unsent requests available."
  );
  const [contacts, setContacts] = useState([]);
  const [originalContacts, setOriginalContacts] = useState([]);
  const token = useToken();
  const { user } = useAccount();

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUsers();
    setRefreshing(false);
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://vybesapi.onrender.com/v1/contact/contacts/suggested-accounts",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data.payload);

      // Filter out the logged-in user
      const filteredContacts = (response.data.payload || []).filter((item) => {
        const contactId = item.user._id || item.contact._id;
        return contactId !== token; // Exclude the logged-in user
      });

      setOriginalContacts(filteredContacts);
      setContacts(filteredContacts);
    } catch (error) {
      console.error(
        "Error fetching contacts:",
        error.response?.data || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = async () => {
    if (!searchText.trim()) {
      setContacts(originalContacts);
      setNotFound("No pending or unsent requests available.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://vybesapi.onrender.com/v1/contact/search-contacts?username=${searchText}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const matchingContacts = response.data.payload || [];
      setContacts(matchingContacts);

      if (matchingContacts.length === 0) {
        setNotFound("No User Matches Your Search");
      } else {
        setNotFound("");
      }
    } catch (error) {
      console.error(
        "Error searching contacts:",
        error.response?.data || error.message
      );
      setNotFound("An error occurred while searching.");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmContact = async (contactId) => {
    setAddingUser(contactId);
    try {
      const response = await axios.post(
        "https://vybesapi.onrender.com/v1/contact/confirm-contact",
        {
          userId: user?._id,
          contactId: contactId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Alert.alert("Success", response.data?.message);
      await fetchUsers();
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to add user."
      );
    } finally {
      setAddingUser(null);
    }
  };

  const addUser = async (contactId) => {
    setAddingUser(contactId);
    try {
      const response = await axios.post(
        "https://vybesapi.onrender.com/v1/contact/add-contact",
        { contactId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Alert.alert("Success", response.data?.message);
      await fetchUsers();
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to add user."
      );
    } finally {
      setAddingUser(null);
    }
  };

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  const renderItem = ({ item }) => {
    // Ensure the logged-in user is not rendered
    const contact = user?._id === item?.user?._id ? item?.contact : item?.user;
    // If contact is the logged-in user, return null to prevent rendering
    if (contact._id === token) return null;

    const userName = contact.userName || "Unknown";
    const accountType = contact.accountType?.toLowerCase() || "default";

    const badgeStyles = {
      vyber: { badgeColor: "#DDE5F5", badgeTextColor: "#AFA4F8" },
      baddie: { badgeColor: "#CDEDEA", badgeTextColor: "#50C2C9" },
      default: { badgeColor: "#E0E0E0", badgeTextColor: "#A0A0A0" },
    };

    const { badgeColor, badgeTextColor } =
      badgeStyles[accountType] || badgeStyles.default;

    const isPending = item.status === "pending";
    const isNotSent = item.status === "not_sent";

    // Check if the logged-in user is the recipient (not the sender) and the request is pending
    const isRequestReceived = item.isReceivedByUser && isPending;

    // Check if the logged-in user has sent the request
    const isRequestSentByUser = item.isSentByUser && isPending;

    return (
      <View className="flex-row items-center py-4 border-b border-gray-200">
        <TouchableOpacity
          onPress={() => router.push(`/home/user/${contact._id}`)}
        >
          <Image
            source={{ uri: contact.image }}
            className="h-12 w-12 rounded-full mr-4"
          />
        </TouchableOpacity>

        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <Text className="font-axiformaRegular text-sm text-[#314359] capitalize">
              @{userName}
            </Text>
            <View
              className="px-2 py-1 rounded-lg"
              style={{ backgroundColor: badgeColor }}
            >
              <Text
                className="font-bold text-xs capitalize"
                style={{ color: badgeTextColor }}
              >
                {contact.accountType || "Default"}
              </Text>
            </View>
          </View>
          <Text className="text-xs text-gray-600 mt-2 w-[90%] font-axiformaRegular">
            {contact.bio || "No bio available"}
          </Text>
        </View>

        <View className="mr-2">
          {/* Display Accept Request only if the logged-in user has received the request */}
          {isRequestReceived && (
            <TouchableOpacity
              onPress={() => confirmContact(contact._id)} // Call confirmContact on press
              className="px-2  py-2 bg-purple-normal rounded-md"
            >
              <Text className="text-white-normal text-xs font-axiformaRegular">
                Accept Request
              </Text>
            </TouchableOpacity>
          )}

          {/* For not sent requests, show the add button */}
          {isNotSent && (
            <TouchableOpacity
              onPress={() => addUser(contact._id)}
              disabled={addingUser === contact._id}
            >
              {addingUser === contact._id ? (
                <Spinner />
              ) : (
                <MaterialIcons
                  name="person-add-alt-1"
                  size={24}
                  color="#a241ee"
                />
              )}
            </TouchableOpacity>
          )}

          {/* Display "Request Sent" if the logged-in user has sent the request but it is still pending */}
          {isRequestSentByUser && (
            <Text className="text-xs text-purple-normal font-axiformaRegular">
              Request Sent
            </Text>
          )}
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <Spinner />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="px-4">
        <FlatList
          data={contacts}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={() => (
            <HeaderComponent
              data={contacts}
              onSearch={onSearch}
              setOnSearch={setOnSearch}
              searchFn={handleSearchSubmit}
              searchText={searchText}
              setSearchText={setSearchText}
              refresh={onRefresh}
            />
          )}
          ListEmptyComponent={() => (
            <View className="flex-1 justify-center items-center h-full">
              <Text className="text-gray-500 mt-10 font-axiformaRegular">
                {notFound}
              </Text>
            </View>
          )}
          contentContainerStyle={{ paddingHorizontal: 15, marginTop: 15 }}
          keyExtractor={(item) =>
            item.contact?._id || item.user?._id || `key-${Math.random()}`
          }
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Add;
