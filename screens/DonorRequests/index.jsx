import { ScrollView, View } from "react-native";
import Loading from "../../components/Loading";
import useDonorRequests from "../../hooks/useDonorRequests";
import RequestItem from "./RequestItem";
import Note from "../../components/Note";

const DonorRequests = () => {
  const donorRequests = useDonorRequests();

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={{ flexDirection: "column", gap: 16 }}>
        <Note text="Every request that you submit, or any record added on your behalf that hasn't been collected yet, can be tracked here. You can use the unique tracking ID, and worker details for reference in case of any queries" />
        <Note text="REQUESTED means waiting for approval, PENDING means approved by chairperson, ACCEPTED means that a worker has confirmed to collect your donation" />
        {donorRequests.loading ? (
          <Loading />
        ) : (
          donorRequests.data.map((request, idx) => (
            <RequestItem data={request} key={idx} />
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default DonorRequests;
