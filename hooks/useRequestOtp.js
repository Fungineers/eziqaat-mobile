import { useEffect, useState } from "react";
import * as api from "../api/backend";
import { useSnackbar } from "../context/snackbar.context";

const useRequestOtp = () => {
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const snackbar = useSnackbar();

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const call = () => {
    setLoading(true);
    api
      .requestOtp()
      .then((res) => {
        const { message } = res.data;
        snackbar.show({ message });
        setTimer(60);
      })
      .catch((err) => {
        const message = err?.response?.data?.message || "Something went wrong";
        snackbar.show({ message });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    loading,
    timer,
    call,
  };
};

export default useRequestOtp;
