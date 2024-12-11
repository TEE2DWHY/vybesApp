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
      setPayload(res.data.payload);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err?.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [fn, endpoint, token]);

  return { message, payload, setPayload, error, isLoading, fetchData };
};

export default useFetch;

// import { useState, useEffect, useCallback } from 'react';

// const useFetch = (url, options = {}, authToken = null) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [payload, setPayload] = useState(null);
//   const [message, setMessage] = useState("");

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     setMessage("");

//     try {
//       // Add Authorization header if authToken is provided
//       const headers = authToken
//         ? { ...options.headers, Authorization: `Bearer ${authToken}` }
//         : options.headers;

//       const response = await fetch(url, { ...options, headers });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} ${response.statusText}`);
//       }

//       const data = await response.json();
//       setPayload(data);
//       setMessage("Data fetched successfully.");
//     } catch (err) {
//       setError(err.message);
//       setMessage("An error occurred while fetching data.");
//     } finally {
//       setLoading(false);
//     }
//   }, [url, options, authToken]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   return { loading, error, payload, message };
// };

// export default useFetch;
