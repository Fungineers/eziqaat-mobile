import { createContext, useContext, useState } from "react";
import { Snackbar } from "react-native-paper";

const SnackbarContext = createContext({
  message: null,
  hide: () => {},
  show: ({ message }) => {},
});

export const SnackbarProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const hide = () => {
    setMessage(null);
  };

  const show = ({ message }) => {
    setMessage(message);

    setTimeout(hide, 5000);
  };

  console.log("SNACK", message);

  return (
    <SnackbarContext.Provider
      value={{
        message,
        show,
        hide,
      }}
    >
      {children}
      <Snackbar
        visible={message}
        onDismiss={hide}
        icon="check"
        action={{ label: "Okay", onPress: hide }}
        style={{ zIndex: 100 }}
      >
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const snackbar = useContext(SnackbarContext);
  return snackbar;
};
