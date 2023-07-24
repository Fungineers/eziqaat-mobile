import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Caption, Title, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../context/auth.context";
import Dashboard from "../screens/Dashboard";
import ProfileAndSettings from "../screens/ProfileAndSettings";
import DonationRequest from "../screens/DonationRequest";
import DonorRequests from "../screens/DonorRequests";
import DonorDashboard from "../screens/DonorDashboard";
import DonorHistory from "../screens/DonorHistory";
import upperSnakeCaseToSentenceCase from "../utils/upperSnakeCaseToSentenceCase";

const Drawer = createDrawerNavigator();

const DrawerContent = (props) => {
  const auth = useAuth();

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <DrawerContentScrollView {...props} style={{ flex: 1 }}>
        <View style={styles.userInfoSection}>
          <Avatar.Text label={auth.data.user?.firstName?.charAt(0)} />
          <Title style={styles.title}>
            {auth.data.user?.firstName} {auth.data.user?.lastName}
          </Title>
          <Caption style={styles.caption}>
            {upperSnakeCaseToSentenceCase(auth.data.user?.role)}
          </Caption>
        </View>
        <View style={styles.drawerContent}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 10 }}>
        <Button
          mode="contained-tonal"
          style={{ width: "100%" }}
          icon="logout"
          onPress={auth.signout}
        >
          Log out
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
});

const DonorDrawer = () => {
  const theme = useTheme();
  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        headerShadowVisible: false,
        headerBackgroundContainerStyle: {
          backgroundColor: theme.colors.surface,
        },
        unmountOnBlur: true,
      }}
    >
      <Drawer.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          // headerRight: NotificationMenu,
          drawerIcon: (props) => (
            <MaterialCommunityIcons {...props} name="view-dashboard-outline" />
          ),
        }}
        component={DonorDashboard}
      />
      <Drawer.Screen
        name="donation-request"
        options={{
          title: "Request Donation",
          drawerIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              name="arrow-up-bold-hexagon-outline"
            />
          ),
        }}
        component={DonationRequest}
      />
      <Drawer.Screen
        name="requests"
        options={{
          title: "Your requests",
          drawerIcon: (props) => (
            <MaterialCommunityIcons {...props} name="format-list-text" />
          ),
        }}
        component={DonorRequests}
      />
      <Drawer.Screen
        name="donation-history"
        options={{
          title: "Donation History",
          drawerIcon: (props) => (
            <MaterialCommunityIcons {...props} name="hand-coin-outline" />
          ),
        }}
        component={DonorHistory}
      />
      <Drawer.Screen
        name="profile-and-settings"
        options={{
          title: "Profile & Settings",
          drawerIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              name="account-settings-outline"
            />
          ),
        }}
        component={ProfileAndSettings}
      />
    </Drawer.Navigator>
  );
};

export default DonorDrawer;
