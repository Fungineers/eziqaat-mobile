import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import {
  Avatar,
  Button,
  ProgressBar,
  Text,
  useTheme,
} from "react-native-paper";

const GetStarted = () => {
  const navigation = useNavigation();

  const onboardedStorage = useAsyncStorage("onboarded");

  const [page, setPage] = useState(0);

  const handleNext = () => setPage((page) => page + 1);

  const handleBack = () => setPage((page) => page - 1);

  const handleDone = async () => {
    onboardedStorage.setItem("yes").finally(() => {
      navigation.navigate("login");
    });
  };

  const pageCount = 5;
  const theme = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <ProgressBar progress={page / (pageCount - 1)} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 30,
          gap: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {page === 0 ? (
          <>
            <Text
              style={{ width: "100%", textAlign: "center", marginTop: 100 }}
              variant="displaySmall"
            >
              Welcome To
            </Text>
            <Text
              variant="displayLarge"
              style={{
                color: theme.colors.primary,
                marginTop: 30,
                width: "100%",
                textAlign: "center",
              }}
            >
              Zakatify
            </Text>
            <Text
              variant="titleLarge"
              style={{
                color: theme.colors.secondary,
                textAlign: "center",
                marginTop: 30,
                width: "100%",
              }}
            >
              Empowering Your Generosity with Seamless Doorstep Donations!
            </Text>
          </>
        ) : page === 1 ? (
          <>
            <Avatar.Image
              size={200}
              source={require("../../assets/donate.png")}
            />
            <Text
              style={{ width: "100%", color: theme.colors.primary }}
              variant="headlineMedium"
            >
              Your Ultimate Convenience for Safe and Effortless Donations
            </Text>
            <Text style={{ width: "100%" }} variant="bodyLarge">
              No need to visit organizations physically or worry about where to
              donate. Our app lets you make secure donations from the comfort of
              your home. From online money transfers to doorstep collections,
              giving back has never been easier.
            </Text>
          </>
        ) : page === 2 ? (
          <>
            <Avatar.Image
              size={200}
              source={require("../../assets/record.png")}
            />
            <Text
              style={{ width: "100%", color: theme.colors.primary }}
              variant="headlineMedium"
            >
              Secure and Transparent Records: Say Goodbye to Unreliable
              Receipts!
            </Text>
            <Text style={{ width: "100%" }} variant="bodyLarge">
              Fed up with unauthenticated provisional receipts? No more delays
              or uncertainties. Zakatify ensures centralized and instant
              recording of your donations, allowing you to track them with full
              confidence.
            </Text>
          </>
        ) : page === 3 ? (
          <>
            <Avatar.Image
              size={200}
              source={require("../../assets/no-fraud.png")}
            />
            <Text
              style={{ width: "100%", color: theme.colors.primary }}
              variant="headlineMedium"
            >
              Total Accountability Guaranteed: Your Donations, Our Watchful Eye!
            </Text>
            <Text style={{ width: "100%" }} variant="bodyLarge">
              With instant recording and meticulous tracking, Zakatify ensures
              complete accountability. We keep a vigilant check on every
              collector, ensuring that your donations are used for their
              intended purpose and no frauds are committed with the
              contributions you make.
            </Text>
          </>
        ) : (
          <>
            <Avatar.Image
              size={200}
              source={require("../../assets/ramadan-zakat.png")}
            />
            <Text
              style={{ width: "100%", color: theme.colors.primary }}
              variant="headlineMedium"
            >
              Your Zakat Matters: Empowering Lives and Creating Impact!
            </Text>
            <Text style={{ width: "100%" }} variant="bodyLarge">
              Your Zakat has the power to transform countless lives, support
              households in need, provide education and healthcare for the
              underprivileged, and contribute to various impactful initiatives.
              Together, we can make a difference. Choose Zakatify as your
              trusted Zakat organization and join us in creating a brighter
              future for those in need.
            </Text>
          </>
        )}
      </ScrollView>
      <View style={{ flexDirection: "row", gap: 15, justifyContent: "center" }}>
        {new Array(pageCount).fill(0).map((...[, idx]) => (
          <View
            key={idx}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor:
                idx <= page
                  ? theme.colors.primary
                  : theme.colors.inversePrimary,
            }}
          />
        ))}
      </View>
      <View style={{ padding: 15, flexDirection: "row", gap: 10 }}>
        {page === 0 ? (
          <Button
            mode="contained"
            style={{ flex: 1 }}
            contentStyle={{ flexDirection: "row-reverse" }}
            onPress={handleNext}
            icon="ray-start-arrow"
          >
            Get Started
          </Button>
        ) : (
          <>
            <Button
              mode="contained-tonal"
              style={{ flex: 1 }}
              icon="arrow-left"
              onPress={handleBack}
            >
              Back
            </Button>
            {page < pageCount - 1 ? (
              <Button
                mode="contained-tonal"
                style={{ flex: 1 }}
                onPress={handleNext}
                icon="arrow-right"
                contentStyle={{ flexDirection: "row-reverse" }}
              >
                Next
              </Button>
            ) : (
              <Button
                mode="contained"
                icon="check"
                style={{ flex: 1 }}
                onPress={handleDone}
              >
                Done
              </Button>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default GetStarted;
