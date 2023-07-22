import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Searchbar } from "react-native-paper";
import Loading from "../../components/Loading";
import useAreaPendingDonations from "../../hooks/useAreaPendingDonations";
import Item from "./Item";

const PendingDonationsChairperson = () => {
  const navigation = useNavigation();

  const areaPendingDonations = useAreaPendingDonations();

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!search) {
      areaPendingDonations.pending.fetch();
    } else {
      const timer = setTimeout(() => {
        areaPendingDonations.pending.search(search);
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
        loading={areaPendingDonations.pending.searching}
      />
      <ScrollView
        contentContainerStyle={{
          padding: 15,
          paddingBottom: 100,
          gap: 15,
        }}
      >
        {areaPendingDonations.pending.loading ? (
          <Loading />
        ) : !areaPendingDonations.pending.error &&
          !!areaPendingDonations.pending.data ? (
          areaPendingDonations.pending.data.map((request) => {
            return <Item key={request.id} request={request} />;
          })
        ) : null}
      </ScrollView>
    </View>
  );
};

export default PendingDonationsChairperson;
