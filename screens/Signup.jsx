import { useEffect } from "react";
import { View } from "react-native";
import { Appbar, Button, Text, TextInput } from "react-native-paper";
import useSignup from "../hooks/useSignup";
import StringInput from "../components/StringInput";
import Note from "../components/Note";

const Signup = ({ navigation }) => {
  const signup = useSignup();

  useEffect(() => {
    if (signup.success) {
      navigation.navigate("login");
    }
  }, [signup.success]);

  return (
    <View style={{ flex: 1, gap: 10, justifyContent: "center" }}>
      <Appbar.Header mode="small">
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="Sign up" />
      </Appbar.Header>
      <View style={{ padding: 20, gap: 10 }}>
        <Note text="You are signing up as a donor. Once you are signed up, we will send your password to the phone number you'd have provided." />
        <StringInput
          label="First name"
          placeholder="e.g. John"
          icon="account-details"
          error={signup.form.errors.firstName}
          value={signup.form.values.firstName}
          onChangeText={signup.form.handleChange("firstName")}
        />
        <StringInput
          label="Last name"
          placeholder="e.g. Doe"
          icon="account-details"
          value={signup.form.values.lastName}
          error={signup.form.errors.lastName}
          onChangeText={signup.form.handleChange("lastName")}
        />
        <StringInput
          label="Email (optional)"
          placeholder="e.g. johndoe123@xyz.com"
          keyboardType="email-address"
          icon="email"
          value={signup.form.values.email}
          error={signup.form.errors.email}
          onChangeText={signup.form.handleChange("email")}
        />
        <StringInput
          label="Phone"
          placeholder="e.g. +923001234567"
          keyboardType="phone-pad"
          icon="phone"
          value={signup.form.values.phone}
          error={signup.form.errors.phone}
          onChangeText={signup.form.handleChange("phone")}
        />
        <StringInput
          label="CNIC"
          placeholder="e.g. 4210012345678"
          keyboardType="number-pad"
          icon="card-account-details"
          value={signup.form.values.cnic}
          error={signup.form.errors.cnic}
          onChangeText={signup.form.handleChange("cnic")}
        />
        <Button
          mode="contained"
          style={{ width: "100%" }}
          loading={signup.loading}
          disabled={signup.loading}
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
