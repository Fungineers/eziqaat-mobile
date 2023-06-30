import React from "react";
import { Surface, Text, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Note = ({ text }) => {
  const theme = useTheme();
  return (
    <Surface style={{ padding: 15, flexDirection: "row", gap: 10 }} mode="flat">
      <MaterialCommunityIcons
        name="information-outline"
        size={20}
        color={theme.colors.primary}
      />
      <Text
        variant="bodySmall"
        style={{
          textAlign: "left",
          flex: 1,
          color: theme.colors.secondary,
        }}
      >
        {text}
      </Text>
    </Surface>
  );
};

export default Note;
