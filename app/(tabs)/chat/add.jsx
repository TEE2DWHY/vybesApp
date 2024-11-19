import { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  Image,
  RefreshControl,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import HeaderComponent from "./components/HeaderComponent";
import axios from "axios";
import { useToken } from "../../../hooks/useToken";
import { Spinner } from "../../../components/Spinner";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Add = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const token = useToken();

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUsers();
    setRefreshing(false);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/v1/user/get-users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContacts(response.data.payload.users || []);
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  const renderItem = ({ item }) => {
    const badgeStyles = {
      vyber: { badgeColor: "#DDE5F5", badgeTextColor: "#AFA4F8" },
      baddie: { badgeColor: "#CDEDEA", badgeTextColor: "#50C2C9" },
    };

    const { badgeColor, badgeTextColor } =
      badgeStyles[item.accountType.toLowerCase()] || {};

    return (
      <View className="flex-row items-center py-4 border-b border-gray-200">
        <Image
          source={{ uri: item.image }}
          className="h-12 w-12 rounded-full mr-4"
        />

        <View className="flex-1">
          <Text className="font-axiformaBlack text-sm text-[#314359] capitalize">
            @{item.userName}
          </Text>
          <Text className="font-axiformaRegular text-xs text-[#909DAD] mt-2">
            {item.bio}
          </Text>
        </View>

        <View
          className="px-2 py-1 rounded-lg mr-4"
          style={{ backgroundColor: badgeColor }}
        >
          <Text
            className="font-axiformaBold text-xs capitalize"
            style={{ color: badgeTextColor }}
          >
            {item.accountType}
          </Text>
        </View>

        <View className="mr-2">
          {item.followStatus === "requested" ? (
            <AntDesign name="rocket1" size={24} color="#AFA4F8" />
          ) : (
            <MaterialIcons
              name="person-add-alt-1"
              size={24}
              color="#AFA4F8"
              onPress={() => addUser(item._id)}
            />
            // <AntDesign
            //   name={item.followStatus === "follow" ? "adduser" : "addusergroup"}
            //   size={24}
            //   color="#AFA4F8"
            // />
          )}
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
            No suggestions available.
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
