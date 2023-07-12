import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Button } from "react-native-paper";
import DropdownInput from "../../components/DropdownInput";
import Note from "../../components/Note";
import StringInput from "../../components/StringInput";
import useRequestDonation from "../../hooks/useRequestDonation";
import { useIsFocused, useNavigation } from "@react-navigation/core";

const DonationRequest = ({}) => {
  const navigation = useNavigation();

  useIsFocused();

  const { disabled, error, loading, form, areaOptions } = useRequestDonation();

  console.log(form.values);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={{ flexDirection: "column", gap: 16 }}>
        <Note text="Please fill out this form if you want to request for doorstep collection. Your requests will first wait for approval from the associated chairperson of the area you select. You can check real-time status of you requests anytime" />
        <DropdownInput
          label="Area"
          icon="select-place"
          disabled={disabled}
          value={form.values.areaId}
          setValue={(value) => form.setFieldValue("areaId", value)}
          error={form.errors.areaId}
          options={areaOptions}
        />
        <StringInput
          label="Address"
          placeholder="Enter full address"
          icon="map-marker-outline"
          disabled={disabled}
          value={form.values.address}
          onChangeText={form.handleChange("address")}
          error={form.errors.address}
        />
        <StringInput
          label="Amount"
          placeholder="Enter amount in PKR"
          icon="cash-multiple"
          disabled={disabled}
          value={form.values.amount}
          onChangeText={form.handleChange("amount")}
          error={form.errors.amount}
        />
        <Note text="Please make sure to provide correct info. Note that if the address is undiscoverable, or the selected area and the address are conflicting, or the amount is unrealistic, then your request might not be approved" />
        <Button
          mode="contained"
          style={{ width: "100%" }}
          loading={loading}
          icon="check"
          disabled={disabled}
          onPress={form.handleSubmit}
        >
          Submit
        </Button>
      </View>
    </ScrollView>
  );
};

export default DonationRequest;
