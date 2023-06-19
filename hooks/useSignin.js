import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import * as api from "../api/backend";
import { useSnackbar } from "../context/snackbar.context";
import { useAuth } from "../context/auth.context";

const useSignup = () => {
  const snackbar = useSnackbar();

  const auth = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const form = useFormik({
    initialValues: {
      credential: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      credential: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      auth.signin(values);
    },
  });

  return {
    loading,
    error,
    success,
    form,
  };
};

export default useSignup;
