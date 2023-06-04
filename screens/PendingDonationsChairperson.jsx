import { ScrollView } from "react-native";
import { Avatar, Button, Card, FAB, Text } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="cash" />;

const Item = () => {
  return (
    <Card>
      <Card.Title
        title="Card Title"
        subtitle="Card Subtitle"
        left={LeftContent}
      />
      {/* <Card.Content>
        <Text variant="titleLarge">Card title</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content>
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions> */}
    </Card>
  );
};

const PendingDonationsChairperson = ({ navigation }) => {
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        padding: 20,
        paddingBottom: 100,
        gap: 10,
        position: "relative",
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
      <FAB
        icon="plus"
        style={{ position: "absolute", right: 20, bottom: 20 }}
      />
    </ScrollView>
  );
};

export default PendingDonationsChairperson;
