import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import * as api from "../api/backend";
import { useSnackbar } from "../context/snackbar.context";
import { useNavigation } from "@react-navigation/core";

const useNewCollectionRegistered = (donorId) => {
  const snackbar = useSnackbar();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const form = useFormik({
    initialValues: {
      address: "",
      amount: "",
    },
    validationSchema: Yup.object().shape({
      address: Yup.string().required("Address is required"),
      amount: Yup.number().required("Amount is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      setError(null);
      api
        .createNewCollectionRegistered({ donorId, ...values })
        .then((res) => {
          const { message } = res.data;
          resetForm();
          navigation.goBack();
          snackbar.show({ message });
        })
        .catch((err) => {
          const message =
            err?.response?.data?.message || "Something went wrong";
          snackbar.show({ message });
          setError(message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return {
    loading,
    error,
    form,
  };
};

export default useNewCollectionRegistered;
