import { useState } from "react";
import { View } from "react-native";
import { HelperText, TextInput, useTheme } from "react-native-paper";

const StringInput = ({
  label = "",
  secureTextEntry = false,
  mode = "outlined",
  placeholder = "",
  icon = "",
  value = "",
  autoCapitalize,
  onChangeText = () => {},
  error = "",
  keyboardType = "default",
}) => {
  const [shown, setShown] = useState(false);
  const theme = useTheme();

  return (
    <View style={{ width: "100%" }}>
      <TextInput
        label={label}
        placeholder={placeholder}
        mode={mode}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        style={{ width: "100%" }}
        left={
          icon && (
            <TextInput.Icon
              icon={icon}
              iconColor={error ? theme.colors.error : theme.colors.primary}
            />
          )
        }
        right={
          secureTextEntry && (
            <TextInput.Icon
              onPress={() => {
                setShown(!shown);
              }}
              icon={shown ? "eye-off" : "eye"}
              iconColor={theme.colors.primary}
            />
          )
        }
        secureTextEntry={secureTextEntry && !shown}
        value={value}
        onChangeText={onChangeText}
        error={!!error}
      />
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

export default StringInput;
