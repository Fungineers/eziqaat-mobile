import { useFormik } from "formik";
import * as Yup from "yup";
import { useAreas } from "../context/areas.context";
import * as api from "../api/backend";
import { useState } from "react";
import { useSnackbar } from "../context/snackbar.context";
import { useNavigation } from "@react-navigation/core";

const useRequestDonation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const areas = useAreas();
  const snackbar = useSnackbar();
  const navigation = useNavigation();

  const form = useFormik({
    initialValues: {
      areaId: "",
      address: "",
      amount: "",
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      areaId: Yup.string()
        .required("Area is required")
        .oneOf(
          areas.data.map((area) => area.id),
          "Area is invalid"
        ),
      address: Yup.string().required("Address is required"),
      amount: Yup.number().required("Amount is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      api
        .donorDonationRequest(values)
        .then((res) => {
          const { message } = res.data;
          snackbar.show({ message });
          resetForm();
        })
        .catch((err) => {
          const message =
            err?.response?.data?.message || "Something went wrong";
          snackbar.show({ message });
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
    disabled: loading || areas.loading,
    areaOptions: areas.data.map((area) => ({
      label: area.areaName,
      value: area.id,
    })),
  };
};

export default useRequestDonation;
