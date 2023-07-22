import { View } from "react-native";
import {
  Divider,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import usePopup from "../../hooks/usePopup";
import BottomPopup from "../../components/BottomPopup";
import RequestDetails from "./RequestDetails";
import InfoItem from "./InfoItem";
import upperSnakeCaseToSentenceCase from "../../utils/upperSnakeCaseToSentenceCase";

const RequestItem = ({ data }) => {
  const popup = usePopup();
  const theme = useTheme();
  return (
    <>
      <Surface
        style={{
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <TouchableRipple onPress={popup.show} style={{ padding: 16 }}>
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
              <Text
                variant="titleSmall"
                style={{ color: theme.colors.primary }}
              >
                {data.id}
              </Text>
            </View>
            <Divider />
            <View style={{ flexDirection: "column", gap: 4 }}>
              <InfoItem
                icon="select-place"
                label="Area"
                description={data.areaName}
              />
              <InfoItem
                icon="map-marker"
                label="Address"
                description={data.address}
              />
              <InfoItem
                icon="cash-multiple"
                label="Amount"
                description={`${Intl.NumberFormat("en-US").format(
                  data.amount
                )}  PKR`}
              />
              <InfoItem
                icon="crosshairs-question"
                label="Status"
                description={upperSnakeCaseToSentenceCase(data.status)}
              />
            </View>
          </View>
        </TouchableRipple>
      </Surface>
      <BottomPopup
        {...popup}
        title="Request Details"
        icon="crosshairs-question"
      >
        {popup.shown && <RequestDetails data={data} />}
      </BottomPopup>
    </>
  );
};

export default RequestItem;
