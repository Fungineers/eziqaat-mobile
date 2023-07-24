import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Searchbar } from "react-native-paper";
import Loading from "../../components/Loading";
import useAreaPendingDonations from "../../hooks/useAreaPendingDonations";
import Item from "./Item";
import NotFound from "../../components/NotFound";
import DonationCard from "../../components/DonationCard";

const PendingDonationsWorker = () => {
  const navigation = useNavigation();

  const areaPendingDonations = useAreaPendingDonations();

  const [search, setSearch] = useState("");

  useEffect(() => {
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
  }, [search]);

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
          !!areaPendingDonations.data &&
          areaPendingDonations.data?.length ? (
          areaPendingDonations.data.map((item) => {
            return (
              <DonationCard
                key={item.id}
                donationId={item.id}
                path="worker-donation-details"
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
    </View>
  );
};

export default PendingDonationsWorker;
