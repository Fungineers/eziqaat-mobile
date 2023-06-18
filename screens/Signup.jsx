import { View } from "react-native";
import { Appbar, Button, Text, TextInput } from "react-native-paper";
import useSignup from "../hooks/useSignup";
import { useSnackbar } from "../context/snackbar.context";

const Signup = ({ navigation }) => {
  const signup = useSignup();
  const snackbar = useSnackbar();

  if (signup.success) {
    navigation.navigate("login");
  }

  return (
    <View style={{ flex: 1, gap: 10, justifyContent: "center" }}>
      <Appbar.Header mode="center-aligned">
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="Sign up" />
      </Appbar.Header>
      <View style={{ padding: 20, gap: 10 }}>
        <Text
          variant="bodyMedium"
          style={{ textAlign: "left", marginBottom: 20 }}
        >
          You are signing up as a donor. Once you are signed up, we will send
          your password to the phone number you'd have provided.
        </Text>
        <TextInput
          label="First name"
          placeholder="e.g. John"
          mode="flat"
          style={{ width: "100%" }}
          left={<TextInput.Icon icon="account-details" />}
          value={signup.form.values.firstName}
          onChangeText={signup.form.handleChange("firstName")}
        />
        <TextInput
          label="Last name"
          placeholder="e.g. Doe"
          mode="flat"
          style={{ width: "100%" }}
          left={<TextInput.Icon icon="account-details" />}
          value={signup.form.values.lastName}
          onChangeText={signup.form.handleChange("lastName")}
        />
        <TextInput
          label="Email (optional)"
          placeholder="e.g. johndoe123@xyz.com"
          keyboardType="email-address"
          mode="flat"
          style={{ width: "100%" }}
          left={<TextInput.Icon icon="email" />}
          value={signup.form.values.email}
          onChangeText={signup.form.handleChange("email")}
        />
        <TextInput
          label="Phone"
          placeholder="e.g. +923001234567"
          keyboardType="phone-pad"
          mode="flat"
          style={{ width: "100%" }}
          left={<TextInput.Icon icon="phone" />}
          value={signup.form.values.phone}
          onChangeText={signup.form.handleChange("phone")}
        />
        <TextInput
          label="CNIC"
          placeholder="e.g. 4210012345678"
          keyboardType="number-pad"
          mode="flat"
          style={{ width: "100%" }}
          left={<TextInput.Icon icon="card-account-details" />}
          value={signup.form.values.cnic}
          onChangeText={signup.form.handleChange("cnic")}
        />
        <Button
          mode="contained"
          style={{ width: "100%" }}
          loading={signup.loading}
          icon="account-plus"
          onPress={signup.form.handleSubmit}
        >
          Sign up
        </Button>
        <View style={{ borderBottomWidth: 1, borderColor: "#c4c4c4" }} />
        <Text variant="bodyMedium" style={{ textAlign: "center" }}>
          Already have an account?
        </Text>
        <Button
          mode="contained-tonal"
          style={{ width: "100%" }}
          icon="login"
          onPress={() => {
            navigation.navigate("login");
          }}
        >
          Log in now
        </Button>
      </View>
    </View>
  );
};

export default Signup;
