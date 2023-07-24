import { useFocusEffect } from "@react-navigation/core";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Searchbar } from "react-native-paper";
import DonationCard from "../../components/DonationCard";
import Loading from "../../components/Loading";
import useAreaRequestedDonations from "../../hooks/useAreaRequestedDonations";
import NotFound from "../../components/NotFound";

const RequestedDonationsChairperson = () => {
  const areaRequestedDonations = useAreaRequestedDonations();

  const [search, setSearch] = useState("");

  useFocusEffect(
    useCallback(() => {
      if (!search) {
        areaRequestedDonations.fetch();
      } else {
        const timer = setTimeout(() => {
          areaRequestedDonations.search(search);
        }, 1000);
        return () => {
          clearTimeout(timer);
        };
      }
      return () => {
        areaRequestedDonations.reset();
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
        loading={areaRequestedDonations.searching}
      />
      <ScrollView
        contentContainerStyle={{
          padding: 15,
          paddingBottom: 100,
          gap: 15,
        }}
      >
        {areaRequestedDonations.loading ? (
          <Loading />
        ) : !areaRequestedDonations.error &&
          !!areaRequestedDonations.data?.length ? (
          areaRequestedDonations.data.map((item) => {
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
    </View>
  );
};

export default RequestedDonationsChairperson;
