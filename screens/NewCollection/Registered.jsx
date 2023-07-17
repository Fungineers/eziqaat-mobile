import { Button, Divider, Searchbar, Text, useTheme } from "react-native-paper";
import Note from "../../components/Note";
import useSearchDonor from "../../hooks/useSearchDonor";
import InfoItem from "./InfoItem";
import { useState } from "react";

const Registered = () => {
  const theme = useTheme();
  const searchDonor = useSearchDonor();
  const [selected, setSelected] = useState(null);

  return (
    <>
      {selected ? (
        <Text variant="titleMedium" style={{ color: theme.colors.secondary }}>
          Selected Donor
        </Text>
      ) : (
        <>
          <Note text="Search and select the donor by phone, CNIC, or email to proceed" />
          <Text variant="titleMedium" style={{ color: theme.colors.secondary }}>
            Search Donor
          </Text>
        </>
      )}
      {!selected && (
        <Searchbar
          placeholder="Phone/CNIC/E-mail"
          value={searchDonor.search}
          loading={searchDonor.searching}
          onChangeText={searchDonor.setSearch}
        />
      )}
      {!!searchDonor.result ? (
        <>
          {!selected && <Text variant="bodyMedium">Found 1 result</Text>}
          <InfoItem
            icon="account-outline"
            label="Name"
            description={`${searchDonor.result.firstName} ${searchDonor.result.lastName}`}
          />
          <InfoItem
            icon="phone-outline"
            label="Phone"
            description={searchDonor.result.phone}
          />
          <InfoItem
            icon="card-account-details-outline"
            label="CNIC"
            description={searchDonor.result.cnic}
          />
          <InfoItem
            icon="email-outline"
            label="E-mail"
            description={searchDonor.result.email || "(Unset)"}
          />
          {!selected ? (
            <Button
              mode="contained"
              icon="check"
              onPress={() => {
                setSelected(searchDonor.result);
              }}
            >
              Select
            </Button>
          ) : (
            <Button
              mode="elevated"
              icon="arrow-u-left-top"
              onPress={() => {
                setSelected(null);
              }}
            >
              Cancel
            </Button>
          )}
          <Divider />
          <Text variant="titleMedium" style={{ color: theme.colors.secondary }}>
            Donation Info
          </Text>
        </>
      ) : (
        <>
          <Text variant="bodyMedium">No result found</Text>
        </>
      )}
    </>
  );
};

export default Registered;
