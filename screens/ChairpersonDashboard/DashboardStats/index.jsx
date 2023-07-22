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
import useAreaStats from "../../../hooks/useAreaStats";
import Loading from "../../../components/Loading";
import useAreaDailyStats from "../../../hooks/useAreaDailyStats";

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
  const areaStats = useAreaStats();
  const areaDailyStats = useAreaDailyStats();

  return (
    <View style={{ flexDirection: "column" }}>
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
          {areaStats.loading ? (
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
          ) : !areaStats.error && areaStats.data ? (
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
                description={`${Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(areaStats.data.totalCashFlow)}  PKR`}
              />
              <StatItem
                icon="counter"
                label="Collections"
                description={areaStats.data.collectionCount}
              />
              <StatItem
                icon="clock-outline"
                label="In Progress"
                description={areaStats.data.requestCount}
              />
            </View>
          ) : (
            <></>
          )}
        </TouchableRipple>
      </Surface>
      <Text
        variant="titleMedium"
        style={{ marginVertical: 8, color: theme.colors.secondary }}
      >
        Today's Statistics
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
          {areaDailyStats.loading ? (
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
          ) : !areaDailyStats.error && areaDailyStats.data ? (
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
                description={`${Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(areaDailyStats.data.totalCashFlow)}  PKR`}
              />
              <StatItem
                icon="counter"
                label="Collections"
                description={areaDailyStats.data.collectionCount}
              />
              <StatItem
                icon="clock-outline"
                label="In Progress"
                description={areaDailyStats.data.requestCount}
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
