import React, { useState } from "react";
import { Dimensions, Modal, Pressable, ScrollView, View } from "react-native";
import { Avatar, Text, useTheme } from "react-native-paper";

const BottomPopup = ({ title, shown, show, hide, children, icon }) => {
  const theme = useTheme();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <>
      <Modal visible={shown} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "#0008",
          }}
        />
      </Modal>
      <Modal visible={shown} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            flexDirection: "column",
          }}
        >
          <Pressable onPress={hide} style={{ flex: 1 }} />
          <View
            style={{
              backgroundColor: "#fff",
              paddingTop: 16,
              maxHeight: Dimensions.get("window").height - 64,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              width: "100%",
            }}
            onTouchStart={(e) => {
              setPos({ x: e.nativeEvent.pageX, y: e.nativeEvent.pageY });
            }}
            onTouchEnd={(e) => {
              if (
                e.nativeEvent.pageY - pos.y > 150 &&
                Math.abs(e.nativeEvent.pageX - pos.x) < 20
              ) {
                hide();
              }
            }}
          >
            <View
              style={{
                width: 40,
                height: 4,
                borderRadius: 2,
                backgroundColor: theme.colors.secondary,
              }}
            />
            <Avatar.Icon
              icon={icon}
              color={theme.colors.primary}
              style={{
                backgroundColor: theme.colors.primaryContainer,
              }}
              size={48}
            />
            <Text variant="titleLarge" style={{ color: theme.colors.primary }}>
              {title}
            </Text>
            <ScrollView>
              <View
                style={{
                  flexDirection: "column",
                  gap: 16,
                  width: Dimensions.get("screen").width,
                  padding: 16,
                }}
              >
                {children}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default BottomPopup;
