import { useState } from "react";
import { View } from "react-native";
import { Appbar, Button, Text, TextInput } from "react-native-paper";

const ResetPassword = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [credential, setCredential] = useState("");

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("login");
    }, 2000);
  };

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Appbar.Header mode="center-aligned">
          <Appbar.BackAction
            onPress={() => {
              navigation.goBack();
            }}
          />
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
          <TextInput
            label="Credential"
            placeholder="E-mail/Phone/CNIC"
            mode="flat"
            style={{ width: "100%" }}
            left={<TextInput.Icon icon="account" />}
            value={credential}
            onChangeText={setCredential}
          />
          <Button
            mode="contained"
            style={{ width: "100%" }}
            loading={loading}
            icon="lock-reset"
            onPress={handleSubmit}
          >
            Reset Password
          </Button>
        </View>
      </View>
    </>
  );
};

export default ResetPassword;
