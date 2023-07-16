import { useState } from "react";
import * as api from "../api/backend";
import { useSnackbar } from "../context/snackbar.context";

const useAreaRequestedDonations = () => {
  const snackbar = useSnackbar();

  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState(null);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = () => {
    setStatsLoading(true);
    setStatsError(false);
    api
      .getAreaRequestStats()
      .then((res) => {
        const { stats } = res.data;
        setStats(stats);
      })
      .catch((err) => {
        const message = err?.response?.data?.message || "Something went wrong";
        setStatsError(message);
      })
      .finally(() => {
        setStatsLoading(false);
      });
  };

  const fetchData = () => {
    setLoading(true);
    setError(false);
    api
      .getAreaRequestedDonations()
      .then((res) => {
        const { requestedDonations } = res.data;
        setData(requestedDonations);
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
      .getAreaRequestedDonations(value)
      .then((res) => {
        const { requestedDonations } = res.data;
        setData(requestedDonations);
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
    requests: {
      fetch: fetchData,
      search: searchData,
      searching,
      loading,
      error,
      data,
    },
    stats: {
      fetch: fetchStats,
      loading: statsLoading,
      error: statsError,
      data: stats,
    },
  };
};

export default useAreaRequestedDonations;
