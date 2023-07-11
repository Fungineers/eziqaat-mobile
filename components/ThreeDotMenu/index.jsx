import React from "react";
import { useState } from "react";
import { View } from "react-native";
import {
  Divider,
  Menu,
  Button,
  IconButton,
  useTheme,
} from "react-native-paper";

const ThreeDotMenu = () => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const theme = useTheme();

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<IconButton onPress={openMenu} icon="dots-vertical" />}
      anchorPosition="bottom"
    >
      <Menu.Item onPress={() => {}} title="Refresh" leadingIcon="refresh" />
      <Divider />
      <Menu.Item
        onPress={() => {}}
        title="Manage Disabled Workers"
        leadingIcon="cancel"
      />
    </Menu>
  );
};

export default ThreeDotMenu;
