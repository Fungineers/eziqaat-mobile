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

const DonationCard = ({ donationId, path, data }) => {
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
          navigation.navigate(path, {
            donationId,
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
              {donationId}
            </Text>
          </View>
          <Divider />
          <View style={{ flexDirection: "column", gap: 4 }}>
            {data.map((item, idx) => (
              <InfoItem
                key={idx}
                icon={item.icon}
                label={item.label}
                description={item.description}
              />
            ))}
          </View>
        </View>
      </TouchableRipple>
    </Surface>
  );
};

export default DonationCard;
