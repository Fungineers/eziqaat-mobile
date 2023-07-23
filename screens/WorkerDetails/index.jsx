import { useRoute } from "@react-navigation/core";
import { Linking, ScrollView, View } from "react-native";
import useWorkerDetails from "../../hooks/useWorkerDetails";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import InfoItem from "./InfoItem";
import { Button } from "react-native-paper";
import WorkerStats from "./WorkerStats";

const WorkerDetails = () => {
  const route = useRoute();

  const { workerId } = route.params;

  const worker = useWorkerDetails(workerId);

  useEffect(() => {
    worker.fetch();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "column",
        gap: 16,
        padding: 16,
      }}
    >
      {worker.loading ? (
        <Loading />
      ) : (
        !worker.error &&
        !!worker.data && (
          <>
            <InfoItem
              icon="account-outline"
              label="Name"
              description={`${worker.data.workerDetails?.firstName} ${worker.data.workerDetails?.lastName}`}
            />
            <InfoItem
              icon="phone-outline"
              label="Phone"
              description={worker.data.workerDetails?.phone}
            />
            <InfoItem
              icon="card-account-details-outline"
              label="CNIC"
              description={worker.data.workerDetails?.cnic}
            />
            <InfoItem
              icon="email-outline"
              label="E-mail"
              description={worker.data.workerDetails?.email || "(Unset)"}
            />
            <View style={{ flexDirection: "row", gap: 15, width: "100%" }}>
              <Button
                style={{ flex: 1 }}
                mode="contained-tonal"
                icon="phone-outline"
                onPress={() => {
                  Linking.openURL(`tel:${worker.data.workerDetails.phone}`);
                }}
              >
                Call
              </Button>
              <Button
                style={{ flex: 1 }}
                mode="contained-tonal"
                icon="email-outline"
                disabled={!worker.data.workerDetails.email}
                onPress={() => {
                  Linking.openURL(`mailto:${worker.data.workerDetails.email}`);
                }}
              >
                Email
              </Button>
            </View>
            <WorkerStats
              data={{
                totalCashFlow: worker.data.totalCashFlow,
                collectionCount: worker.data.collectionCount,
                inProgress: worker.data.inProgress,
              }}
            />
          </>
        )
      )}
    </ScrollView>
  );
};

export default WorkerDetails;
