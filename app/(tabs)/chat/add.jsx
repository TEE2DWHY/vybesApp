import { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  Image,
  RefreshControl,
  Alert,
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
  const [contacts, setContacts] = useState([]);
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      const filteredContacts = (response.data.payload || []).filter(
        (item) => item.status === "pending" || item.status === "not_sent"
      );

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

  const addUser = async (contactId) => {
    setAddingUser(contactId);
    try {
      const response = await axios.post(
        "http://localhost:8000/v1/contact/add-contact",
        { contactId: contactId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      Alert.alert("Success", response.data?.message);
      await fetchUsers();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.response?.data?.message);
    } finally {
      setAddingUser(null);
    }
  };

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  const renderItem = ({ item }) => {
    const contact = item.contact || item.user || {};
    const user = item.user || {};

    const accountType = contact.accountType
      ? contact.accountType.toLowerCase()
      : user.accountType
      ? user.accountType.toLowerCase()
      : "default";

    const badgeStyles = {
      vyber: { badgeColor: "#DDE5F5", badgeTextColor: "#AFA4F8" },
      baddie: { badgeColor: "#CDEDEA", badgeTextColor: "#50C2C9" },
      default: { badgeColor: "#E0E0E0", badgeTextColor: "#A0A0A0" },
    };

    const { badgeColor, badgeTextColor } = badgeStyles[accountType] || {};

    const isPending = item.status === "pending";
    const isNotSent = item.status === "not_sent";

    return (
      <View className="flex-row items-center py-4 border-b border-gray-200">
        <Image
          source={{
            uri: contact.image || user.image || "default_image_url",
          }}
          className="h-12 w-12 rounded-full mr-4"
        />

        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <Text className="font-axiformaBlack text-sm text-[#314359] capitalize">
              @{contact.userName || user.userName || "Unknown"}{" "}
            </Text>
            <View
              className="px-2 py-1 rounded-lg mr-4"
              style={{ backgroundColor: badgeColor }}
            >
              <Text
                className="font-axiformaBold text-xs capitalize"
                style={{ color: badgeTextColor }}
              >
                {contact.accountType || user.accountType || "Default"}{" "}
                {/* Display accountType from contact or user */}
              </Text>
            </View>
          </View>

          <Text className="font-axiformaRegular text-xs text-[#909DAD] mt-2 w-[90%]">
            {contact.bio || user.bio || "No bio available"}{" "}
          </Text>
        </View>

        <View className="mr-2">
          {isPending ? (
            <Text className="text-[#AFA4F8] text-xs">Already Sent</Text>
          ) : isNotSent ? (
            addingUser === item.user?._id ? (
              <Spinner />
            ) : (
              <MaterialIcons
                name="person-add-alt-1"
                size={24}
                color="#AFA4F8"
                onPress={() => addUser(item.user?._id)}
              />
            )
          ) : null}
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white mt-10">
        <View className="flex-1 justify-center items-center">
          <Spinner />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="px-4">
      <FlatList
        data={contacts}
        renderItem={renderItem}
        ListHeaderComponent={() => <HeaderComponent data={contacts} />}
        ListEmptyComponent={() => (
          <Text className="text-center text-gray-500">
            No pending or unsent requests available.
          </Text>
        )}
        contentContainerStyle={{ paddingHorizontal: 15, marginTop: 15 }}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Add;
