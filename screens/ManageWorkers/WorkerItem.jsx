import {
  Avatar,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import usePopup from "../../hooks/usePopup";
import { View } from "react-native";
import InfoItem from "./InfoItem";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BottomPopup from "../../components/BottomPopup";
import WorkerDetails from "./WorkerDetails";

const WorkerItem = ({ worker }) => {
  const theme = useTheme();
  const popup = usePopup();
  return (
    <>
      <Surface
        style={{
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <TouchableRipple onPress={popup.show} style={{ padding: 16 }}>
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
              <Text
                variant="labelLarge"
                style={{ color: theme.colors.primary }}
              >
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
      <BottomPopup {...popup} title="Worker Details" icon="account">
        {popup.shown && <WorkerDetails worker={worker} />}
      </BottomPopup>
    </>
  );
};

export default WorkerItem;
