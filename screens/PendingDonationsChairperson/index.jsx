import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { FAB, Searchbar } from "react-native-paper";
import DonationCard from "../../components/DonationCard";
import Loading from "../../components/Loading";
import useAreaPendingDonations from "../../hooks/useAreaPendingDonations";
import BottomPopup from "../../components/BottomPopup";
import NotFound from "../../components/NotFound";
import usePopup from "../../hooks/usePopup";
import AddPending from "../../components/AddPending";

const PendingDonationsChairperson = () => {
  const navigation = useNavigation();
  const areaPendingDonations = useAreaPendingDonations();
  const popup = usePopup();

  const [search, setSearch] = useState("");

  useFocusEffect(
    useCallback(() => {
      if (!search) {
        areaPendingDonations.fetch();
      } else {
        const timer = setTimeout(() => {
          areaPendingDonations.search(search);
        }, 1000);
        return () => {
          clearTimeout(timer);
        };
      }
      return () => {
        areaPendingDonations.reset();
      };
    }, [search])
  );
  const onChangeSearch = (query) => setSearch(query);

  return (
    <View
      style={{
        flex: 1,
        position: "relative",
      }}
    >
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={search}
        style={{ borderRadius: 0 }}
        loading={areaPendingDonations.searching}
      />
      <ScrollView
        contentContainerStyle={{
          padding: 15,
          paddingBottom: 100,
          gap: 15,
        }}
      >
        {areaPendingDonations.loading ? (
          <Loading />
        ) : !areaPendingDonations.error &&
          !!areaPendingDonations.data?.length ? (
          areaPendingDonations.data.map((item) => {
            return (
              <DonationCard
                key={item.id}
                donationId={item.id}
                path="chairperson-donation-details"
                data={
                  !item.donorId
                    ? [
                        {
                          icon: "account-outline",
                          label: "Ref Name.",
                          description: `${item.refName}`,
                        },
                        {
                          icon: "phone-outline",
                          label: "Ref Phone.",
                          description: item.refPhone,
                        },
                        {
                          icon: "map-marker-outline",
                          label: "Address",
                          description: item.address,
                        },
                        {
                          icon: "cash-multiple",
                          label: "Amount",
                          description: `PKR ${Intl.NumberFormat("en-US").format(
                            item.amount
                          )}`,
                        },
                      ]
                    : [
                        {
                          icon: "account-outline",
                          label: "Name",
                          description: `${item.firstName} ${item.lastName}`,
                        },
                        {
                          icon: "phone-outline",
                          label: "Phone",
                          description: item.phone,
                        },
                        {
                          icon: "account-details-outline",
                          label: "CNIC",
                          description: item.cnic,
                        },
                        {
                          icon: "map-marker-outline",
                          label: "Address",
                          description: item.address,
                        },
                        {
                          icon: "cash-multiple",
                          label: "Amount",
                          description: `PKR ${Intl.NumberFormat("en-US").format(
                            item.amount
                          )}`,
                        },
                      ]
                }
              />
            );
          })
        ) : (
          <NotFound />
        )}
      </ScrollView>
      <FAB
        style={{ position: "absolute", right: 15, bottom: 15 }}
        icon="plus"
        onPress={popup.show}
      />
      <BottomPopup title="Add Pending Donation" icon="pencil-plus" {...popup}>
        <AddPending />
      </BottomPopup>
    </View>
  );
};

export default PendingDonationsChairperson;
