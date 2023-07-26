import React from "react";
import { Dimensions, Pressable, ScrollView, View } from "react-native";
import { Avatar, IconButton, Surface, useTheme } from "react-native-paper";
import useNotifications from "../../hooks/useNotifications";
import Item from "./Item";

const NotificationMenu = () => {
  const theme = useTheme();
  const notifications = useNotifications();

  return (
    <>
      {notifications.menuShown && (
        <Pressable
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "#0008",
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").height,
          }}
          onPress={notifications.hideMenu}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        />
      )}
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
              zIndex: 100,
              borderRadius: theme.roundness,
              overflow: "scroll",
            }}
          >
            <ScrollView contentContainerStyle={{ padding: 2 }}>
              <View style={{ flexDirection: "column" }}>
                {new Array(15).fill(0).map((...[, idx]) => {
                  return <Item key={idx} />;
                })}
              </View>
            </ScrollView>
          </Surface>
        )}
      </View>
    </>
  );
};

export default NotificationMenu;
