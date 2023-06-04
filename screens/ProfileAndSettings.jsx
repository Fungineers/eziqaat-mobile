import { useState } from "react";
import { View } from "react-native";
import {
  Button,
  Dialog,
  FAB,
  IconButton,
  Portal,
  Text,
  TextInput,
  TouchableRipple,
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ItemRow = ({ children, icon, editHandler }) => (
  <TouchableRipple onPress={() => {}}>
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 10,
      }}
    >
      <MaterialCommunityIcons
        name={icon}
        size={24}
        style={{ paddingRight: 20 }}
      />
      {children}
      {!!editHandler && (
        <IconButton icon="pencil" size={20} onPress={editHandler} />
      )}
    </View>
  </TouchableRipple>
);

const Item = ({ title, value }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text variant="bodySmall" style={{ color: "#888" }}>
        {title}
      </Text>
      <Text variant="bodyMedium">{value}</Text>
    </View>
  );
};

const Info = ({ text }) => {
  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
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

const EditPhone = ({ hideDialog }) => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      hideDialog();
    }, 2000);
  };

  return (
    <>
      <Dialog.Title>Change Phone Number</Dialog.Title>
      <Dialog.Content>
        <Info
          text="Phone must be unique. You'll be immediately logged out of current
          session and your password will be automatically reset as you proceed."
        />
        <TextInput
          label="Phone"
          placeholder="e.g. +923001234567"
          keyboardType="phone-pad"
          mode="outlined"
          style={{ width: "100%", marginVertical: 10 }}
          left={<TextInput.Icon icon="phone" />}
          value={phone}
          onChangeText={setPhone}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button
          mode="contained"
          style={{ width: "100%" }}
          loading={loading}
          icon="check"
          onPress={handleSubmit}
        >
          Save Changes
        </Button>
      </Dialog.Actions>
    </>
  );
};

const EditEmail = ({ hideDialog }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      hideDialog();
    }, 2000);
  };

  return (
    <>
      <Dialog.Title>Change E-mail</Dialog.Title>
      <Dialog.Content>
        <Info
          text="E-mail must be unique. You'll have to first confirm your email address
          before your email alert will be activated."
        />
        <TextInput
          label="Email (optional)"
          placeholder="e.g. johndoe123@xyz.com"
          keyboardType="email-address"
          mode="outlined"
          style={{ width: "100%", marginVertical: 10 }}
          left={<TextInput.Icon icon="email" />}
          value={email}
          onChangeText={setEmail}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button
          mode="contained"
          style={{ width: "100%" }}
          loading={loading}
          icon="check"
          onPress={handleSubmit}
        >
          Save Changes
        </Button>
      </Dialog.Actions>
    </>
  );
};

const EditPassword = ({ hideDialog }) => {
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      hideDialog();
    }, 2000);
  };

  return (
    <>
      <Dialog.Title>Change Password</Dialog.Title>
      <Dialog.Content>
        <Info
          text="You'll be logged of session on changing your password, and have to
          login again through new password."
        />
        <TextInput
          label="Current Password"
          secureTextEntry={!passwordShown}
          mode="outlined"
          style={{ width: "100%", marginVertical: 10 }}
          left={<TextInput.Icon icon="form-textbox-password" />}
          right={
            <TextInput.Icon
              onPress={() => {
                setPasswordShown(!passwordShown);
              }}
              icon={passwordShown ? "eye-off" : "eye"}
            />
          }
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          label="New Password"
          secureTextEntry={!newPasswordShown}
          mode="outlined"
          style={{ width: "100%", marginVertical: 10 }}
          left={<TextInput.Icon icon="form-textbox-password" />}
          right={
            <TextInput.Icon
              onPress={() => {
                setNewPasswordShown(!newPasswordShown);
              }}
              icon={newPasswordShown ? "eye-off" : "eye"}
            />
          }
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button
          mode="contained"
          style={{ width: "100%" }}
          loading={loading}
          icon="check"
          onPress={handleSubmit}
        >
          Save Changes
        </Button>
      </Dialog.Actions>
    </>
  );
};

const CustomDialog = ({ activeSetting, hideDialog }) => {
  return (
    <Portal>
      <Dialog visible={!!activeSetting} onDismiss={hideDialog}>
        {activeSetting === "phone" ? (
          <EditPhone hideDialog={hideDialog} />
        ) : activeSetting === "email" ? (
          <EditEmail hideDialog={hideDialog} />
        ) : activeSetting === "password" ? (
          <EditPassword hideDialog={hideDialog} />
        ) : null}
      </Dialog>
    </Portal>
  );
};

const ProfileAndSettings = ({ navigation }) => {
  const [activeSetting, setActiveSetting] = useState("");
  return (
    <View style={{ padding: 20, gap: 10 }}>
      <Text variant="titleMedium">General</Text>
      <ItemRow icon="account-circle-outline">
        <Item title="First Name" value="Daniyal" />
        <Item title="Last Name" value="Aamir" />
      </ItemRow>
      <ItemRow icon="card-account-details-outline">
        <Item title="CNIC Number" value="42101-8387652-7" />
      </ItemRow>
      <ItemRow icon="information-outline">
        <Item title="Role" value="Chairperson" />
      </ItemRow>
      <Text variant="titleMedium">Account</Text>
      <ItemRow
        icon="phone-outline"
        editHandler={() => setActiveSetting("phone")}
      >
        <Item title="Phone" value="+92 304 2868395" />
      </ItemRow>
      <ItemRow
        icon="email-outline"
        editHandler={() => setActiveSetting("email")}
      >
        <Item title="E-mail" value="daniyal.amir110@gmail.com" />
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
