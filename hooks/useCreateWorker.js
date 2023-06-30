import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import * as api from "../api/backend";
import regexps from "../constants/regexps";
import { useSnackbar } from "../context/snackbar.context";

const useSignup = ({ successCallback = () => {} }) => {
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
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().optional().matches(regexps.email, {
        message: "Incorrect format",
      }),
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
        .createWorker(values)
        .then((res) => {
          console.log(res.data);
          setSuccess(true);
          snackbar.show({
            message: "Worker created successfully",
          });
          resetForm();
          successCallback();
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
