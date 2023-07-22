import { Button, Divider, Text, useTheme } from "react-native-paper";
import useRegisterDonor from "../../hooks/useRegisterDonor";
import StringInput from "../../components/StringInput";
import Note from "../../components/Note";
import InfoItem from "./InfoItem";
import DonationForm from "./DonationForm";

const Unregistered = () => {
  const registerDonor = useRegisterDonor();
  const theme = useTheme();

  return (
    <>
      {registerDonor.donor ? (
        <>
          <Text variant="titleMedium" style={{ color: theme.colors.secondary }}>
            Selected Donor
          </Text>
          <InfoItem
            icon="account-outline"
            label="Name"
            description={`${registerDonor.donor?.firstName} ${registerDonor.donor?.lastName}`}
          />
          <InfoItem
            icon="phone-outline"
            label="Phone"
            description={registerDonor.donor?.phone}
          />
          <InfoItem
            icon="card-account-details-outline"
            label="CNIC"
            description={registerDonor.donor?.cnic}
          />
          <InfoItem
            icon="email-outline"
            label="E-mail"
            description={registerDonor.donor?.email || "(Unset)"}
          />
          <Button
            mode="elevated"
            icon="arrow-u-left-top"
            onPress={() => {
              registerDonor.clearDonor();
            }}
          >
            Cancel
          </Button>
          <Divider />
          {!!registerDonor.donor && (
            <DonationForm selected={registerDonor.donor} />
          )}
        </>
      ) : (
        <>
          <Text variant="titleMedium" style={{ color: theme.colors.secondary }}>
            Register Donor
          </Text>
          <Note text="In order to report collection, you need to register the donor first. Please provide the correct details of the donor" />
          <StringInput
            label="First name"
            placeholder="e.g. John"
            icon="account-details"
            error={registerDonor.form.errors.firstName}
            value={registerDonor.form.values.firstName}
            onChangeText={registerDonor.form.handleChange("firstName")}
          />
          <StringInput
            label="Last name"
            placeholder="e.g. Doe"
            icon="account-details"
            value={registerDonor.form.values.lastName}
            error={registerDonor.form.errors.lastName}
            onChangeText={registerDonor.form.handleChange("lastName")}
          />
          <StringInput
            label="Email (optional)"
            placeholder="e.g. johndoe123@xyz.com"
            keyboardType="email-address"
            icon="email"
            value={registerDonor.form.values.email}
            error={registerDonor.form.errors.email}
            onChangeText={registerDonor.form.handleChange("email")}
          />
          <StringInput
            label="Phone"
            placeholder="e.g. +923001234567"
            keyboardType="phone-pad"
            icon="phone"
            value={registerDonor.form.values.phone}
            error={registerDonor.form.errors.phone}
            onChangeText={registerDonor.form.handleChange("phone")}
          />
          <StringInput
            label="CNIC"
            placeholder="e.g. 4210012345678"
            keyboardType="number-pad"
            icon="card-account-details"
            value={registerDonor.form.values.cnic}
            error={registerDonor.form.errors.cnic}
            onChangeText={registerDonor.form.handleChange("cnic")}
          />
          <Button
            mode="contained"
            style={{ width: "100%" }}
            loading={registerDonor.loading}
            disabled={registerDonor.loading}
            icon="account-plus"
            onPress={registerDonor.form.handleSubmit}
          >
            Register Donor
          </Button>
        </>
      )}
    </>
  );
};

export default Unregistered;
