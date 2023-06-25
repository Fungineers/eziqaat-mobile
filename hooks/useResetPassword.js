import { useFormik } from "formik";
import * as Yup from "yup";
import * as api from "../api/backend";
import { useState } from "react";
import { useSnackbar } from "../context/snackbar.context";
import regexps from "../constants/regexps";

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const snackbar = useSnackbar();

  const form = useFormik({
    initialValues: {
      credential: "",
    },
    validationSchema: Yup.object().shape({
      credential: Yup.string()
        .required("Required")
        .test({
          test: (value) => {
            return (
              regexps.cnic.test(value) ||
              regexps.email.test(value) ||
              regexps.phone.test(value)
            );
          },
          message: "Invalid credential format",
        }),
    }),
    onSubmit: (values) => {
      setLoading(true);
      api
        .resetPassword(values)
        .then((res) => {
          snackbar.show({ message: res.data?.message });
          setSuccess(true);
        })
        .catch((error) => {
          snackbar.show({
            message: error?.response?.data?.message || "Something went wrong",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return {
    loading,
    success,
    form,
  };
};

export default useResetPassword;
