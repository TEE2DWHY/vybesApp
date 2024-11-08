import { useState, useCallback } from "react";

const useFetch = ({ fn, endpoint, param, token }) => {
  const [message, setMessage] = useState(null);
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      const fnRouter = fn(token);
      const res = await fnRouter.get(endpoint, { params: param });
      setMessage(res.data.message);
      setPayload(res.data.payload.users);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err?.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [fn, endpoint, param, token]);

  return { message, payload, error, isLoading, fetchData };
};

export default useFetch;
