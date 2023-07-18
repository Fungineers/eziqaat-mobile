import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import regexps from "../constants/regexps";
import * as api from "../api/backend";
import { useSnackbar } from "../context/snackbar.context";

const useRegisterDonor = () => {
  const snackbar = useSnackbar();

  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        .signup(values)
        .then((res) => {
          const { user } = res.data;
          setDonor(user);
          snackbar.show({
            message: "Successfully registered donor.",
          });
          resetForm();
        })
        .catch((err) => {
          const message =
            err?.response?.data?.message || "Something went wrong";
          setError(message);
          snackbar.show({
            message,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return {
    loading,
    donor,
    error,
    clearDonor: () => setDonor(null),
    form,
  };
};

export default useRegisterDonor;
