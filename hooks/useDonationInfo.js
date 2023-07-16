import { useState } from "react";
import * as api from "../api/backend";
import { useSnackbar } from "../context/snackbar.context";

const useDonationInfo = (donationId) => {
  const snackbar = useSnackbar();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [approving, setApproving] = useState(false);

  const fetch = () => {
    setLoading(true);
    api
      .getDonationInfo({ donationId })
      .then((res) => {
        const { data } = res.data;
        setData(data);
      })
      .catch((err) => {
        const message = err?.response?.data?.message || "Something went wrong";
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const approve = () => {
    setApproving(true);
    api
      .approvePendingDonation({ donationId })
      .then((res) => {
        const { message } = res.data;
        snackbar.show({ message });
        fetch();
      })
      .catch((err) => {
        const message = err?.response?.data?.message || "Something went wrong";
        snackbar.show({ message });
      })
      .finally(() => {
        setApproving(false);
      });
  };

  return {
    fetch,
    error,
    data,
    loading,
    approve,
    approving,
  };
};

export default useDonationInfo;
