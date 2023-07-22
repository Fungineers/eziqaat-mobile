import { useEffect, useState } from "react";
import * as api from "../api/backend";

const useDonorRequests = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = () => {
    setLoading(true);
    api
      .getDonorRequests()
      .then((res) => {
        const { donorRequests } = res.data;
        setData(donorRequests);
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

  useEffect(() => {
    fetch();
  }, []);

  return {
    loading,
    error,
    data,
  };
};

export default useDonorRequests;
