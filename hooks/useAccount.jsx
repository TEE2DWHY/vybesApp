import { useContext, createContext, useState, useEffect } from "react";
import { getItem } from "../utils/AsyncStorage";
import { userInstance } from "../config/axios";

const accountContext = createContext();

const AccountWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await getItem("token");
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

  return (
    <accountContext.Provider value={{ user, setUser, loading }}>
      {children}
    </accountContext.Provider>
  );
};

export default AccountWrapper;

export const useAccount = () => {
  return useContext(accountContext);
};
