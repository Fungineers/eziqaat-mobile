import { useEffect } from "react";
import { View } from "react-native";
import { Appbar, Button, Divider, useTheme } from "react-native-paper";
import Note from "../components/Note";
import StringInput from "../components/StringInput";
import useResetPassword from "../hooks/useResetPassword";

const ResetPassword = ({ navigation }) => {
  const resetPassword = useResetPassword();
  const theme = useTheme();

  useEffect(() => {
    if (resetPassword.success) {
      navigation.navigate("login");
    }
  }, [resetPassword.success]);

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Appbar.Header mode="small">
          <Appbar.BackAction
            onPress={navigation.goBack}
            color={theme.colors.primary}
          />
          <Appbar.Content title="Reset Password" color={theme.colors.primary} />
        </Appbar.Header>
        <View style={{ padding: 20, gap: 10 }}>
          <Note
            text={
              "Please Note:\n\n• You enter your account credential to reset your password. \n\n• You'll recieve an SMS to your phone number, with a new auto-generated password."
            }
          />
          <StringInput
            label="Credential"
            placeholder="E-mail/Phone/CNIC"
            mode="outlined"
            icon="account"
            value={resetPassword.form.values.credential}
            error={resetPassword.form.errors.credential}
            onChangeText={resetPassword.form.handleChange("credential")}
          />
          <Button
            mode="contained"
            style={{ width: "100%" }}
            loading={resetPassword.loading}
            disabled={resetPassword.loading}
            icon="lock-reset"
            onPress={resetPassword.form.handleSubmit}
          >
            Reset Password
          </Button>
        </View>
      </View>
    </>
  );
};

export default ResetPassword;
