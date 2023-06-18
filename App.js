import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import {
  ActivityIndicator,
  MD3LightTheme,
  Provider as PaperProvider,
  Snackbar,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "./context/auth.context";
import { SnackbarProvider, useSnackbar } from "./context/snackbar.context";
import Loading from "./components/Loading";
import Login from "./screens/Login";
import Main from "./screens/Main";
import ResetPassword from "./screens/ResetPassword";
import Signup from "./screens/Signup";

const theme = {
  ...MD3LightTheme,
  roundness: 2,
};

const RootStack = createNativeStackNavigator();

const App = () => {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </SnackbarProvider>
  );
};

const AppInner = () => {
  const snackbar = useSnackbar();
  const auth = useAuth();

  if (auth.data.authenticating) {
    return <Loading />;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <RootStack.Navigator
            initialRouteName={auth.data.signedIn ? "main" : "login"}
            screenOptions={{ headerShown: false }}
          >
            <RootStack.Screen name="login" component={Login} />
            <RootStack.Screen name="signup" component={Signup} />
            <RootStack.Screen name="reset-password" component={ResetPassword} />
            <RootStack.Screen name="main" component={Main} />
          </RootStack.Navigator>
        </NavigationContainer>
        <Snackbar
          visible={snackbar.message}
          onDismiss={snackbar.hide}
          action={{ label: "Okay", onPress: snackbar.hide }}
        >
          {snackbar.message}
        </Snackbar>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
