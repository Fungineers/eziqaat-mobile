import { ScrollView, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import WelcomeSection from "../components/WelcomeSection";
import DashboardStats from "../components/DashboardStats";
import DashboardExplore from "../components/DashboardExplore";

const Dashboard = () => {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={{ flexDirection: "column", gap: 16 }}>
        <WelcomeSection />
        <DashboardStats />
        <DashboardExplore />
      </View>
    </ScrollView>
  );
};

export default Dashboard;
