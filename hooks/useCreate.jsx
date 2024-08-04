import { useState, useCallback } from "react";
import { getItem } from "../utils/AsyncStorage";

const useCreate = ({ fn, endpoint, onSuccess }) => {
  const [response, setResponse] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const create = useCallback(
    async (formData) => {
      setIsLoading(true);
      const token = getItem("token");
      try {
        let data = formData;
        let isMultipartForm = false;
        const headers = {};
        for (const key in formData) {
          if (formData[key] instanceof File) {
            isMultipartForm = true;
            break;
          }
        }
        if (isMultipartForm) {
          headers["Content-Type"] = "multipart/form-data";
        } else {
          headers["Content-Type"] = "application/json";
        }
        const fnRoute = fn(token);
        const res = await fnRoute.post(endpoint, data, { headers });
        setResponse(res.data);
        setMessage(res.data.message);
        if (onSuccess) onSuccess();
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "An error occurred");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [fn, endpoint]
  );

  return { response, message, error, isLoading, create };
};

export default useCreate;
