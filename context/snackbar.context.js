import { createContext, useContext, useState } from "react";

const SnackbarContext = createContext({
  snackbar: null,
  show: ({ message }) => {},
});

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState(null);

  const show = ({ message }) => {
    setSnackbar({
      props: {
        visible: true,
        onDismiss: () => {
          setSnackbar(null);
        },
        action: {
          label: "Okay",
          onPress: () => {
            setSnackbar(null);
          },
        },
        children: [message],
      },
      message,
    });

    setTimeout(() => {
      setSnackbar(null);
    }, 3000);
  };

  return (
    <SnackbarContext.Provider
      value={{
        snackbar,
        show,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const snackbar = useContext(SnackbarContext);
  return snackbar;
};
