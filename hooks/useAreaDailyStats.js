import { useState } from "react";
import * as api from "../api/backend";
import { useEffect } from "react";

const useAreaDailyStats = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetch = () => {
    setLoading(true);
    setError(null);
    api
      .getAreaDailyStats()
      .then((res) => {
        const { data } = res.data;
        setData(data);
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        setError(message);
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

export default useAreaDailyStats;
