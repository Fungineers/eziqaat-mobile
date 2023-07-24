import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import * as api from "../api/backend";
import regexps from "../constants/regexps";
import { useSnackbar } from "../context/snackbar.context";

const useAddPending = ({ successCallback = () => {} }) => {
  const snackbar = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const form = useFormik({
    initialValues: {
      refName: "",
      refPhone: "",
      address: "",
      amount: "",
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      refName: Yup.string().required("Required"),
      refPhone: Yup.string()
        .required("Required")
        .matches(regexps.phone, { message: "Incorrect format" }),
      address: Yup.string().required("Address is required"),
      amount: Yup.number().required("Amount is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      api
        .addPendingUnregistered(values)
        .then((res) => {
          console.log(res.data);
          setSuccess(true);
          snackbar.show({
            message: "Record added successfully",
          });
          resetForm();
          successCallback();
        })
        .catch((err) => {
          console.log(err);
          const message =
            err?.response?.data?.message || "Something went wrong";
          setError(message);
          snackbar.show("error", message);
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

export default useAddPending;
