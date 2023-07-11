import { Text, useTheme } from "react-native-paper";
import { View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const InfoItem = ({ description, icon }) => {
  const theme = useTheme();

  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <MaterialCommunityIcons
        name={icon}
        size={16}
        color={theme.colors.primary}
      />
      <Text
        variant="bodySmall"
        style={{ color: theme.colors.secondary, overflow: "hidden" }}
      >
        {description}
      </Text>
    </View>
  );
};

export default InfoItem;
