import { useState } from "react";
import * as api from "../api/backend";
import { useSnackbar } from "../context/snackbar.context";

const useWorkerCollectedDonations = () => {
  const snackbar = useSnackbar();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);
    setError(false);
    api
      .getWorkerCollectedDonations()
      .then((res) => {
        const { collectedDonations } = res.data;
        setData(collectedDonations);
      })
      .catch((err) => {
        const message = err?.response?.data?.message || "Something went wrong";
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const searchData = (value) => {
    setSearching(true);
    setError(false);
    api
      .getWorkerCollectedDonations(value)
      .then((res) => {
        const { collectedDonations } = res.data;
        setData(collectedDonations);
      })
      .catch((err) => {
        const message = err?.response?.data?.message || "Something went wrong";
        setError(message);
      })
      .finally(() => {
        setSearching(false);
      });
  };

  return {
    collected: {
      fetch: fetchData,
      search: searchData,
      searching,
      loading,
      error,
      data,
    },
  };
};

export default useWorkerCollectedDonations;
