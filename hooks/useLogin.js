import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/auth.context";

const useLogin = () => {
  const auth = useAuth();

  const form = useFormik({
    initialValues: {
      credential: "",
      password: "",
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      credential: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: auth.signin,
  });

  return {
    loading: auth.data.signingIn,
    success: auth.data.signedIn,
    error: auth.data.error,
    form,
  };
};

export default useLogin;
