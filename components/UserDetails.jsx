import { Image, Text, View } from "react-native";
import moana from "../assets/images/moana.png";

const UserDetails = ({ img, username, firstName, age, state, country }) => {
  return (
    <View>
      <View className={`bg-[url(${img})] h-[180px] w-[334px] px-2`}>
        <Text className="bg-blue-dark text-white-normal font-axiformaBlack text-center pb-2">
          {username}
        </Text>
      </View>
      <View>
        <View>
          <Text> {firstName}</Text>
          <Text>{age}</Text>
        </View>
        <Text className="text-sm">{`${state}, ${country}`}</Text>
      </View>
    </View>
  );
};

export default UserDetails;
