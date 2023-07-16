import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./context/auth.context";
import { SnackbarProvider } from "./context/snackbar.context";
import Navigator from "./navigator";
import theme from "./theme";
import { AreasProvider } from "./context/areas.context";

const App = () => {
  return (
    <SafeAreaProvider>
      <SnackbarProvider>
        <AuthProvider>
          <AreasProvider>
            <PaperProvider theme={theme}>
              <NavigationContainer
                theme={{
                  colors: {
                    ...theme.colors,
                    card: theme.colors.background,
                  },
                }}
              >
                <Navigator />
              </NavigationContainer>
            </PaperProvider>
          </AreasProvider>
        </AuthProvider>
      </SnackbarProvider>
    </SafeAreaProvider>
  );
};

export default App;
