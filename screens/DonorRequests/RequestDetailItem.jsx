import { Text, useTheme } from "react-native-paper";
import { View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const RequestDetailItem = ({ label, description, icon }) => {
  const theme = useTheme();

  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <MaterialCommunityIcons
        name={icon}
        size={theme.fonts.bodyMedium.lineHeight}
        color={theme.colors.primary}
      />
      <Text
        variant="bodyMedium"
        style={{
          color: theme.colors.primary,
          overflow: "hidden",
          width: 100,
        }}
      >
        {label}
      </Text>
      <Text
        variant="bodyMedium"
        style={{ color: theme.colors.secondary, overflow: "hidden", flex: 1 }}
      >
        {description}
      </Text>
    </View>
  );
};

export default RequestDetailItem;
