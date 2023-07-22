import { useEffect } from "react";
import { useState } from "react";
import regexps from "../constants/regexps";
import * as api from "../api/backend";

const useSearchDonor = () => {
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fetch = () => {
    setSearching(true);
    setResult(null);
    setError(null);
    api
      .searchUniqueDonor(search)
      .then((res) => {
        setResult(res.data.donor);
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        setError(message);
      })
      .finally(() => {
        setSearching(false);
      });
  };

  useEffect(() => {
    if (
      regexps.phone.test(search) ||
      regexps.cnic.test(search) ||
      regexps.email.test(search)
    ) {
      const timer = setTimeout(() => {
        fetch();
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    } else {
      setResult(null);
    }
  }, [search]);

  return {
    search,
    setSearch,
    searching,
    result,
    error,
  };
};

export default useSearchDonor;
