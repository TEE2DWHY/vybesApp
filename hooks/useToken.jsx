import { useEffect, useState } from "react";
import { getItem } from "../utils/AsyncStorage";

export const useToken = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const authToken = await getItem("token");
        setToken(authToken);
      } catch (error) {
        console.log(error);
      }
    };
    fetchToken();
  }, []);
  return token;
};
