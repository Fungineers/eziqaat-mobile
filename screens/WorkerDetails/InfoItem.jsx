import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const InfoItem = ({ label, description, icon }) => {
  const theme = useTheme();

  return (
    <View style={{ flexDirection: "row", gap: 16 }}>
      <MaterialCommunityIcons
        name={icon}
        size={20}
        color={theme.colors.primary}
      />
      <Text
        variant="bodyMedium"
        style={{
          color: theme.colors.secondary,
          overflow: "hidden",
          width: 80,
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

export default InfoItem;
