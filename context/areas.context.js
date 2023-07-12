import { createContext, useState } from "react";
import * as api from "../api/backend";
import { useEffect } from "react";
import { useContext } from "react";

const AreasContext = createContext({
  data: [],
  loading: false,
  error: null,
  fetch: () => {},
});

export const AreasProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = () => {
    setLoading(true);
    setError(null);
    setData([]);
    api
      .getAreas()
      .then((res) => {
        const { areas } = res.data;
        setData(areas);
      })
      .catch((err) => {
        const message = err?.response?.data?.message || "Something went wrong";
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AreasContext.Provider
      value={{
        loading,
        error,
        data,
        fetch,
      }}
    >
      {children}
    </AreasContext.Provider>
  );
};

export const useAreas = () => {
  const areas = useContext(AreasContext);

  // Whenever the hook is consumed (called), fetch areas
  useEffect(areas.fetch, []);

  console.log(areas.data);

  return areas;
};
