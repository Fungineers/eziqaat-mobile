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
import { useNavigation } from "@react-navigation/core";

const Item = ({ request }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <Surface
      style={{
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <TouchableRipple
        onPress={() => {
          navigation.navigate("chairperson-donation-details", {
            donationId: request.id,
          });
        }}
        style={{ padding: 16 }}
      >
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
              icon="phone-outline"
              label="Phone"
              description={request.phone}
            />
            <InfoItem
              icon="card-outline"
              label="CNIC"
              description={request.cnic}
            />
            <InfoItem
              icon="map-marker-outline"
              label="Address"
              description={request.address}
            />
            <InfoItem
              icon="cash-multiple"
              label="Amount"
              description={`PKR ${Intl.NumberFormat("en-US").format(
                request.amount
              )}`}
            />
            <InfoItem
              icon="clock-outline"
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
