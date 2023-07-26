import { Linking, ScrollView, View } from "react-native";
import InfoItem from "./InfoItem";
import { useRoute } from "@react-navigation/core";
import useDonationInfo from "../../hooks/useDonationInfo";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import upperSnakeCaseToSentenceCase from "../../utils/upperSnakeCaseToSentenceCase";
import { Button, Divider, Text } from "react-native-paper";
import moment from "moment/moment";
import Note from "../../components/Note";

const WorkerDonationDetails = () => {
  const route = useRoute();

  const { donationId } = route.params;

  const donationInfo = useDonationInfo(donationId);

  useEffect(() => {
    donationInfo.fetch();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 15,
        paddingBottom: 100,
        gap: 15,
      }}
    >
      {donationInfo.loading ? (
        <Loading />
      ) : !donationInfo.error & !!donationInfo.data ? (
        <>
          <InfoItem
            icon="identifier"
            label="TID"
            description={donationInfo.data.id}
          />
          <InfoItem
            icon="crosshairs-question"
            label="Status"
            description={upperSnakeCaseToSentenceCase(donationInfo.data.status)}
          />
          <Text variant="titleMedium">Timeline</Text>

          {!!donationInfo.data.requestedAt && (
            <InfoItem
              icon="calendar-plus"
              label="Requested"
              description={`${moment(
                new Date(donationInfo.data.requestedAt)
              ).format("LLL")} (${moment(
                new Date(donationInfo.data.requestedAt)
              ).fromNow()})`}
            />
          )}

          {!!donationInfo.data.requestedAt && (
            <InfoItem
              icon="calendar"
              label="Approved"
              description={`${moment(
                new Date(donationInfo.data.approvedAt)
              ).format("LLL")} (${moment(
                new Date(donationInfo.data.approvedAt)
              ).fromNow()})`}
            />
          )}
          {!donationInfo.data.approvedAt && !donationInfo.data.requestedAt ? (
            !!donationInfo.data.collectedAt && !donationInfo.data.acceptedAt ? (
              <>
                <Note text="This collection was directly done by the worker" />
                <InfoItem
                  icon="calendar-plus"
                  label="Collected"
                  description={`${moment(
                    new Date(donationInfo.data.collectedAt)
                  ).format("LLL")} (${moment(
                    new Date(donationInfo.data.collectedAt)
                  ).fromNow()})`}
                />
              </>
            ) : (
              <>
                <Note text="This record was directly created by the chairperson" />
                <InfoItem
                  icon="clock-plus"
                  label="Created"
                  description={`${moment(
                    new Date(donationInfo.data.createdAt)
                  ).format("LLL")} (${moment(
                    new Date(donationInfo.data.createdAt)
                  ).fromNow()})`}
                />
                {!!donationInfo.data.acceptedAt && (
                  <InfoItem
                    icon="calendar-clock-outline"
                    label="Accepted"
                    description={`${moment(
                      new Date(donationInfo.data.acceptedAt)
                    ).format("LLL")} (${moment(
                      new Date(donationInfo.data.acceptedAt)
                    ).fromNow()})`}
                  />
                )}
                {!!donationInfo.data.collectedAt && (
                  <InfoItem
                    icon="calendar-check-outline"
                    label="Collected"
                    description={`${moment(
                      new Date(donationInfo.data.collectedAt)
                    ).format("LLL")} (${moment(
                      new Date(donationInfo.data.collectedAt)
                    ).fromNow()})`}
                  />
                )}
              </>
            )
          ) : (
            <>
              {!!donationInfo.data.acceptedAt && (
                <InfoItem
                  icon="calendar-clock-outline"
                  label="Accepted"
                  description={`${moment(
                    new Date(donationInfo.data.acceptedAt)
                  ).format("LLL")} (${moment(
                    new Date(donationInfo.data.acceptedAt)
                  ).fromNow()})`}
                />
              )}
              {!!donationInfo.data.collectedAt && (
                <InfoItem
                  icon="calendar-check-outline"
                  label="Collected"
                  description={`${moment(
                    new Date(donationInfo.data.collectedAt)
                  ).format("LLL")} (${moment(
                    new Date(donationInfo.data.collectedAt)
                  ).fromNow()})`}
                />
              )}
            </>
          )}
          <Divider />
          <Text variant="titleMedium">Donation Details</Text>
          <InfoItem
            icon="map-marker-outline"
            label="Address"
            description={donationInfo.data.address}
          />
          <InfoItem
            icon="cash-multiple"
            label="Amount"
            description={`PKR ${Intl.NumberFormat("en-US").format(
              donationInfo.data.amount
            )}`}
          />
          <Divider />
          <Text variant="titleMedium">Donor Info</Text>
          {!donationInfo.data.donorId ? (
            <>
              <InfoItem
                icon="account-outline"
                label="Ref Name"
                description={donationInfo.data.refName}
              />
              <InfoItem
                icon="phone-outline"
                label="Ref Phone"
                description={donationInfo.data.refPhone}
              />
            </>
          ) : (
            <>
              <InfoItem
                icon="account-outline"
                label="Name"
                description={donationInfo.data.donorName}
              />
              <InfoItem
                icon="phone-outline"
                label="Phone"
                description={donationInfo.data.donorPhone}
              />
              <InfoItem
                icon="card-account-details-outline"
                label="CNIC"
                description={donationInfo.data.donorCnic}
              />
              <InfoItem
                icon="email-outline"
                label="E-mail"
                description={donationInfo.data.donorEmail || "(Unset)"}
              />
            </>
          )}
          <View style={{ flexDirection: "row", gap: 15, width: "100%" }}>
            <Button
              style={{ flex: 1 }}
              mode="contained-tonal"
              icon="phone-outline"
              onPress={() => {
                Linking.openURL(`tel:${donationInfo.data.donorPhone}`);
              }}
            >
              Call
            </Button>
            <Button
              style={{ flex: 1 }}
              mode="contained-tonal"
              icon="email-outline"
              disabled={!donationInfo.data.donorEmail}
              onPress={() => {
                Linking.openURL(`mailto:${donationInfo.data.donorEmail}`);
              }}
            >
              Email
            </Button>
          </View>
          <Divider />

          {donationInfo.data.status === "PENDING" ? (
            <Button
              mode="contained"
              icon="check"
              loading={donationInfo.accepting}
              disabled={donationInfo.accepting}
              onPress={donationInfo.accept}
            >
              Accept
            </Button>
          ) : (
            donationInfo.status !== "REQUESTED" && (
              <>
                {donationInfo.data.status === "ACCEPTED" ? (
                  <>
                    <Button
                      mode="contained"
                      icon="check"
                      loading={donationInfo.collecting}
                      disabled={donationInfo.collecting}
                      onPress={donationInfo.collect}
                    >
                      Mark as collected
                    </Button>
                  </>
                ) : (
                  <></>
                )}
              </>
            )
          )}
        </>
      ) : null}
    </ScrollView>
  );
};

export default WorkerDonationDetails;
