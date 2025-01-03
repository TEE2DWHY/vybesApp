import { Text, TouchableOpacity, View, Image } from "react-native";
import { useAccount } from "../../../../hooks/useAccount";
import axios from "axios";
import { useToken } from "../../../../hooks/useToken";
import { useEffect, useState } from "react";
import { Spinner } from "../../../../components/Spinner";

const Bookmarks = () => {
  const { user } = useAccount();
  const token = useToken();
  const [bookmarks, setBookMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllBookmarks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://vybesapi.onrender.com/v1/story/get-all-bookmarked",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.payload);
      setBookMarks(response.data.payload);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getAllBookmarks();
    }
  }, [token]);

  return (
    <>
      <View className="items-center justify-center mt-10">
        <Text className="capitalize font-axiformaBlack text-xl mb-4 bg-white-normal p-1 text-[#1D242D]">
          @{user?.userName}
        </Text>
        <Image
          source={{
            uri: user?.image,
          }}
          className="w-[150px] h-[150px] rounded-[80px] border-[10px]  border-[#EEF6FF]"
        />
      </View>

      <View className="mt-8 flex-row justify-between items-center">
        <Text className="font-axiformaMedium text-[#3D4C5E] text-sm">
          My BookMarks
        </Text>
        <Text className="text-[#3D4C5E] font-axiformaRegular">
          {bookmarks?.length} Bookmarks
        </Text>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center mt-16">
          <Spinner />
        </View>
      ) : bookmarks.length === 0 ? (
        <View className="w-full items-center">
          <Text className="text-[#3D4C5E] font-axiformaMedium text-sm">
            No bookmarked post here
          </Text>
        </View>
      ) : (
        <View className="flex-row flex-wrap justify-between mt-6 border border-[#E9E9EB] rounded-lg p-3 mb-10">
          {bookmarks.map((bookmark) => (
            <TouchableOpacity key={bookmark._id} className="w-[49%] mb-4">
              <Image
                source={{ uri: bookmark?.postUrl }}
                className="w-full h-[240px] rounded-md"
                resizeMode="cover"
              />
              <View className="bg-[#9a41eea6] py-3 px-2 rounded-xl absolute bottom-3 text-left mx-1">
                <Text className="text-white-normal font-axiformaBlack text-center text-[14px]">
                  @{bookmark?.userName}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};

export default Bookmarks;
