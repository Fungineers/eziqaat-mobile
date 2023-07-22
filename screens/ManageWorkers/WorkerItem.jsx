import { View } from "react-native";
import {
  Avatar,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import InfoItem from "./InfoItem";
import { useNavigation } from "@react-navigation/core";

const WorkerItem = ({ worker }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate("chairperson-worker-details", { workerId: worker.id });
  };

  return (
    <Surface
      style={{
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <TouchableRipple onPress={handleClick} style={{ padding: 16 }}>
        <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
          <Avatar.Text
            size={32}
            label={worker.firstName.charAt(0)}
            color={theme.colors.primary}
            style={{
              backgroundColor: theme.colors.primaryContainer,
              alignSelf: "flex-start",
            }}
          />
          <View style={{ flex: 1, flexDirection: "column", gap: 8 }}>
            <Text variant="labelLarge" style={{ color: theme.colors.primary }}>
              {worker.firstName} {worker.lastName}
            </Text>
            <View style={{ flexDirection: "column", gap: 4 }}>
              <InfoItem icon="phone" description={worker.phone} />
              <InfoItem icon="email" description={worker.email} />
              <InfoItem
                icon="card-account-details-outline"
                description={worker.cnic}
              />
            </View>
          </View>
          <MaterialCommunityIcons
            name="arrow-right-thin"
            size={30}
            color={theme.colors.primary}
          />
        </View>
      </TouchableRipple>
    </Surface>
  );
};

export default WorkerItem;
