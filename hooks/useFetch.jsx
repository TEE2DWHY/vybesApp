import { useState, useEffect, useCallback } from "react";
import { router } from "expo-router";
import { getItem } from "../utils/AsyncStorage";

const useFetch = ({ fn, endpoint, param }) => {
  const [message, setMessage] = useState(null);
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const token = getItem("token");
      setIsLoading(true);
      const fnRouter = fn(token);
      const res = await fnRouter.get(endpoint, { params: param });
      setMessage(res.data.message);
      setPayload(res.data.payload);
    } catch (err) {
      console.log("Fetch error:", err);
      setError(err?.response.data.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [fn, endpoint, param, router]);

  //   useEffect(() => {
  //     fetchData();
  //   }, [fetchData]);

  return { message, payload, error, isLoading, fetchData };
};

export default useFetch;
