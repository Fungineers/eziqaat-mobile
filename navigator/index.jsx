import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Loading from "../components/Loading";
import { CHAIRPERSON, DONOR, WORKER } from "../constants/roles";
import { useAuth } from "../context/auth.context";
import ChairpersonDonationDetails from "../screens/ChairpersonDonationDetails";
import Login from "../screens/Login";
import ResetPassword from "../screens/ResetPassword";
import Signup from "../screens/Signup";
import WorkerDetails from "../screens/WorkerDetails";
import ChairpersonDrawer from "./ChairpersonDrawer";
import DonorDrawer from "./DonorDrawer";
import WorkerDrawer from "./WorkerDrawer";
import WorkerDonationDetails from "../screens/WorkerDonationDetails";
import NewCollection from "../screens/NewCollection";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import GetStarted from "../screens/GetStarted";
import DonorDonationDetails from "../screens/DonorDonationDetails";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const auth = useAuth();
  const onboardedStorage = useAsyncStorage("onboarded");

  const [onboarded, setOnboarded] = useState(false);

  useEffect(() => {
    const effect = async () => {
      onboardedStorage
        .getItem()
        .then((value) => {
          if (value) {
            setOnboarded(true);
          }
        })
        .catch(console.log);
    };

    effect();
  }, [auth.data.signedIn]);

  if (auth.data.authenticating) {
    return <Loading />;
  }

  if (!auth.data.signedIn) {
    return (
      <Stack.Navigator
        initialRouteName={onboarded ? "login" : "onboarding"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="onboarding" component={GetStarted} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="reset-password" component={ResetPassword} />
      </Stack.Navigator>
    );
  }

  if (auth.data.user.role === DONOR) {
    return (
      <Stack.Navigator
        initialRouteName="donor-drawer"
        screenOptions={{ headerShown: false, headerShadowVisible: false }}
      >
        <Stack.Screen name="donor-drawer" component={DonorDrawer} />
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Donation Info",
            headerTitle: "Donation Info",
          }}
          name="donor-donation-details"
          component={DonorDonationDetails}
        />
      </Stack.Navigator>
    );
  }

  if (auth.data.user.role === WORKER) {
    return (
      <Stack.Navigator
        initialRouteName="worker-drawer"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="worker-drawer" component={WorkerDrawer} />
        <Stack.Screen
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerTitle: "Donation Info",
            title: "Donation Info",
          }}
          name="worker-donation-details"
          component={WorkerDonationDetails}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerTitle: "Add New Collection",
            title: "Add New Collection",
          }}
          name="worker-add-new-collection"
          component={NewCollection}
        />
      </Stack.Navigator>
    );
  }

  if (auth.data.user.role === CHAIRPERSON) {
    return (
      <Stack.Navigator
        initialRouteName="chairperson-drawer"
        screenOptions={{ headerShown: false, headerShadowVisible: false }}
      >
        <Stack.Screen name="chairperson-drawer" component={ChairpersonDrawer} />
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Worker Details",
            headerTitle: "Worker Details",
          }}
          name="chairperson-worker-details"
          component={WorkerDetails}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Donation Info",
            headerTitle: "Donation Info",
          }}
          name="chairperson-donation-details"
          component={ChairpersonDonationDetails}
        />
      </Stack.Navigator>
    );
  }
};

export default Navigator;
