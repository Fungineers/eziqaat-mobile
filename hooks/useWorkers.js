import { useEffect, useState } from "react";
import * as api from "../api/backend";

const useWorkers = () => {
  const [loading, setLoading] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [error, setError] = useState(null);

  const fetchWorkers = () => {
    setLoading(true);
    api
      .getWorkers()
      .then((res) => {
        const { workers } = res.data;
        setWorkers(workers);
      })
      .catch((err) => {
        setError(err?.response?.data?.message || "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(fetchWorkers, []);

  return {
    loading,
    data: workers,
    error,
  };
};

export default useWorkers;
