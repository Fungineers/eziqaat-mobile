import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import * as api from "../api/backend";
import regexps from "../constants/regexps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSnackbar } from "../context/snackbar.context";

const useSignup = () => {
  const snackbar = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const form = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      cnic: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string()
        .required("Required")
        .matches(regexps.email, { message: "Incorrect format" }),
      phone: Yup.string()
        .required("Required")
        .matches(regexps.phone, { message: "Incorrect format" }),
      cnic: Yup.string()
        .required("Required")
        .matches(regexps.cnic, { message: "Incorrect format" }),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      api
        .signup(values)
        .then((res) => {
          const { user } = res.data;
          console.log(user);
          setSuccess(true);
          // snackbar.show({ message: "Successfully signed up" });
          resetForm();
        })
        .catch((err) => {
          console.log(err);
          setError(err?.response?.data?.message || "Something went wrong");
        })
        .finally(() => {
          setLoading(false);
        });
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
