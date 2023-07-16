import React from "react";
import { Surface, Text, TouchableRipple, useTheme } from "react-native-paper";
import { Image, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/core";

const ExploreItem = ({ imgSrc, title, description, path }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <Surface style={{ borderRadius: 8, overflow: "hidden" }}>
      <TouchableRipple
        onPress={() => {
          navigation.navigate(path);
        }}
        style={{ padding: 16 }}
      >
        <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
          <Image source={imgSrc} style={{ width: 48, height: 48 }} />
          <View style={{ flex: 1, flexDirection: "column", gap: 8 }}>
            <Text variant="labelLarge" style={{ color: theme.colors.primary }}>
              {title}
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>
              {description}
            </Text>
          </View>
          <MaterialCommunityIcons
            name="arrow-right-thin"
            size={30}
            color={theme.colors.primary}
          />
        </View>
      </TouchableRipple>
    </Surface>
  );
};

const DashboardExplore = () => {
  const theme = useTheme();
  return (
    <View>
      <Text
        variant="titleMedium"
        style={{ marginBottom: 8, color: theme.colors.secondary }}
      >
        Manage & Explore
      </Text>
      <View style={{ flexDirection: "column", gap: 16 }}>
        <ExploreItem
          imgSrc={require("../../../assets/teamwork.png")}
          title="Manage workers"
          description="View and contact your workers, manage their activity, and create new"
        />
        <ExploreItem
          imgSrc={require("../../../assets/collection.png")}
          title="Donations"
          description="View donations with status, add pending donations"
        />
        <ExploreItem
          imgSrc={require("../../../assets/bar-chart.png")}
          title="Visualizations & Statistics"
          description="View graphical and statistical outlook of the progress in your area"
        />
        <ExploreItem
          imgSrc={require("../../../assets/settings.png")}
          title="Account & Settings"
          description="View and update account settings"
        />
      </View>
    </View>
  );
};

export default DashboardExplore;
