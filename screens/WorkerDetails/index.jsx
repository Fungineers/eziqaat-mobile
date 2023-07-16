import { useRoute } from "@react-navigation/core";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";

const WorkerDetails = () => {
  const route = useRoute();

  const { workerId } = route.params;

  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "column",
        gap: 16,
        padding: 16,
      }}
    ></ScrollView>
  );
};

export default WorkerDetails;
