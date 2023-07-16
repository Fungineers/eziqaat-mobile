import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PendingDonationsChairperson from "./PendingDonationsChairperson";
import { StackActions, TabActions } from "@react-navigation/core";
import RequestedDonationsChairperson from "./RequestedDonationsChairperson";

const Tab = createMaterialTopTabNavigator();

const Donations = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#888",
        tabBarLabelStyle: {
          fontSize: 11,
        },
        tabBarAndroidRipple: { borderless: true },
      }}
      screenListeners={({ navigation }) => ({
        blur: () => {
          const state = navigation.getState();

          state.routes.forEach((route, tabIndex) => {
            console.log("LOg");
            if (state?.index !== tabIndex && route.state?.index > 0) {
              navigation.dispatch(StackActions.popToTop());
            }
          });
        },
      })}
    >
      <Tab.Screen
        name="requested-donations"
        options={{ title: "Requested" }}
        component={RequestedDonationsChairperson}
      />
      <Tab.Screen
        name="pending-donations"
        options={{ title: "Pending" }}
        component={PendingDonationsChairperson}
      />
      <Tab.Screen
        name="accepted-donations"
        options={{ title: "Accepted" }}
        component={() => {}}
      />
      <Tab.Screen
        name="collected-donations"
        options={{ title: "Collected" }}
        component={() => {}}
      />
    </Tab.Navigator>
  );
};

export default Donations;
