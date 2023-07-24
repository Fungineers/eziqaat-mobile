import { useEffect, useState } from "react";
import * as api from "../api/backend";

const useDonorHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = () => {
    setLoading(true);
    api
      .getDonorHistory()
      .then((res) => {
        const { donations } = res.data;
        setData(donations);
      })
      .catch((err) => {
        const message = err?.response?.data?.message || "Something went wrong";
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteRequest = (id) => {};

  return {
    fetch,
    loading,
    error,
    data,
  };
};

export default useDonorHistory;
