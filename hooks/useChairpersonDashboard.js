import * as api from "../api/backend";

const useChairpersonDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchChairpersonDashboardData = () => {
    setLoading(true);
    api;
  };

  return {
    loading,
    data,
    error,
  };
};
