import React from "react";
import { ScrollView, View } from "react-native";
import { Avatar, IconButton, Surface, useTheme } from "react-native-paper";
import useNotifications from "../../hooks/useNotifications";

const NotificationMenu = () => {
  const theme = useTheme();
  const notifications = useNotifications();

  return (
    <View style={{ position: "relative" }}>
      <IconButton
        icon="bell-outline"
        iconColor={theme.colors.primary}
        style={{ backgroundColor: theme.colors.primaryContainer }}
        onPress={notifications.toggleMenu}
      />
      <Avatar.Text
        label="12"
        size={14}
        style={{
          position: "absolute",
          top: 6,
          right: 6,
          backgroundColor: theme.colors.error,
        }}
      />
      {notifications.menuShown && (
        <Surface
          mode="elevated"
          style={{
            width: 256,
            maxHeight: 324,
            position: "absolute",
            right: 6,
            top: "100%",
            zIndex: 4,
          }}
        >
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <View style={{ flexDirection: "column" }}></View>
          </ScrollView>
        </Surface>
      )}
    </View>
  );
};

export default NotificationMenu;
