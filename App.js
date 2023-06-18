import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import {
  MD3LightTheme,
  Provider as PaperProvider,
  Snackbar,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./context/auth.context";
import { SnackbarProvider, useSnackbar } from "./context/snackbar.context";
import Login from "./screens/Login";
import Main from "./screens/Main";
import ResetPassword from "./screens/ResetPassword";
import Signup from "./screens/Signup";

const theme = {
  ...MD3LightTheme,
  roundness: 2,
};

const RootStack = createNativeStackNavigator();

const AppWrapper = ({ children }) => {
  return (
    <SnackbarProvider>
      <AuthProvider>{children}</AuthProvider>
    </SnackbarProvider>
  );
};

const App = () => {
  const { snackbar } = useSnackbar();

  console.log(snackbar);

  return (
    <AppWrapper>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
              <RootStack.Screen name="login" component={Login} />
              <RootStack.Screen name="signup" component={Signup} />
              <RootStack.Screen
                name="reset-password"
                component={ResetPassword}
              />
              <RootStack.Screen name="main" component={Main} />
            </RootStack.Navigator>
          </NavigationContainer>
          {snackbar && (
            <Snackbar {...snackbar.props}>{snackbar.message}</Snackbar>
          )}
        </PaperProvider>
      </SafeAreaProvider>
    </AppWrapper>
  );
};

export default App;
