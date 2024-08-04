import { useState, useCallback } from "react";
import { getItem } from "../utils/AsyncStorage";

const useUpdate = ({ fn, endpoint, param }) => {
  const [payload, setPayload] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const update = useCallback(
    async (formData) => {
      setIsLoading(true);
      const token = getItem("token");
      //   setPayload(null);
      //   setError(null);
      try {
        let data = formData;
        const headers = {};
        let isMultipartForm = false;
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
        const res = await fnRoute.patch(
          endpoint,
          data,
          { params: param },
          { headers }
        );
        setPayload(res.data);
        setMessage(res.data.message);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    },
    [fn, endpoint, param]
  );

  return { payload, message, error, isLoading, update };
};

export default useUpdate;
