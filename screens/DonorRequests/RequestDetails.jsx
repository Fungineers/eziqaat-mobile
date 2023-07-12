import { View } from "react-native";
import RequestDetailItem from "./RequestDetailItem";
import moment from "moment/moment";
import { Button, useTheme } from "react-native-paper";

const RequestDetails = ({ data }) => {
  const theme = useTheme();

  const formatDate = (date) => {
    const m = moment(new Date(date));
    return `${m.format("LLL")} (${m.fromNow()})`;
  };

  return (
    <View style={{ flexDirection: "column", gap: 8 }}>
      {data.requestedAt && (
        <RequestDetailItem
          icon="calendar"
          label="Requested at"
          description={formatDate(data.requestedAt)}
        />
      )}
      <RequestDetailItem
        icon="select-place"
        label="Area"
        description={data.areaName}
      />
      <RequestDetailItem
        icon="map-marker"
        label="Address"
        description={data.address}
      />
      <RequestDetailItem
        icon="cash-multiple"
        label="Amount"
        description={data.amount}
      />
      <RequestDetailItem
        icon="crosshairs-question"
        label="Status"
        description={data.status}
      />
      {data.approvedAt && (
        <RequestDetailItem
          icon="calendar"
          label="Approved at"
          description={formatDate(data.approvedAt)}
        />
      )}
      {data.status === "ACCEPTED" && (
        <>
          <RequestDetailItem
            icon="calendar"
            label="Accepted at"
            description={formatDate(data.acceptedAt)}
          />
        </>
      )}
      <Button icon="cancel" mode="contained">
        Cancel
      </Button>
    </View>
  );
};

export default RequestDetails;
