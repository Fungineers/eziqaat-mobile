import { Linking, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import useWorkerDetails from "../../hooks/useWorkerDetails";
import InfoItem from "./InfoItem";
import WorkerDetailsItem from "./WorkerDetailsItem";

const WorkerDetails = ({ worker }) => {
  const theme = useTheme();
  const workerDetails = useWorkerDetails({ id: worker.id });

  return (
    <>
      <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
        <Avatar.Text
          size={64}
          label={workerDetails.data?.firstName?.charAt(0) || "..."}
          color={theme.colors.primary}
          style={{
            backgroundColor: theme.colors.primaryContainer,
            alignSelf: "flex-start",
          }}
        />
        <View style={{ flex: 1, flexDirection: "column", gap: 8 }}>
          <Text variant="labelLarge" style={{ color: theme.colors.primary }}>
            {workerDetails.data?.firstName} {workerDetails.data?.lastName}
          </Text>
          <View style={{ flexDirection: "column", gap: 4 }}>
            {workerDetails.loading ? (
              <ActivityIndicator
                style={{
                  alignSelf: "flex-start",
                  marginLeft: 20,
                  height: theme.fonts.bodyLarge.lineHeight,
                }}
              />
            ) : (
              <>
                <InfoItem
                  icon="phone"
                  description={workerDetails.data?.phone}
                />
                <InfoItem
                  icon="email"
                  description={workerDetails.data?.email || "(Not available)"}
                />
                <InfoItem
                  icon="card-account-details-outline"
                  description={workerDetails.data?.cnic}
                />
                <InfoItem
                  icon="calendar-blank"
                  description={new Date(
                    workerDetails.data?.assignedAt
                  ).toLocaleString()}
                />
              </>
            )}
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Button
          loading={workerDetails.loading}
          icon="phone"
          mode="contained-tonal"
          onPress={() => {
            Linking.openURL(`tel:${workerDetails.data?.phone}`);
          }}
          style={{ flex: 1 }}
        >
          Call
        </Button>
        <Button
          loading={workerDetails.loading}
          icon="email"
          mode="contained-tonal"
          onPress={() => {
            Linking.openURL(`mailto:${workerDetails.data?.email}`);
          }}
          disabled
          style={{ flex: 1 }}
        >
          Email
        </Button>
      </View>

      <Surface
        elevation={1}
        mode="flat"
        style={{
          borderRadius: 8,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: theme.colors.primaryContainer,
        }}
      >
        <TouchableRipple onPress={() => {}}>
          <View>
            <View
              style={{
                flexDirection: "row",
                gap: 16,
                flex: 1,
                flexWrap: "wrap",
                padding: 16,
              }}
            >
              <WorkerDetailsItem
                loading={workerDetails.loading}
                icon="plus-circle-multiple"
                label="Cash Flow"
                description={`${workerDetails.data?.donations?.cashFlow} PKR`}
              />
              <WorkerDetailsItem
                loading={workerDetails.loading}
                icon="counter"
                label="Collections"
                description={`${workerDetails.data?.donations?.collected}`}
              />
              <WorkerDetailsItem
                loading={workerDetails.loading}
                icon="clock-outline"
                label="To collect"
                description={`${workerDetails.data?.donations?.accepted}`}
              />
              <WorkerDetailsItem
                loading={workerDetails.loading}
                icon="map-marker-outline"
                label="Area"
                description={`${workerDetails.data?.areaName}`}
              />
            </View>
            <Button
              mode="contained-tonal"
              style={{ width: "100%", borderRadius: 0 }}
              icon="eye"
              onPress={() => {}}
            >
              View All Collections
            </Button>
          </View>
        </TouchableRipple>
      </Surface>
      <Button
        mode="contained-tonal"
        buttonColor={theme.colors.errorContainer}
        textColor={theme.colors.error}
        style={{ width: "100%" }}
        icon="cancel"
        onPress={() => {}}
      >
        Disable
      </Button>
    </>
  );
};

export default WorkerDetails;
