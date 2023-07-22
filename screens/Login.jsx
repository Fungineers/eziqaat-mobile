import { View } from "react-native";
import { Appbar, Button, Divider, Text, useTheme } from "react-native-paper";
import StringInput from "../components/StringInput";
import Note from "../components/Note";
import useLogin from "../hooks/useLogin";

const Login = ({ navigation }) => {
  const login = useLogin();
  const theme = useTheme();

  return (
    <View style={{ flex: 1, gap: 10, justifyContent: "center" }}>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="Log in" color={theme.colors.primary} />
      </Appbar.Header>
      <View style={{ padding: 20, gap: 10 }}>
        <Note
          text={
            "Welcome!\n\nPlease log in to your account using either your email, phone, or CNIC that were provided while registration."
          }
        />
        <StringInput
          label="Credential"
          placeholder="E-mail/Phone/CNIC"
          icon="account"
          value={login.form.values.credential}
          onChangeText={login.form.handleChange("credential")}
          error={login.form.errors.credential}
        />
        <StringInput
          label="Password"
          secureTextEntry={true}
          placeholder="Password"
          icon={"form-textbox-password"}
          value={login.form.values.password}
          onChangeText={login.form.handleChange("password")}
          error={login.form.errors.password}
        />
        <Button
          mode="contained"
          style={{ width: "100%" }}
          loading={login.loading}
          disabled={login.loading}
          icon="login"
          onPress={login.form.handleSubmit}
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
        <Divider style={{ height: 1 }} />
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
