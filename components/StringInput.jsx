import { useState } from "react";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

const StringInput = ({
  label = "",
  secureTextEntry = false,
  placeholder = "",
  icon = "",
  value = "",
  onChangeText = () => {},
  error = "",
  keyboardType = "default",
}) => {
  const [shown, setShown] = useState(false);

  return (
    <View style={{ width: "100%" }}>
      <TextInput
        label={label}
        placeholder={placeholder}
        mode="flat"
        keyboardType={keyboardType}
        style={{ width: "100%" }}
        left={icon && <TextInput.Icon icon={icon} />}
        right={
          secureTextEntry && (
            <TextInput.Icon
              onPress={() => {
                setShown(!shown);
              }}
              icon={shown ? "eye-off" : "eye"}
            />
          )
        }
        secureTextEntry={!shown}
        value={value}
        onChangeText={onChangeText}
        error={!!error}
      />
      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
    </View>
  );
};

export default StringInput;
