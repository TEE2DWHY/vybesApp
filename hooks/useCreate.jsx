import { useCallback, useState } from "react";
import { getItem } from "../utils/AsyncStorage";

const useCreate = (endpoint, fn, formData) => {
  const [payload, setPayload] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const create = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = await getItem("token");
      const fnRoute = fn(token);
      const response = await fnRoute.post(endpoint, formData);
      setPayload(response.data.payload);
      setMessage(response.data.message);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
      setIsLoading(false);
    }
  });
  return { payload, message, isLoading, error, create };
};

export default useCreate;
