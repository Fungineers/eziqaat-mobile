import { View } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";
import StringInput from "../components/StringInput";
import useResetPassword from "../hooks/useResetPassword";
import { useEffect } from "react";

const ResetPassword = ({ navigation }) => {
  const resetPassword = useResetPassword();

  useEffect(() => {
    if (resetPassword.success) {
      navigation.navigate("login");
    }
  }, [resetPassword.success]);

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Appbar.Header mode="center-aligned">
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content title="Reset Password" />
        </Appbar.Header>
        <View style={{ padding: 20, gap: 10 }}>
          <Text
            variant="bodyMedium"
            style={{ textAlign: "left", marginBottom: 20 }}
          >
            Enter your account credential to reset your password. As you are
            done with it, you will receive the newly generated password through
            an SMS to the same phone number your account is registered with.
          </Text>
          <StringInput
            label="Credential"
            placeholder="E-mail/Phone/CNIC"
            mode="flat"
            icon="account"
            value={resetPassword.form.values.credential}
            error={resetPassword.form.errors.credential}
            onChangeText={resetPassword.form.handleChange("credential")}
          />
          <Button
            mode="contained"
            style={{ width: "100%" }}
            loading={resetPassword.loading}
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
