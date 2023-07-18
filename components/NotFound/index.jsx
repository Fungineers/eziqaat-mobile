import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const NotFound = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: "column",
        padding: 15,
        alignItems: "center",
        gap: 15,
      }}
    >
      <MaterialCommunityIcons
        name="alert-circle-outline"
        size={64}
        color={theme.colors.primary}
      />
      <Text
        variant="headlineSmall"
        style={{ color: theme.colors.onPrimaryContainer }}
      >
        Nothing found
      </Text>
    </View>
  );
};

export default NotFound;
