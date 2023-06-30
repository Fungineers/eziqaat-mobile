import React from "react";
import { useState } from "react";
import { View } from "react-native";
import { Divider, Menu, Button, IconButton } from "react-native-paper";

const ThreeDotMenu = () => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

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
        title="Managed Disabled Workers Managed Disabled Workers Managed Disabled Workers"
        leadingIcon="cancel"
      />
    </Menu>
  );
};

export default ThreeDotMenu;
