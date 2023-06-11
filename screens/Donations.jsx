import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PendingDonationsChairperson from "./PendingDonationsChairperson";

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
