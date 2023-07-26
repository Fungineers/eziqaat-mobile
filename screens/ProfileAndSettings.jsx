import { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Button,
  Dialog,
  IconButton,
  Portal,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import StringInput from "../components/StringInput";
import { useAuth } from "../context/auth.context";
import useSettings from "../hooks/useSettings";
import upperSnakeCaseToSentenceCase from "../utils/upperSnakeCaseToSentenceCase";
import Note from "../components/Note";
import usePopup from "../hooks/usePopup";
import BottomPopup from "../components/BottomPopup";
import VerifyOtp from "./VerifyOtp";

const ItemRow = ({ children, icon, editHandler }) => {
  const theme = useTheme();
  return (
    <TouchableRipple onPress={() => {}}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          padding: 10,
        }}
      >
        <MaterialCommunityIcons
          name={icon}
          size={24}
          style={{ paddingRight: 20 }}
          color={theme.colors.primary}
        />
        {children}
        {!!editHandler && (
          <IconButton
            icon="pencil"
            iconColor={theme.colors.secondary}
            size={20}
            onPress={editHandler}
          />
        )}
      </View>
    </TouchableRipple>
  );
};

const Item = ({ title, value, children }) => {
  const theme = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>
        {title}
      </Text>
      <Text variant="bodyMedium">{value}</Text>
      {children}
    </View>
  );
};

const Info = ({ text }) => {
  return (
    <View
      style={{ display: "flex", flexDirection: "row", paddingVertical: 10 }}
    >
      <MaterialCommunityIcons
        name="information-outline"
        size={20}
        style={{ paddingRight: 10 }}
      />
      <Text variant="bodySmall" style={{ flex: 1 }}>
        {text}
      </Text>
    </View>
  );
};

const EditPhone = ({ settings }) => {
  return (
    <>
      <Dialog.Title>Change Phone Number</Dialog.Title>
      <Dialog.Content>
        <Info
          text="Phone must be unique. You'll be immediately logged out of current
          session and your password will be automatically reset as you proceed."
        />
        <StringInput
          label="Phone"
          placeholder="e.g. +923001234567"
          keyboardType="phone-pad"
          mode="outlined"
          icon="phone"
          value={settings.phoneForm.values.phone}
          error={settings.phoneForm.errors.phone}
          onChangeText={settings.phoneForm.handleChange("phone")}
        />
      </Dialog.Content>
      <Dialog.Actions style={{ width: "100%" }}>
        <Button
          mode="contained"
          style={{ width: "100%" }}
          loading={settings.loading}
          icon="check"
          onPress={settings.phoneForm.handleSubmit}
          disabled={
            settings.phoneForm.values.phone === settings.currentPhone ||
            settings.loading
          }
        >
          Save Changes
        </Button>
      </Dialog.Actions>
    </>
  );
};

const EditEmail = ({ settings }) => {
  return (
    <>
      <Dialog.Title>Change E-mail</Dialog.Title>
      <Dialog.Content>
        <Info
          text="E-mail must be unique. You'll have to first confirm your email address
          before your email alert will be activated."
        />
        <StringInput
          label="Email (optional)"
          placeholder="e.g. johndoe123@xyz.com"
          keyboardType="email-address"
          mode="outlined"
          icon="email"
          value={settings.emailForm.values.email}
          error={settings.emailForm.errors.email}
          onChangeText={settings.emailForm.handleChange("email")}
        />
      </Dialog.Content>
      <Dialog.Actions style={{ width: "100%" }}>
        <Button
          mode="contained"
          style={{ width: "100%" }}
          loading={settings.loading}
          icon="check"
          onPress={settings.emailForm.handleSubmit}
          disabled={
            settings.emailForm.values.email === settings.currentEmail ||
            settings.loading
          }
        >
          Save Changes
        </Button>
      </Dialog.Actions>
    </>
  );
};

const EditPassword = ({ settings }) => {
  return (
    <>
      <Dialog.Title>Change Password</Dialog.Title>
      <Dialog.Content>
        <Info
          text="You'll be logged of session on changing your password, and have to
          login again through new password."
        />
        <StringInput
          label="Current Password"
          secureTextEntry={true}
          mode="outlined"
          icon="form-textbox-password"
          value={settings.passwordForm.values.currentPassword}
          error={settings.passwordForm.errors.currentPassword}
          onChangeText={settings.passwordForm.handleChange("currentPassword")}
        />
        <StringInput
          label="New Password"
          secureTextEntry={true}
          mode="outlined"
          icon="form-textbox-password"
          value={settings.passwordForm.values.newPassword}
          error={settings.passwordForm.errors.newPassword}
          onChangeText={settings.passwordForm.handleChange("newPassword")}
        />
      </Dialog.Content>
      <Dialog.Actions style={{ width: "100%" }}>
        <Button
          mode="contained"
          style={{ width: "100%" }}
          loading={settings.loading}
          icon="check"
          onPress={settings.passwordForm.handleSubmit}
        >
          Save Changes
        </Button>
      </Dialog.Actions>
    </>
  );
};

const CustomDialog = ({ settings, activeSetting, hideDialog }) => {
  return (
    <Portal>
      <Dialog
        visible={!!activeSetting}
        onDismiss={() => {
          if (!settings.loading) {
            hideDialog();
          }
        }}
      >
        {activeSetting === "phone" ? (
          <EditPhone settings={settings} />
        ) : activeSetting === "email" ? (
          <EditEmail settings={settings} />
        ) : activeSetting === "password" ? (
          <EditPassword settings={settings} />
        ) : null}
      </Dialog>
    </Portal>
  );
};

const ProfileAndSettings = () => {
  const [activeSetting, setActiveSetting] = useState("");

  const auth = useAuth();

  const { firstName, lastName, role, email, phone, cnic, emailVerified } =
    auth.data.user;

  const settings = useSettings();

  const popup = usePopup();

  return (
    <ScrollView>
      <View style={{ padding: 20, gap: 10, paddingBottom: 100 }}>
        <Text variant="titleMedium">General</Text>
        <ItemRow icon="account-circle-outline">
          <Item title="First Name" value={firstName} />
          <Item title="Last Name" value={lastName} />
        </ItemRow>
        <ItemRow icon="card-account-details-outline">
          <Item
            title="CNIC Number"
            value={`${cnic.slice(0, 5)}-${cnic.slice(5, 12)}-${cnic.slice(12)}`}
          />
        </ItemRow>
        <ItemRow icon="information-outline">
          <Item title="Role" value={upperSnakeCaseToSentenceCase(role)} />
        </ItemRow>
        <Text variant="titleMedium">Account</Text>
        <ItemRow
          icon="phone-outline"
          editHandler={() => setActiveSetting("phone")}
        >
          <Item
            title="Phone"
            value={`${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(
              6,
              9
            )} ${phone.slice(9, 13)}`}
          />
        </ItemRow>
        <ItemRow
          icon="email-outline"
          editHandler={() => setActiveSetting("email")}
        >
          <Item title="E-mail" value={email}></Item>
        </ItemRow>
        {!emailVerified && (
          <>
            <Note text="Your email address is not verified. Please verify it so that your email alert can be turned on." />
            <Button
              icon="check-circle-outline"
              mode="contained"
              onPress={popup.show}
            >
              Verify Your Email
            </Button>
            <BottomPopup title="Verify Email" icon="email-check" {...popup}>
              <VerifyOtp settings={settings} />
            </BottomPopup>
          </>
        )}
        <Text variant="titleMedium">Security</Text>
        <ItemRow
          icon="form-textbox-password"
          editHandler={() => setActiveSetting("password")}
        >
          <Item title="Password" value={"\u2022".repeat(8)} />
        </ItemRow>
        <CustomDialog
          activeSetting={activeSetting}
          settings={settings}
          hideDialog={() => setActiveSetting("")}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileAndSettings;
