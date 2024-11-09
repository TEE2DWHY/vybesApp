import { useContext, createContext, useState, useEffect } from "react";
import { userInstance } from "../config/axios";
import { useToken } from "./useToken";

const accountContext = createContext();

const AccountWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useToken();

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const userRoute = userInstance(token);
        const response = await userRoute.get("/get-user");
        setUser(response.data.payload.user);
        setError(null);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err.response?.data?.message || "Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const refetchUser = async () => {
    if (!token) {
      return;
    }

    try {
      setLoading(true);
      const userRoute = userInstance(token);
      const response = await userRoute.get("/get-user");
      setUser(response.data.payload.user);
      setError(null); // Reset error on successful refetch
    } catch (err) {
      console.error("Error refetching user:", err);
      setError(err.response?.data?.message || "Failed to refetch user data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <accountContext.Provider
      value={{ user, setUser, loading, refetchUser, error }}
    >
      {children}
    </accountContext.Provider>
  );
};

export default AccountWrapper;

export const useAccount = () => {
  return useContext(accountContext);
};
