import React from "react";
import { Dimensions, View } from "react-native";
import {
  ActivityIndicator,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const StatItem = ({ icon, label, description }) => {
  const theme = useTheme();

  return (
    <View
      style={{
        width: (Dimensions.get("screen").width - (24 + 16 + 1) * 2) / 2,
        flexDirection: "row",
        gap: 12,
        alignItems: "flex-end",
      }}
    >
      <MaterialCommunityIcons
        name={icon}
        size={24}
        color={theme.colors.primary}
      />
      <View style={{ flexDirection: "column", gap: 4, flex: 1 }}>
        <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>
          {label}
        </Text>
        <Text variant="bodyLarge" style={{ color: theme.colors.primary }}>
          {description}
        </Text>
      </View>
    </View>
  );
};

const WorkerStats = ({ data }) => {
  const theme = useTheme();

  return (
    <View>
      <Text
        variant="titleMedium"
        style={{ marginBottom: 8, color: theme.colors.secondary }}
      >
        Overview
      </Text>
      <Surface
        elevation={1}
        mode="flat"
        style={{
          borderRadius: 8,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: theme.colors.primaryContainer,
        }}
      >
        <TouchableRipple onPress={() => {}}>
          <View
            style={{
              flexDirection: "row",
              gap: 16,
              flex: 1,
              flexWrap: "wrap",
              padding: 16,
            }}
          >
            <StatItem
              icon="plus-circle-multiple"
              label="Amount collected"
              description={`${Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(data.totalCashFlow)}  PKR`}
            />
            <StatItem
              icon="counter"
              label="Collections"
              description={data.collectionCount}
            />
            <StatItem
              icon="progress-clock"
              label="In Progress"
              description={data.inProgress}
            />
          </View>
        </TouchableRipple>
      </Surface>
    </View>
  );
};

export default WorkerStats;
