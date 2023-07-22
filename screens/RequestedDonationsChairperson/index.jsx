import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Searchbar } from "react-native-paper";
import Loading from "../../components/Loading";
import useAreaRequestedDonations from "../../hooks/useAreaRequestedDonations";
import Item from "./Item";

const RequestedDonationsChairperson = () => {
  const navigation = useNavigation();

  const areaRequestedDonations = useAreaRequestedDonations();

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!search) {
      areaRequestedDonations.requests.fetch();
    } else {
      const timer = setTimeout(() => {
        areaRequestedDonations.requests.search(search);
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
        loading={areaRequestedDonations.requests.searching}
      />
      <ScrollView
        contentContainerStyle={{
          padding: 15,
          paddingBottom: 100,
          gap: 15,
        }}
      >
        {areaRequestedDonations.requests.loading ? (
          <Loading />
        ) : !areaRequestedDonations.requests.error &&
          !!areaRequestedDonations.requests.data ? (
          areaRequestedDonations.requests.data.map((request) => {
            return <Item key={request.id} request={request} />;
          })
        ) : null}
      </ScrollView>
    </View>
  );
};

export default RequestedDonationsChairperson;
