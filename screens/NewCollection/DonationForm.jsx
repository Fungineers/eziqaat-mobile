import { Button, Text, useTheme } from "react-native-paper";
import useNewCollectionRegistered from "../../hooks/useNewCollectionRegistered";
import StringInput from "../../components/StringInput";
import Note from "../../components/Note";

const DonationForm = ({ selected }) => {
  const theme = useTheme();
  const newCollection = useNewCollectionRegistered(selected.id);
  return (
    <>
      <Note text="Please provide the address and donation amount on behalf of the donor you selected." />
      <Text variant="titleMedium" style={{ color: theme.colors.secondary }}>
        Donation Info
      </Text>
      <StringInput
        label="Address"
        placeholder="Enter full address"
        icon="map-marker-outline"
        disabled={newCollection.loading}
        value={newCollection.form.values.address}
        onChangeText={newCollection.form.handleChange("address")}
        error={newCollection.form.errors.address}
      />
      <StringInput
        label="Amount"
        placeholder="Enter amount in PKR"
        icon="cash-multiple"
        disabled={newCollection.loading}
        value={newCollection.form.values.amount}
        onChangeText={newCollection.form.handleChange("amount")}
        error={newCollection.form.errors.amount}
      />
      <Note text="Make sure that the information provided is correct. This will be visible in the associated donor's and workers' accounts as well." />
      <Button
        mode="contained"
        icon="check"
        onPress={newCollection.form.handleSubmit}
        loading={newCollection.loading}
        disabled={newCollection.loading}
      >
        Submit
      </Button>
    </>
  );
};

export default DonationForm;
