import { useState } from "react";
import { useAuth } from "../context/auth.context";
import * as api from "../api/backend";
import { useFormik } from "formik";
import * as Yup from "yup";
import regexps from "../constants/regexps";
import { useSnackbar } from "../context/snackbar.context";

const useSettings = () => {
  const auth = useAuth();
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(false);

  const emailForm = useFormik({
    initialValues: {
      email: auth.data?.user?.email || "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Required")
        .matches(regexps.email, { message: "Invalid format" }),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      api
        .changeEmail(values)
        .then((res) => {
          snackbar.show({ message: "Email updated successfully" });
          auth.update("email", values.email);
          resetForm();
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

  const phoneForm = useFormik({
    initialValues: {
      phone: auth.data?.user?.phone || "",
    },
    validationSchema: Yup.object().shape({
      phone: Yup.string()
        .required("Required")
        .matches(regexps.phone, { message: "Invalid format" }),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      api
        .changePhone(values)
        .then(() => {
          resetForm();
          snackbar.show({ message: "Phone updated successfully" });
          auth.signout();
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

  const passwordForm = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema: Yup.object().shape({
      currentPassword: Yup.string().required("Required"),
      newPassword: Yup.string().required("Required").matches(regexps.password, {
        message: "Please choose a strong password",
      }),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      api
        .changePassword(values)
        .then(() => {
          resetForm();
          snackbar.show({ message: "Password updated successfully" });
          auth.signout();
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
    emailForm,
    phoneForm,
    passwordForm,
  };
};

export default useSettings;
