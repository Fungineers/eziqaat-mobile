import React from "react";
import { ScrollView, View } from "react-native";
import { FAB, Searchbar, useTheme } from "react-native-paper";
import BottomPopup from "../../components/BottomPopup";
import Loading from "../../components/Loading";
import usePopup from "../../hooks/usePopup";
import useWorkers from "../../hooks/useWorkers";
import CreateWorker from "./CreateWorker";
import WorkerItem from "./WorkerItem";

const ManageWorkers = ({ navigation }) => {
  const theme = useTheme();
  const popup = usePopup();
  const workers = useWorkers();

  return (
    <>
      <View style={{ flexDirection: "column", flex: 1, position: "relative" }}>
        <Searchbar
          placeholder="Search"
          // onChangeText={onChangeSearch}
          // value={searchQuery}
          iconColor={theme.colors.primary}
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
          ) : (
            workers.data.map((worker) => (
              <WorkerItem key={worker.id} worker={worker} />
            ))
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
        {popup.shown && <CreateWorker popup={popup} />}
      </BottomPopup>
    </>
  );
};

export default ManageWorkers;
