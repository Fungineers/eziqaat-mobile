import { View } from "react-native";
import { Text, TouchableRipple, useTheme } from "react-native-paper";

const Item = () => {
  const theme = useTheme();
  return (
    <TouchableRipple onPress={() => {}}>
      <View style={{ padding: 10, flexDirection: "row", gap: 10 }}>
        <View
          style={{
            marginTop: 6,
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: theme.colors.primary,
          }}
        />
        <Text variant="bodySmall">
          Your request with ID: 10077454688775645345 has been approved
        </Text>
      </View>
    </TouchableRipple>
  );
};

export default Item;
