import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { FAB, Searchbar, useTheme } from "react-native-paper";
import BottomPopup from "../../components/BottomPopup";
import Loading from "../../components/Loading";
import usePopup from "../../hooks/usePopup";
import useWorkers from "../../hooks/useWorkers";
import CreateWorker from "./CreateWorker";
import WorkerItem from "./WorkerItem";
import { useEffect } from "react";
import NotFound from "../../components/NotFound";

const ManageWorkers = ({ navigation }) => {
  const theme = useTheme();
  const popup = usePopup();
  const workers = useWorkers();

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!search) {
      workers.fetch();
    } else {
      const timer = setTimeout(() => {
        workers.search(search);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [search]);

  return (
    <>
      <View style={{ flexDirection: "column", flex: 1, position: "relative" }}>
        <Searchbar
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          loading={workers.searching}
          iconColor={theme.colors.primary}
          style={{ borderRadius: 0 }}
        />
        <ScrollView
          contentContainerStyle={{
            flexDirection: "column",
            gap: 16,
            padding: 16,
          }}
        >
          {workers.loading ? (
            <Loading />
          ) : workers.data?.length ? (
            workers.data.map((worker) => (
              <WorkerItem key={worker.id} worker={worker} />
            ))
          ) : (
            <NotFound />
          )}
        </ScrollView>
        <FAB
          icon="plus"
          style={{
            position: "absolute",
            right: 16,
            bottom: 16,
            borderRadius: 8,
          }}
          onPress={popup.show}
        />
      </View>
      <BottomPopup title="Create Worker" {...popup} icon="account-plus">
        {popup.shown && (
          <CreateWorker popup={popup} onSuccess={workers.fetch} />
        )}
      </BottomPopup>
    </>
  );
};

export default ManageWorkers;
