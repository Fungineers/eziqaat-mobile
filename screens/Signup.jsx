import { useState } from "react";
import { View } from "react-native";
import { Appbar, Button, Text, TextInput } from "react-native-paper";

const Signup = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cnic, setCnic] = useState("");

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("login");
    }, 2000);
  };

  return (
    <View style={{ flex: 1, gap: 10, justifyContent: "center" }}>
      <Appbar.Header mode="center-aligned">
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
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
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          label="Last name"
          placeholder="e.g. Doe"
          mode="flat"
          style={{ width: "100%" }}
          left={<TextInput.Icon icon="account-details" />}
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          label="Email (optional)"
          placeholder="e.g. johndoe123@xyz.com"
          keyboardType="email-address"
          mode="flat"
          style={{ width: "100%" }}
          left={<TextInput.Icon icon="email" />}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          label="Phone"
          placeholder="e.g. +923001234567"
          keyboardType="phone-pad"
          mode="flat"
          style={{ width: "100%" }}
          left={<TextInput.Icon icon="phone" />}
          value={phone}
          onChangeText={setPhone}
          // render={(props) => (
          //   <TextInputMask {...props} mask="+[00] [000] [000] [000]" />
          // )}
        />
        <TextInput
          label="CNIC"
          placeholder="e.g. 4210012345678"
          keyboardType="number-pad"
          mode="flat"
          style={{ width: "100%" }}
          left={<TextInput.Icon icon="card-account-details" />}
          value={cnic}
          onChangeText={setCnic}
        />
        <Button
          mode="contained"
          style={{ width: "100%" }}
          loading={loading}
          icon="account-plus"
          onPress={handleSubmit}
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
