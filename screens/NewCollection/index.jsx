import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Divider, Text, useTheme } from "react-native-paper";
import Note from "../../components/Note";
import Registered from "./Registered";
import Unregistered from "./Unregistered";

const NewCollection = () => {
  const theme = useTheme();
  const [isRegistered, setIsRegistered] = useState(null);
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={{ flexDirection: "column", gap: 16 }}>
        <Note text="This feature allows to directly report collection from those donors who get caught up on the way, and haven't made a request, or are currently unregistered." />
        <Text variant="bodyLarge" style={{ color: theme.colors.secondary }}>
          Is the donor already registered?
        </Text>
        <View style={{ flexDirection: "row", gap: 15 }}>
          <Button
            mode="elevated"
            onPress={() => {
              setIsRegistered(true);
            }}
            disabled={isRegistered !== null}
            style={
              isRegistered === true && {
                backgroundColor: theme.colors.inversePrimary,
              }
            }
          >
            Yes
          </Button>
          <Button
            mode="elevated"
            onPress={() => {
              setIsRegistered(false);
            }}
            disabled={isRegistered !== null}
            style={
              isRegistered === false && {
                backgroundColor: theme.colors.inversePrimary,
              }
            }
          >
            No
          </Button>
        </View>
        {isRegistered !== null && (
          <>
            <Divider />
            <Button
              mode="elevated"
              onPress={() => {
                setIsRegistered(null);
              }}
              icon="arrow-u-left-top"
            >
              Cancel
            </Button>
            {isRegistered === true ? <Registered /> : <Unregistered />}
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default NewCollection;
