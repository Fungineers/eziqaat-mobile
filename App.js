import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Provider as PaperProvider, Snackbar } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Loading from "./components/Loading";
import { AuthProvider, useAuth } from "./context/auth.context";
import { SnackbarProvider, useSnackbar } from "./context/snackbar.context";
import Login from "./screens/Login";
import Main from "./screens/Main";
import ResetPassword from "./screens/ResetPassword";
import Signup from "./screens/Signup";
import theme from "./theme";

const RootStack = createNativeStackNavigator();

const App = () => {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
              <AppInner />
            </NavigationContainer>
          </PaperProvider>
        </SafeAreaProvider>
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
    <>
      <RootStack.Navigator
        initialRouteName={auth.data.signedIn ? "login" : "login"}
        screenOptions={{ headerShown: false }}
      >
        {auth.data.signedIn ? (
          <RootStack.Screen name="main" component={Main} />
        ) : (
          <>
            <RootStack.Screen name="login" component={Login} />
            <RootStack.Screen name="signup" component={Signup} />
            <RootStack.Screen name="reset-password" component={ResetPassword} />
          </>
        )}
      </RootStack.Navigator>
      <Snackbar
        visible={snackbar.message}
        onDismiss={snackbar.hide}
        action={{ label: "Okay", onPress: snackbar.hide }}
      >
        {snackbar.message}
      </Snackbar>
    </>
  );
};

export default App;
