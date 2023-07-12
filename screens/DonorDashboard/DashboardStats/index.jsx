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
import useDonorStats from "../../../hooks/useDonorStats";
import Loading from "../../../components/Loading";

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
  const donorStats = useDonorStats();

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
          {donorStats.loading ? (
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
          ) : !donorStats.error && donorStats.data ? (
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
                label="Amount Raised"
                description={`${donorStats.data.totalCashFlow} PKR`}
              />
              <StatItem
                icon="counter"
                label="Collections"
                description={donorStats.data.collectionCount}
              />
              <StatItem
                icon="clock-outline"
                label="Requests"
                description={donorStats.data.requestCount}
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
