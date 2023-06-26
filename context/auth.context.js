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

const updateUser = (oldUser, key, value) => ({
  signedIn: true,
  authenticating: false,
  signingIn: false,
  user: {
    ...oldUser,
    [key]: value,
  },
  error: null,
});

const initialData = signedOut();

const AuthContext = createContext({
  data: initialData,
  signin: ({ credential, password }) => {},
  signout: async () => {},
  update: (key, value) => {},
});

export const AuthProvider = ({ children }) => {
  const tokenStorage = useAsyncStorage("token");

  const snackbar = useSnackbar();

  const [auth, setAuth] = useState(initialData);

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

  const signin = ({ credential, password }) => {
    setAuth(signingIn());
    api
      .signin({ credential, password })
      .then(async (res) => {
        const { token, user } = res.data;
        await tokenStorage.setItem(token);
        snackbar.show({ message: "Successfully signed in" });
        setAuth(signedIn(user));
      })
      .catch((err) => {
        const message = err?.response?.data?.message || "Something went wrong";
        setAuth(signinFailed(message));
        snackbar.show({ message });
      });
  };

  const signout = async () => {
    setAuth(signedOut());
    await tokenStorage.removeItem();
  };

  const update = (key, value) => {
    updateUser(auth.data.user, key, value);
  };

  console.log("AUTH STATE", auth);

  return (
    <AuthContext.Provider
      value={{
        data: auth,
        signin,
        signout,
        update,
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
