import { useEffect, useState } from "react";
import * as api from "../api/backend";

const useWorkerDetails = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWorkerDetails = () => {
    setLoading(true);
    api
      .getWorkerById(id)
      .then((res) => {
        console.log(res.data);
        const { workerDetails } = res.data;
        setData(workerDetails);
      })
      .catch((err) => {
        setError(err?.response?.data?.message || "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(fetchWorkerDetails, []);

  return {
    loading,
    data,
    error,
  };
};

export default useWorkerDetails;
