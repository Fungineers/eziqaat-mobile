import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import DonationCard from "../../components/DonationCard";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";
import useDonorHistory from "../../hooks/useDonorHistory";
import upperSnakeCaseToSentenceCase from "../../utils/upperSnakeCaseToSentenceCase";

const DonorHistory = () => {
  const donorHistory = useDonorHistory();

  useEffect(() => {
    donorHistory.fetch();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={{ flexDirection: "column", gap: 16 }}>
        {donorHistory.loading ? (
          <Loading />
        ) : !donorHistory.error && donorHistory.data?.length ? (
          donorHistory.data.map((item) => (
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

export default DonorHistory;
