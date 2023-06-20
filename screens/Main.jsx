import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { StyleSheet, View } from "react-native";
import { Button, Caption, Paragraph, Title } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../context/auth.context";
import Donations from "./Donations";
import ProfileAndSettings from "./ProfileAndSettings";

const MainDrawer = createDrawerNavigator();

const DrawerContent = (props) => {
  const auth = useAuth();

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <DrawerContentScrollView {...props} style={{ flex: 1 }}>
        <View style={styles.userInfoSection}>
          {/* <Avatar.Image
            source={{
              uri: "https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg",
            }}
            size={50}
          /> */}
          <Title style={styles.title}>Daniyal Aamir</Title>
          <Caption style={styles.caption}>Chairperson - Hussainabad</Caption>
          <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                16
              </Paragraph>
              <Caption style={styles.caption}>Workers</Caption>
            </View>
          </View>
        </View>
        <View style={styles.drawerContent}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 10 }}>
        <Button
          mode="contained"
          style={{ width: "100%" }}
          // loading={login.loading}
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
    paddingLeft: 20,
    marginBottom: 20,
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

const Main = () => {
  return (
    <MainDrawer.Navigator drawerContent={DrawerContent}>
      <MainDrawer.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          drawerIcon: (props) => (
            <MaterialCommunityIcons {...props} name="view-dashboard-outline" />
          ),
        }}
        component={() => <></>}
      />
      <MainDrawer.Screen
        name="worker-management"
        options={{
          title: "Worker Management",
          drawerIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              name="account-cowboy-hat-outline"
            />
          ),
        }}
        component={() => <></>}
      />
      <MainDrawer.Screen
        name="donations"
        options={{
          title: "Donations",
          drawerIcon: (props) => (
            <MaterialCommunityIcons {...props} name="cash" />
          ),
        }}
        component={Donations}
      />
      <MainDrawer.Screen
        name="visualization-and-insights"
        options={{
          title: "Visualization & Insights",
          drawerIcon: (props) => (
            <MaterialCommunityIcons {...props} name="chart-bell-curve" />
          ),
        }}
        component={() => <></>}
      />
      <MainDrawer.Screen
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
    </MainDrawer.Navigator>
  );
};

export default Main;
