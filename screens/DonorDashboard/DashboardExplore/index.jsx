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
          path="donation-request"
          imgSrc={require("../../../assets/request.png")}
          title="Request Donation"
          description="If you want our worker visit at your doorstep and collect donation from you, please submit a request here"
        />
        <ExploreItem
          path="requests"
          imgSrc={require("../../../assets/track.png")}
          title="Track Your Requests"
          description="Get the real-time status of your unfulfilled requests, and cancel anytime"
        />
        <ExploreItem
          path="donation-history"
          imgSrc={require("../../../assets/history.png")}
          title="View Donation History"
          description="View details of all your past donations"
        />
        <ExploreItem
          path="profile-and-settings"
          imgSrc={require("../../../assets/settings.png")}
          title="Account & Settings"
          description="View and update account settings"
        />
      </View>
    </View>
  );
};

export default DashboardExplore;
