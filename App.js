import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { MD3LightTheme, Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./context/auth.context";
import Login from "./screens/Login";
import Main from "./screens/Main";
import ResetPassword from "./screens/ResetPassword";
import Signup from "./screens/Signup";

const theme = {
  ...MD3LightTheme,
  roundness: 2,
};

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
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
        </PaperProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
