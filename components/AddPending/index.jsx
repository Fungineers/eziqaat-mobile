import { View } from "react-native";
import { Button } from "react-native-paper";
import Note from "../../components/Note";
import StringInput from "../../components/StringInput";
import useAddPending from "../../hooks/useAddPending";

const AddPending = ({ popup, onSuccess = () => {} }) => {
  const addPending = useAddPending({
    successCallback: () => {
      popup.hide();
      onSuccess();
    },
  });

  const disabled = addPending.loading;

  return (
    <View style={{ flexDirection: "column", gap: 10 }}>
      <Note text="Please verify all the details before submitting this form. This information will be directly accessible to the workers." />
      <StringInput
        label="Name"
        placeholder="e.g. John Doe"
        icon="account-details"
        mode="outlined"
        error={addPending.form.errors.refName}
        value={addPending.form.values.refName}
        onChangeText={addPending.form.handleChange("refName")}
      />
      <StringInput
        label="Phone"
        placeholder="e.g. +923001234567"
        keyboardType="phone-pad"
        mode="outlined"
        icon="phone"
        value={addPending.form.values.refPhone}
        error={addPending.form.errors.refPhone}
        onChangeText={addPending.form.handleChange("refPhone")}
      />
      <StringInput
        label="Address"
        placeholder="Enter full address"
        icon="map-marker-outline"
        disabled={disabled}
        value={addPending.form.values.address}
        onChangeText={addPending.form.handleChange("address")}
        error={addPending.form.errors.address}
      />
      <StringInput
        label="Amount"
        placeholder="Enter amount in PKR"
        icon="cash-multiple"
        disabled={disabled}
        value={addPending.form.values.amount}
        onChangeText={addPending.form.handleChange("amount")}
        error={addPending.form.errors.amount}
      />
      <Button
        mode="contained"
        style={{ width: "100%" }}
        loading={addPending.loading}
        disabled={addPending.loading}
        icon="pencil-plus"
        onPress={addPending.form.handleSubmit}
      >
        Add Record
      </Button>
    </View>
  );
};

export default AddPending;
