import { useState } from "react";
import * as api from "../api/backend";
import { useEffect } from "react";

const useDonorStats = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetch = () => {
    setLoading(true);
    setError(null);
    api
      .getDonorStats()
      .then((res) => {
        const { data } = res.data;
        setData(data);
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  return {
    loading,
    error,
    data,
  };
};

export default useDonorStats;
