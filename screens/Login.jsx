import { useState } from "react";
import { View } from "react-native";
import { Appbar, Button, Text, TextInput } from "react-native-paper";
import { useAuth } from "../context/auth.context";

const Login = ({ navigation }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();

  const loading = auth.data.signingIn;

  const handleSubmit = () => {
    auth.signin({ credential, password });
    // navigation.navigate("main");
  };

  return (
    <View style={{ flex: 1, gap: 10, justifyContent: "center" }}>
      <Appbar.Header mode="center-aligned">
        {/* <Appbar.BackAction onPress={() => {}} /> */}
        <Appbar.Content title="Log in" />
      </Appbar.Header>
      <View style={{ padding: 20, gap: 10 }}>
        <TextInput
          label="Credential"
          placeholder="E-mail/Phone/CNIC"
          mode="flat"
          style={{ width: "100%" }}
          left={<TextInput.Icon icon="account" />}
          value={credential}
          onChangeText={setCredential}
        />
        <TextInput
          label="Password"
          secureTextEntry={!passwordShown}
          placeholder="Password"
          mode="flat"
          style={{ width: "100%" }}
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
        <Button
          mode="contained"
          style={{ width: "100%" }}
          loading={loading}
          icon="login"
          onPress={handleSubmit}
        >
          Log in
        </Button>
        <Button
          mode="text"
          style={{ width: "100%" }}
          icon="lock-question"
          onPress={() => {
            navigation.navigate("reset-password");
          }}
        >
          Forgot Password?
        </Button>
        <View style={{ borderBottomWidth: 1, borderColor: "#c4c4c4" }} />
        <Text variant="bodyMedium" style={{ textAlign: "center" }}>
          Haven't made an account yet?
        </Text>
        <Button
          mode="contained-tonal"
          style={{ width: "100%" }}
          icon="account-plus"
          onPress={() => {
            navigation.navigate("signup");
          }}
        >
          Sign up now
        </Button>
      </View>
    </View>
  );
};

export default Login;
