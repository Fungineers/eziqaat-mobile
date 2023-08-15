import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import DonationCard from "../../components/DonationCard";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";
import Note from "../../components/Note";
import useDonorRequests from "../../hooks/useDonorRequests";
import upperSnakeCaseToSentenceCase from "../../utils/upperSnakeCaseToSentenceCase";

const DonorRequests = () => {
  const donorRequests = useDonorRequests();

  useEffect(() => {
    donorRequests.fetch();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={{ flexDirection: "column", gap: 16 }}>
        <Note text="Every request that you submit, or any record added on your behalf that hasn't been collected yet, can be tracked here. You can use the unique tracking ID, and worker details for reference in case of any queries" />
        {donorRequests.loading ? (
          <Loading />
        ) : !donorRequests.error && donorRequests.data?.length ? (
          donorRequests.data.map((item) => (
            <DonationCard
              donationId={item.id}
              path="donor-donation-details"
              data={[
                {
                  icon: "select-place",
                  label: "Area",
                  description: item.areaName,
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
                {
                  icon: "crosshairs-question",
                  label: "Status",
                  description: upperSnakeCaseToSentenceCase(item.status),
                },
              ]}
              key={item.id}
            />
          ))
        ) : (
          <NotFound />
        )}
      </View>
    </ScrollView>
  );
};

export default DonorRequests;
