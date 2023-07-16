import { StackActions } from "@react-navigation/core";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PendingDonationsChairperson from "./PendingDonationsChairperson";
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
