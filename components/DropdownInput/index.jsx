import { useState } from "react";
import { ScrollView, View } from "react-native";
import { HelperText, Menu, TextInput, useTheme } from "react-native-paper";

const DropdownInput = ({
  label = "",
  secureTextEntry = false,
  mode = "outlined",
  placeholder = "",
  icon = "",
  value = "",
  setValue = () => {},
  error = "",
  options,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const theme = useTheme();

  const show = () => setShowDropDown(true);
  const hide = () => setShowDropDown(false);

  const activeLabel = !value
    ? ""
    : options.find((option) => option.value === value)?.label || "";

  return (
    <View style={{ width: "100%" }}>
      <Menu
        visible={showDropDown}
        onDismiss={hide}
        anchor={
          <TextInput
            label={label}
            left={
              icon && (
                <TextInput.Icon
                  icon={icon}
                  iconColor={error ? theme.colors.error : theme.colors.primary}
                />
              )
            }
            mode={mode}
            visible={showDropDown}
            onFocus={show}
            value={activeLabel}
            editable={!showDropDown}
            error={!!error}
          />
        }
        anchorPosition="bottom"
      >
        <ScrollView style={{ maxHeight: 300 }}>
          {options.map((option, idx) => {
            return (
              <Menu.Item
                title={option.label}
                key={idx}
                onPress={() => {
                  setValue(option.value);
                  hide();
                }}
              />
            );
          })}
        </ScrollView>
      </Menu>
      {error ? (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      ) : (
        <></>
      )}
    </View>
  );
};

export default DropdownInput;
