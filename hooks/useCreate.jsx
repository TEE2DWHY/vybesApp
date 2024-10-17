import { useState, useCallback } from "react";
import { getItem } from "../utils/AsyncStorage";

const useCreate = ({ fn, endpoint }) => {
  const [response, setResponse] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const create = useCallback(
    async (formData) => {
      setIsLoading(true);
      const token = await getItem("token");
      try {
        let isMultipartForm = false;
        const headers = {};

        for (const key in formData) {
          if (formData[key] instanceof File) {
            isMultipartForm = true;
            break;
          }
        }

        headers["Content-Type"] = isMultipartForm
          ? "multipart/form-data"
          : "application/json";

        const res = token
          ? await fn(token).post(endpoint, formData, { headers })
          : await fn.post(endpoint, formData);

        setResponse(res.data.payload);
        setMessage(res.data.message);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    },
    [fn, endpoint]
  );

  return { response, message, error, isLoading, create };
};

export default useCreate;
