import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { FAB, Searchbar } from "react-native-paper";
import Loading from "../../components/Loading";
import useWorkerCollectedDonations from "../../hooks/useWorkerCollectedDonations";
import Item from "./Item";
import NotFound from "../../components/NotFound";
import DonationCard from "../../components/DonationCard";

const CollectedDonationsWorker = () => {
  const navigation = useNavigation();

  const workerCollectedDonations = useWorkerCollectedDonations();

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!search) {
      workerCollectedDonations.fetch();
    } else {
      const timer = setTimeout(() => {
        workerCollectedDonations.search(search);
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
        loading={workerCollectedDonations.searching}
      />
      <ScrollView
        contentContainerStyle={{
          padding: 15,
          paddingBottom: 100,
          gap: 15,
        }}
      >
        {workerCollectedDonations.loading ? (
          <Loading />
        ) : !workerCollectedDonations.error &&
          !!workerCollectedDonations.data &&
          workerCollectedDonations.data?.length ? (
          workerCollectedDonations.data.map((item) => {
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
      <FAB
        style={{ position: "absolute", right: 15, bottom: 15 }}
        icon="plus"
        onPress={() => {
          navigation.navigate("worker-add-new-collection");
        }}
      />
    </View>
  );
};

export default CollectedDonationsWorker;
