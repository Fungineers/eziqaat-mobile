import { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Card,
  FAB,
  IconButton,
  Searchbar,
  Text,
  useTheme,
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const InfoItem = ({ icon, info }) => {
  const theme = useTheme();

  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <MaterialCommunityIcons
        name={icon}
        size={16}
        color={theme.colors.secondary}
      />
      <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>
        {info}
      </Text>
    </View>
  );
};

const Item = () => {
  const theme = useTheme();
  return (
    <Card>
      <Card.Content>
        <View style={{ flexDirection: "column", gap: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              variant="titleLarge"
              style={{ color: theme.colors.primary, flex: 1 }}
            >
              PKR 52,000
            </Text>
            <IconButton
              icon="arrow-right"
              size={20}
              style={{
                backgroundColor: theme.colors.primaryContainer,
                margin: 0,
              }}
              onPress={() => {}}
            />
          </View>
          <InfoItem
            icon="account-outline"
            info="Daniyal Aamir | +92 304 2868395"
          />
          <InfoItem icon="clock-outline" info="6:43 PM   24th June, 2023" />
          <InfoItem
            icon="map-marker-outline"
            info="F-14, Plot BS-9, Samanabad Mubarace Corner, Block-18, Federal B. Area, Karachi"
          />
        </View>
        {/* <View>
            <IconButton icon="arrow-right" size={24} onPress={() => {}} />
          </View> */}
        {/* </View> */}
      </Card.Content>
    </Card>
  );
};

const PendingDonationsChairperson = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
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
        value={searchQuery}
        style={{ borderRadius: 0 }}
      />
      <ScrollView
        contentContainerStyle={{
          padding: 15,
          paddingBottom: 100,
          gap: 15,
        }}
      >
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </ScrollView>
      <FAB
        icon="plus"
        style={{ position: "absolute", right: 15, bottom: 15 }}
        onPress={() => {}}
      />
    </View>
  );
};

export default PendingDonationsChairperson;
