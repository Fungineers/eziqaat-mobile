import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useContext } from "react";
import * as api from "../api/backend";
import { useSnackbar } from "./snackbar.context";

const { createContext } = require("react");

const signedOut = () => ({
  signedIn: false,
  authenticating: false,
  signingIn: false,
  user: null,
  error: null,
});

const authenticating = () => ({
  signedIn: false,
  authenticating: true,
  signingIn: false,
  user: null,
  error: null,
});

const signingIn = () => ({
  signedIn: false,
  authenticating: false,
  signingIn: true,
  user: null,
  error: null,
});

const signedIn = (user) => ({
  signedIn: true,
  authenticating: false,
  signingIn: false,
  user,
  error: null,
});

const signinFailed = (error) => ({
  signedIn: false,
  authenticating: false,
  signingIn: false,
  user: null,
  error,
});

const AuthContext = createContext({
  data: signedOut(),
  signin: ({ credential, password }) => {},
  signout: async () => {},
});

export const AuthProvider = ({ children }) => {
  const tokenStorage = useAsyncStorage("token");

  const snackbar = useSnackbar();

  const [auth, setAuth] = useState(signedOut());

  const authenticate = () => {
    setAuth(authenticating());
    api
      .me()
      .then(async (res) => {
        const { user } = res.data;
        setAuth(signedIn(user));
      })
      .catch((err) => {
        console.log(err);
        setAuth(signedOut());
      });
  };

  useEffect(authenticate, []);

  const signin = ({ credential, password }, callback = () => {}) => {
    setAuth(signingIn());
    api
      .signin({ credential, password })
      .then(async (res) => {
        const { token, user } = res.data;
        await tokenStorage.setItem(token);
        snackbar.show({ message: "Successfully signed in" });

        setAuth(signedIn(user));
        callback();
      })
      .catch((err) => {
        setAuth(
          signinFailed(err?.response?.data?.message || "Something went wrong")
        );
      });
  };

  const signout = async () => {
    setAuth(signedOut());
    await tokenStorage.removeItem();
  };

  console.log("AUTH STATE", auth);

  return (
    <AuthContext.Provider
      value={{
        data: auth,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};
