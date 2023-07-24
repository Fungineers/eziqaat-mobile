import { useState } from "react";
import * as api from "../api/backend";
import { useSnackbar } from "../context/snackbar.context";

const useAreaPendingDonations = () => {
  const snackbar = useSnackbar();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);

  const fetch = () => {
    setLoading(true);
    setError(false);
    api
      .getAreaPendingDonations()
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

  const search = (value) => {
    setSearching(true);
    setError(false);
    api
      .getAreaCollectedDonations(value)
      .then((res) => {
        const { donations } = res.data;
        setData(donations);
      })
      .catch((err) => {
        const message = err?.response?.data?.message || "Something went wrong";
        setError(message);
      })
      .finally(() => {
        setSearching(false);
      });
  };

  const reset = () => {
    setData(null);
  };

  return {
    fetch,
    search,
    reset,
    searching,
    loading,
    error,
    data,
  };
};

export default useAreaPendingDonations;
