import React from "react";
import { View } from "react-native";
import { Avatar, Surface, Text, useTheme } from "react-native-paper";
import { useAuth } from "../../../context/auth.context";

const WelcomeSection = () => {
  const theme = useTheme();
  const auth = useAuth();

  return (
    <Surface
      mode="flat"
      style={{ padding: 16, borderRadius: 8, backgroundColor: "#0000" }}
    >
      <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
        <Avatar.Text
          size={64}
          label={auth.data.user?.firstName?.charAt(0)}
          color={theme.colors.primary}
          style={{ backgroundColor: theme.colors.primaryContainer }}
        />
        <View style={{ flexDirection: "column", gap: 4 }}>
          <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>
            Welcome 👋
          </Text>
          <Text variant="headlineSmall" style={{ color: theme.colors.primary }}>
            {auth.data.user?.firstName} {auth.data.user?.lastName}
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>
            Worker - {auth.data.user?.area?.areaName || "(Unassigned)"}
          </Text>
        </View>
      </View>
    </Surface>
  );
};

export default WelcomeSection;
