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
import Loading from "../../../components/Loading";
import useWorkerStats from "../../../hooks/useWorkerStats";

const StatItem = ({ icon, label, description }) => {
  const theme = useTheme();

  const loading = false;

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
        {loading ? (
          <ActivityIndicator
            size={theme.fonts.bodyLarge.fontSize}
            style={{
              alignSelf: "flex-start",
              marginLeft: 20,
              height: theme.fonts.bodyLarge.lineHeight,
            }}
          />
        ) : (
          <Text variant="bodyLarge" style={{ color: theme.colors.primary }}>
            {description}
          </Text>
        )}
      </View>
    </View>
  );
};

const DashboardStats = () => {
  const theme = useTheme();
  const worker = useWorkerStats();

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
          {worker.loading ? (
            <View
              style={{
                flexDirection: "row",
                gap: 16,
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
              }}
            >
              <Loading />
            </View>
          ) : !worker.error && worker.data ? (
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
                  maximumFractionDigits: 3,
                }).format(worker.data.totalCashFlow)}  PKR`}
              />
              <StatItem
                icon="counter"
                label="Collections"
                description={worker.data.collectionCount}
              />
              <StatItem
                icon="clock-outline"
                label="Pending"
                description={worker.data.pending}
              />
              <StatItem
                icon="progress-clock"
                label="In Progress"
                description={worker.data.inProgress}
              />
            </View>
          ) : (
            <></>
          )}
        </TouchableRipple>
      </Surface>
    </View>
  );
};

export default DashboardStats;
