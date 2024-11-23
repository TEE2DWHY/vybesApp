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
} from "react-native";
import HeaderComponent from "./components/HeaderComponent";
import axios from "axios";
import { useToken } from "../../../hooks/useToken";
import { Spinner } from "../../../components/Spinner";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUsers();
    setRefreshing(false);
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/v1/contact/contacts/suggested-accounts",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const filteredContacts = (response.data.payload || []).filter(
        (item) => item.status === "pending" || item.status === "not_sent"
      );

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
        `http://localhost:8000/v1/contact/search-contacts?username=${searchText}`,
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

  const addUser = async (contactId) => {
    setAddingUser(contactId);
    try {
      const response = await axios.post(
        "http://localhost:8000/v1/contact/add-contact",
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
    const contact = item.contact || item.user || item || {};
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

    return (
      <View className="flex-row items-center py-4 border-b border-gray-200">
        <Image
          source={{
            uri: contact.image || "https://via.placeholder.com/150",
          }}
          className="h-12 w-12 rounded-full mr-4"
        />

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
          {isPending ? (
            <Text className="text-[#AFA4F8] text-xs">Request Sent</Text>
          ) : isNotSent ? (
            addingUser === contact._id ? (
              <Spinner />
            ) : (
              <MaterialIcons
                name="person-add-alt-1"
                size={24}
                color="#AFA4F8"
                onPress={() => addUser(contact._id)}
              />
            )
          ) : null}
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
