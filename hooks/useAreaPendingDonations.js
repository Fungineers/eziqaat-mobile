import { useState } from "react";
import * as api from "../api/backend";
import { useSnackbar } from "../context/snackbar.context";

const useAreaPendingDonations = () => {
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
      .getAreaPendingStats()
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
      .getAreaPendingDonations()
      .then((res) => {
        const { pendingDonations } = res.data;
        setData(pendingDonations);
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
      .getAreaPendingDonations(value)
      .then((res) => {
        const { pendingDonations } = res.data;
        setData(pendingDonations);
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
    pending: {
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

export default useAreaPendingDonations;
