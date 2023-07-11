import { useState } from "react";
import { View } from "react-native";
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

const EditPhone = () => {
  const settings = useSettings();

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
          disabled={settings.phoneForm.values.phone === settings.currentPhone}
        >
          Save Changes
        </Button>
      </Dialog.Actions>
    </>
  );
};

const EditEmail = () => {
  const settings = useSettings();

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
          disabled={settings.emailForm.values.email === settings.currentEmail}
        >
          Save Changes
        </Button>
      </Dialog.Actions>
    </>
  );
};

const EditPassword = () => {
  const settings = useSettings();

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

const CustomDialog = ({ activeSetting, hideDialog }) => {
  const settings = useSettings();

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
          <EditPhone />
        ) : activeSetting === "email" ? (
          <EditEmail />
        ) : activeSetting === "password" ? (
          <EditPassword />
        ) : null}
      </Dialog>
    </Portal>
  );
};

const ProfileAndSettings = () => {
  const [activeSetting, setActiveSetting] = useState("");

  const auth = useAuth();

  const { firstName, lastName, role, email, phone, cnic } = auth.data.user;

  return (
    <View style={{ padding: 20, gap: 10 }}>
      <Text variant="titleMedium">General</Text>
      <ItemRow icon="account-circle-outline">
        <Item title="First Name" value={firstName} />
        <Item title="Last Name" value={lastName} />
      </ItemRow>
      <ItemRow icon="card-account-details-outline">
        <Item title="CNIC Number" value={cnic} />
      </ItemRow>
      <ItemRow icon="information-outline">
        <Item title="Role" value={role} />
      </ItemRow>
      <Text variant="titleMedium">Account</Text>
      <ItemRow
        icon="phone-outline"
        editHandler={() => setActiveSetting("phone")}
      >
        <Item title="Phone" value={phone} />
      </ItemRow>
      <ItemRow
        icon="email-outline"
        editHandler={() => setActiveSetting("email")}
      >
        <Item title="E-mail" value={email}>
          {/* <Button mode="contained" icon="check-decagram">
            Verify
          </Button> */}
        </Item>
      </ItemRow>
      <Text variant="titleMedium">Security</Text>
      <ItemRow
        icon="form-textbox-password"
        editHandler={() => setActiveSetting("password")}
      >
        <Item title="Password" value={"\u2022".repeat(8)} />
      </ItemRow>
      <CustomDialog
        activeSetting={activeSetting}
        hideDialog={() => setActiveSetting("")}
      />
    </View>
  );
};

export default ProfileAndSettings;
