import React from "react";
import { Dimensions, Linking, ScrollView, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  FAB,
  Searchbar,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BottomPopup from "../../components/BottomPopup";
import Loading from "../../components/Loading";
import StringInput from "../../components/StringInput";
import useCreateWorker from "../../hooks/useCreateWorker";
import usePopup from "../../hooks/usePopup";
import useWorkerDetails from "../../hooks/useWorkerDetails";
import useWorkers from "../../hooks/useWorkers";

const InfoItem = ({ description, icon }) => {
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

const WorkerItem = ({ worker }) => {
  const theme = useTheme();
  const popup = usePopup();
  return (
    <>
      <Surface
        style={{
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <TouchableRipple onPress={popup.show} style={{ padding: 16 }}>
          <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
            <Avatar.Text
              size={32}
              label={worker.firstName.charAt(0)}
              color={theme.colors.primary}
              style={{
                backgroundColor: theme.colors.primaryContainer,
                alignSelf: "flex-start",
              }}
            />
            <View style={{ flex: 1, flexDirection: "column", gap: 8 }}>
              <Text
                variant="labelLarge"
                style={{ color: theme.colors.primary }}
              >
                {worker.firstName} {worker.lastName}
              </Text>
              <View style={{ flexDirection: "column", gap: 4 }}>
                <InfoItem icon="phone" description={worker.phone} />
                <InfoItem icon="email" description={worker.email} />
                <InfoItem
                  icon="card-account-details-outline"
                  description={worker.cnic}
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
      <BottomPopup {...popup} title="Worker Details" icon="account">
        {popup.shown && <WorkerDetails worker={worker} />}
      </BottomPopup>
    </>
  );
};

const CreateWorker = ({ popup }) => {
  const createWorker = useCreateWorker({
    successCallback: popup.hide,
  });

  return (
    <>
      <StringInput
        label="First name"
        placeholder="e.g. John"
        icon="account-details"
        mode="outlined"
        error={createWorker.form.errors.firstName}
        value={createWorker.form.values.firstName}
        onChangeText={createWorker.form.handleChange("firstName")}
      />
      <StringInput
        label="Last name"
        placeholder="e.g. Doe"
        icon="account-details"
        mode="outlined"
        value={createWorker.form.values.lastName}
        error={createWorker.form.errors.lastName}
        onChangeText={createWorker.form.handleChange("lastName")}
      />
      <StringInput
        label="Email (optional)"
        placeholder="e.g. johndoe123@xyz.com"
        keyboardType="email-address"
        mode="outlined"
        icon="email"
        value={createWorker.form.values.email}
        error={createWorker.form.errors.email}
        onChangeText={createWorker.form.handleChange("email")}
      />
      <StringInput
        label="Phone"
        placeholder="e.g. +923001234567"
        keyboardType="phone-pad"
        mode="outlined"
        icon="phone"
        value={createWorker.form.values.phone}
        error={createWorker.form.errors.phone}
        onChangeText={createWorker.form.handleChange("phone")}
      />
      <StringInput
        label="CNIC"
        placeholder="e.g. 4210012345678"
        keyboardType="number-pad"
        mode="outlined"
        icon="card-account-details"
        value={createWorker.form.values.cnic}
        error={createWorker.form.errors.cnic}
        onChangeText={createWorker.form.handleChange("cnic")}
      />
      <Button
        mode="contained"
        style={{ width: "100%" }}
        loading={createWorker.loading}
        icon="account-plus"
        onPress={createWorker.form.handleSubmit}
      >
        Create Worker
      </Button>
    </>
  );
};

const WorkerDetailsItem = ({ label, description, icon, loading = false }) => {
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

const WorkerDetails = ({ worker }) => {
  const theme = useTheme();
  const workerDetails = useWorkerDetails({ id: worker.id });

  return (
    <>
      <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
        <Avatar.Text
          size={64}
          label={workerDetails.data?.firstName.charAt(0) || "..."}
          color={theme.colors.primary}
          style={{
            backgroundColor: theme.colors.primaryContainer,
            alignSelf: "flex-start",
          }}
        />
        <View style={{ flex: 1, flexDirection: "column", gap: 8 }}>
          <Text variant="labelLarge" style={{ color: theme.colors.primary }}>
            {workerDetails.data?.firstName} {workerDetails.data?.lastName}
          </Text>
          <View style={{ flexDirection: "column", gap: 4 }}>
            {workerDetails.loading ? (
              <ActivityIndicator
                style={{
                  alignSelf: "flex-start",
                  marginLeft: 20,
                  height: theme.fonts.bodyLarge.lineHeight,
                }}
              />
            ) : (
              <>
                <InfoItem
                  icon="phone"
                  description={workerDetails.data?.phone}
                />
                <InfoItem
                  icon="email"
                  description={workerDetails.data?.email}
                />
                <InfoItem
                  icon="card-account-details-outline"
                  description={workerDetails.data?.cnic}
                />
                <InfoItem
                  icon="calendar-blank"
                  description={new Date(
                    workerDetails.data?.assignedAt
                  ).toLocaleString()}
                />
              </>
            )}
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Button
          loading={workerDetails.loading}
          icon="phone"
          mode="contained-tonal"
          onPress={() => {
            Linking.openURL(`tel:${workerDetails.data?.phone}`);
          }}
          style={{ flex: 1 }}
        >
          Call
        </Button>
        <Button
          loading={workerDetails.loading}
          icon="email"
          mode="contained-tonal"
          onPress={() => {
            Linking.openURL(`mailto:${workerDetails.data?.email}`);
          }}
          style={{ flex: 1 }}
        >
          Email
        </Button>
      </View>

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
            <WorkerDetailsItem
              loading={workerDetails.loading}
              icon="plus-circle-multiple"
              label="Cash Flow"
              description={`${workerDetails.data?.donations.cashFlow} PKR`}
            />
            <WorkerDetailsItem
              loading={workerDetails.loading}
              icon="counter"
              label="Collections"
              description={`${workerDetails.data?.donations.collected}`}
            />
            <WorkerDetailsItem
              loading={workerDetails.loading}
              icon="clock-outline"
              label="To collect"
              description={`${workerDetails.data?.donations.accepted}`}
            />
            <WorkerDetailsItem
              loading={workerDetails.loading}
              icon="map-marker-outline"
              label="Area"
              description={`${workerDetails.data?.areaName}`}
            />
          </View>
        </TouchableRipple>
      </Surface>
      <Button
        mode="contained-tonal"
        buttonColor={theme.colors.errorContainer}
        textColor={theme.colors.error}
        style={{ width: "100%" }}
        icon="delete"
        onPress={() => {}}
      >
        Delete
      </Button>
    </>
  );
};

const ManageWorkers = ({ navigation }) => {
  const theme = useTheme();
  const popup = usePopup();
  const workers = useWorkers();

  return (
    <>
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
          {workers.loading ? (
            <Loading />
          ) : (
            workers.data.map((worker) => (
              <WorkerItem key={worker.id} worker={worker} />
            ))
          )}
        </ScrollView>
        <FAB
          icon="plus"
          style={{
            position: "absolute",
            right: 16,
            bottom: 16,
            borderRadius: 8,
          }}
          onPress={popup.show}
        />
      </View>
      <BottomPopup title="Create Worker" {...popup} icon="account-plus">
        {popup.shown && <CreateWorker popup={popup} />}
      </BottomPopup>
    </>
  );
};

export default ManageWorkers;
