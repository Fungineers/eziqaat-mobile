import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Loading from "../components/Loading";
import { CHAIRPERSON, DONOR, WORKER } from "../constants/roles";
import { useAuth } from "../context/auth.context";
import Login from "../screens/Login";
import Main from "../screens/Main";
import ResetPassword from "../screens/ResetPassword";
import Signup from "../screens/Signup";
import DonorDrawer from "./DonorDrawer";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const auth = useAuth();

  if (auth.data.authenticating) {
    return <Loading />;
  }

  if (!auth.data.signedIn) {
    return (
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="reset-password" component={ResetPassword} />
      </Stack.Navigator>
    );
  }

  if (auth.data.user.role === DONOR) {
    return (
      <Stack.Navigator
        initialRouteName="donor-drawer"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="donor-drawer" component={DonorDrawer} />
      </Stack.Navigator>
    );
  }

  if (auth.data.user.role === WORKER) {
    return (
      <Stack.Navigator
        initialRouteName="worker-drawer"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="worker-drawer" component={Main} />
      </Stack.Navigator>
    );
  }

  if (auth.data.user.role === CHAIRPERSON) {
    return (
      <Stack.Navigator
        initialRouteName="chairperson-drawer"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="chairperson-drawer" component={Main} />
      </Stack.Navigator>
    );
  }
};

export default Navigator;
