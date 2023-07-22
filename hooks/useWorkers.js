import { useEffect, useState } from "react";
import * as api from "../api/backend";

const useWorkers = () => {
  const [loading, setLoading] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [error, setError] = useState(null);
  const [searching, setSearching] = useState(false);

  const search = (value) => {
    setSearching(true);
    api
      .getWorkers(value)
      .then((res) => {
        const { workers } = res.data;
        setWorkers(workers);
      })
      .catch((err) => {
        setError(err?.response?.data?.message || "Something went wrong");
      })
      .finally(() => {
        setSearching(false);
      });
  };

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

  return {
    fetch: fetchWorkers,
    loading,
    data: workers,
    error,
    search,
    searching,
  };
};

export default useWorkers;
