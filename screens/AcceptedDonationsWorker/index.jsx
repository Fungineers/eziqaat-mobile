import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Searchbar } from "react-native-paper";
import Loading from "../../components/Loading";
import useWorkerAcceptedDonations from "../../hooks/useWorkerAcceptedDonations";
import Item from "./Item";
import NotFound from "../../components/NotFound";

const AcceptedDonationsWorker = () => {
  const navigation = useNavigation();

  const workerAcceptedDonations = useWorkerAcceptedDonations();

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!search) {
      workerAcceptedDonations.accepted.fetch();
    } else {
      const timer = setTimeout(() => {
        workerAcceptedDonations.accepted.search(search);
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
        loading={workerAcceptedDonations.accepted.searching}
      />
      <ScrollView
        contentContainerStyle={{
          padding: 15,
          paddingBottom: 100,
          gap: 15,
        }}
      >
        {workerAcceptedDonations.accepted.loading ? (
          <Loading />
        ) : !workerAcceptedDonations.accepted.error &&
          !!workerAcceptedDonations.accepted.data &&
          workerAcceptedDonations.accepted.data?.length ? (
          workerAcceptedDonations.accepted.data.map((request) => {
            return <Item key={request.id} request={request} />;
          })
        ) : (
          <NotFound />
        )}
      </ScrollView>
    </View>
  );
};

export default AcceptedDonationsWorker;
