import React from "react";
import { View } from "react-native";
import { Avatar, Surface, Text, useTheme } from "react-native-paper";

const WelcomeSection = () => {
  const theme = useTheme();

  return (
    <Surface
      mode="flat"
      style={{ padding: 16, borderRadius: 8, backgroundColor: "#0000" }}
    >
      <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
        <Avatar.Text size={64} label="D" />
        <View style={{ flexDirection: "column", gap: 4 }}>
          <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>
            Welcome 👋
          </Text>
          <Text variant="headlineSmall" style={{ color: theme.colors.primary }}>
            Daniyal Aamir
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>
            Chaiperson - Hussainabad
          </Text>
        </View>
      </View>
    </Surface>
  );
};

export default WelcomeSection;
