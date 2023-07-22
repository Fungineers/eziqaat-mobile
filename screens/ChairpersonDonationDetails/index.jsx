import { Linking, ScrollView, View } from "react-native";
import InfoItem from "./InfoItem";
import { useRoute } from "@react-navigation/core";
import useDonationInfo from "../../hooks/useDonationInfo";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import upperSnakeCaseToSentenceCase from "../../utils/upperSnakeCaseToSentenceCase";
import { Button, Divider, Text } from "react-native-paper";
import moment from "moment/moment";

const DonationDetails = () => {
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
          <Divider />
          <Text variant="titleMedium">Timeline</Text>
          {!!donationInfo.data.requestedAt && (
            <InfoItem
              icon="calendar"
              label="Requested"
              description={`${moment(
                new Date(donationInfo.data.requestedAt)
              ).format("LLL")} (${moment(
                new Date(donationInfo.data.requestedAt)
              ).fromNow()})`}
            />
          )}
          {!!donationInfo.data.approvedAt && (
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
          {!donationInfo.data.approvedAt && !donationInfo.data.requestedAt && (
            <InfoItem
              icon="calendar"
              label="Created"
              description={`${moment(
                new Date(donationInfo.data.createdAt)
              ).format("LLL")} (${moment(
                new Date(donationInfo.data.createdAt)
              ).fromNow()})`}
            />
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
          <InfoItem
            icon="crosshairs-question"
            label="Status"
            description={upperSnakeCaseToSentenceCase(donationInfo.data.status)}
          />
          {donationInfo.data.status === "REQUESTED" && (
            <Button
              mode="contained"
              icon="check"
              loading={donationInfo.approving}
              disabled={donationInfo.approving}
              onPress={donationInfo.approve}
            >
              Approve
            </Button>
          )}
        </>
      ) : null}
    </ScrollView>
  );
};

export default DonationDetails;
