import { router } from "expo-router";
import { useCallback, useState } from "react";
import { getItem } from "../utils/AsyncStorage";

const useDelete = ({ fn, endpoint, param }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const deleteData = useCallback(
    async (id) => {
      setIsLoading(true);
      const token = getItem("token");
      try {
        const fnRouter = fn(token);
        const res = await fnRouter.delete(endpoint, { params: param });
        console.log(res.data);
        setPayload(res.data.payload);
        setMessage(res.data.message);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
        console.log(err);
      }
    },
    [endpoint, fn, param, router]
  );

  return { payload, message, isLoading, error, deleteData };
};

export default useDelete;
