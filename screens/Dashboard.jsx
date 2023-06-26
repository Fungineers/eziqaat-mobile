import { ScrollView, View } from "react-native";
import DashboardExplore from "../components/DashboardExplore";
import DashboardStats from "../components/DashboardStats";
import WelcomeSection from "../components/WelcomeSection";

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
