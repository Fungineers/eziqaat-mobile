import moment from "moment";
import { View } from "react-native";
import {
  Divider,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import InfoItem from "./InfoItem";

const Item = ({ request }) => {
  const theme = useTheme();

  return (
    <Surface
      style={{
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <TouchableRipple onPress={() => {}} style={{ padding: 16 }}>
        <View style={{ flexDirection: "column", gap: 16 }}>
          <View
            style={{
              flexDirection: "row",
              gap: 16,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              variant="titleSmall"
              style={{ color: theme.colors.secondary }}
            >
              TID
            </Text>
            <Text variant="titleSmall" style={{ color: theme.colors.primary }}>
              {request.id}
            </Text>
          </View>
          <Divider />
          <View style={{ flexDirection: "column", gap: 4 }}>
            <InfoItem
              icon="account-outline"
              label="Name"
              description={`${request.firstName} ${request.lastName}`}
            />
            <InfoItem
              icon="map-marker-outline"
              label="Address"
              description={request.address}
            />
            <InfoItem
              icon="cash-multiple"
              label="Amount"
              description={request.amount}
            />
            <InfoItem
              icon="clock"
              label="Requested at"
              description={`${moment(new Date(request.requestedAt)).format(
                "LLL"
              )} (${moment(new Date(request.requestedAt)).fromNow()})`}
            />
          </View>
        </View>
      </TouchableRipple>
    </Surface>
  );
};

export default Item;
