import React from "react";
import { ScrollView, View } from "react-native";
import {
  Avatar,
  FAB,
  Searchbar,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const InfoItem = ({ label, description, icon }) => {
  const theme = useTheme();

  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <MaterialCommunityIcons
        name={icon}
        size={16}
        color={theme.colors.primary}
      />
      <Text
        variant="bodySmall"
        style={{ color: theme.colors.secondary, overflow: "hidden" }}
      >
        {description}
      </Text>
    </View>
  );
};

const WorkerItem = () => {
  const theme = useTheme();
  return (
    <Surface
      style={{
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <TouchableRipple onPress={() => {}} style={{ padding: 16 }}>
        <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
          <Avatar.Text
            size={32}
            label="H"
            style={{ alignSelf: "flex-start" }}
          />
          <View style={{ flex: 1, flexDirection: "column", gap: 8 }}>
            <Text variant="labelLarge" style={{ color: theme.colors.primary }}>
              Hannan Ashraf
            </Text>
            <View style={{ flexDirection: "column", gap: 4 }}>
              <InfoItem icon="phone" description="+923042868395" />
              <InfoItem icon="email" description="daniyal.amir110@gmail.com" />
              <InfoItem
                icon="card-account-details-outline"
                description="4210183876527"
              />
            </View>
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

const ManageWorkers = () => {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: "column", flex: 1, position: "relative" }}>
      <Searchbar
        placeholder="Search"
        // onChangeText={onChangeSearch}
        // value={searchQuery}
        iconColor={theme.colors.primary}
      />
      <ScrollView
        contentContainerStyle={{
          flexDirection: "column",
          gap: 16,
          padding: 16,
        }}
      >
        <WorkerItem />
        <WorkerItem />
        <WorkerItem />
        <WorkerItem />
        <WorkerItem />
        <WorkerItem />
        <WorkerItem />
        <WorkerItem />
        <WorkerItem />
        <WorkerItem />
        <WorkerItem />
        <WorkerItem />
        <WorkerItem />
        <WorkerItem />
        <WorkerItem />
        <WorkerItem />
        <WorkerItem />
        <WorkerItem />
        <WorkerItem />
        <WorkerItem />
        <WorkerItem />
      </ScrollView>
      <FAB
        icon="plus"
        style={{
          position: "absolute",
          right: 16,
          bottom: 16,
          borderRadius: 8,
        }}
        onPress={() => {}}
      />
    </View>
  );
};

export default ManageWorkers;
