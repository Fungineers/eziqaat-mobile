import { ScrollView, View } from "react-native";
import WelcomeSection from "./WelcomeSection";
import DashboardStats from "./DashboardStats";
import DashboardExplore from "./DashboardExplore";

const WorkerDashboard = () => {
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

export default WorkerDashboard;
