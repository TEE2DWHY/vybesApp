import { useContext, createContext, useState, useEffect } from "react";
import { getItem } from "../utils/AsyncStorage";
import { userInstance } from "../config/axios";
import { useToken } from "./useToken";

const accountContext = createContext();

const AccountWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState("");
  const token = useToken();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          setAuthToken(token);
          const userRoute = userInstance(token);
          const response = await userRoute.get("/get-user");
          setUser(response.data.payload.user);
        }
      } catch (error) {
        console.error(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const refetchUser = async () => {
    try {
      if (token) {
        setAuthToken(token);
        const userRoute = userInstance(token);
        const response = await userRoute.get("/get-user");
        setUser(response.data.payload.user);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <accountContext.Provider value={{ user, setUser, loading, refetchUser }}>
      {children}
    </accountContext.Provider>
  );
};

export default AccountWrapper;

export const useAccount = () => {
  return useContext(accountContext);
};
