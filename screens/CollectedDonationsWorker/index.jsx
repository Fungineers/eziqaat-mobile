import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { FAB, Searchbar } from "react-native-paper";
import Loading from "../../components/Loading";
import useWorkerCollectedDonations from "../../hooks/useWorkerCollectedDonations";
import Item from "./Item";

const CollectedDonationsWorker = () => {
  const navigation = useNavigation();

  const workerCollectedDonations = useWorkerCollectedDonations();

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!search) {
      workerCollectedDonations.collected.fetch();
    } else {
      const timer = setTimeout(() => {
        workerCollectedDonations.collected.search(search);
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
        loading={workerCollectedDonations.collected.searching}
      />
      <ScrollView
        contentContainerStyle={{
          padding: 15,
          paddingBottom: 100,
          gap: 15,
        }}
      >
        {workerCollectedDonations.collected.loading ? (
          <Loading />
        ) : !workerCollectedDonations.collected.error &&
          !!workerCollectedDonations.collected.data ? (
          workerCollectedDonations.collected.data.map((request) => {
            return <Item key={request.id} request={request} />;
          })
        ) : null}
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
