import { View } from "react-native";
import { Button } from "react-native-paper";
import Note from "../../components/Note";
import StringInput from "../../components/StringInput";
import useCreateWorker from "../../hooks/useCreateWorker";

const CreateWorker = ({ popup, onSuccess = () => {} }) => {
  const createWorker = useCreateWorker({
    successCallback: () => {
      popup.hide();
      onSuccess();
    },
  });

  return (
    <View style={{ flexDirection: "column", gap: 10 }}>
      <Note text="Please verify all the details of the worker you provide. Note that the worker's account details will be sent to their phone number and it will be enabled by default" />
      <StringInput
        label="First name"
        placeholder="e.g. John"
        icon="account-details"
        mode="outlined"
        error={createWorker.form.errors.firstName}
        value={createWorker.form.values.firstName}
        onChangeText={createWorker.form.handleChange("firstName")}
      />
      <StringInput
        label="Last name"
        placeholder="e.g. Doe"
        icon="account-details"
        mode="outlined"
        value={createWorker.form.values.lastName}
        error={createWorker.form.errors.lastName}
        onChangeText={createWorker.form.handleChange("lastName")}
      />
      <StringInput
        label="Email (optional)"
        placeholder="e.g. johndoe123@xyz.com"
        keyboardType="email-address"
        mode="outlined"
        autoCapitalize="none"
        icon="email"
        value={createWorker.form.values.email}
        error={createWorker.form.errors.email}
        onChangeText={createWorker.form.handleChange("email")}
      />
      <StringInput
        label="Phone"
        placeholder="e.g. +923001234567"
        keyboardType="phone-pad"
        mode="outlined"
        icon="phone"
        value={createWorker.form.values.phone}
        error={createWorker.form.errors.phone}
        onChangeText={createWorker.form.handleChange("phone")}
      />
      <StringInput
        label="CNIC"
        placeholder="e.g. 4210012345678"
        keyboardType="number-pad"
        mode="outlined"
        icon="card-account-details"
        value={createWorker.form.values.cnic}
        error={createWorker.form.errors.cnic}
        onChangeText={createWorker.form.handleChange("cnic")}
      />
      <Button
        mode="contained"
        style={{ width: "100%" }}
        loading={createWorker.loading}
        disabled={createWorker.loading}
        icon="account-plus"
        onPress={createWorker.form.handleSubmit}
      >
        Create Worker
      </Button>
    </View>
  );
};

export default CreateWorker;
