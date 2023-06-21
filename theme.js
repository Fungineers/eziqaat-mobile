import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  roundness: 1,
  colors: {
    ...DefaultTheme.colors,
    primary: "#27ae60",
    primaryContainer: "#1e8e51",
    secondary: "#69db9e",
    secondaryContainer: "#5ac68c",
    tertiary: "#b5f0d9",
    tertiaryContainer: "#a8e9cc",
    surface: "#ffffff",
    surfaceVariant: "#ffffff",
    surfaceDisabled: "#f0f0f0",
    background: "#fff",
    error: "#ff3b30",
    errorContainer: "#e6352b",
    onPrimary: "#ffffff",
    onPrimaryContainer: "#ffffff",
    onSurfaceDisabled: "#757575",
    onError: "#ffffff",
    onErrorContainer: "#ffffff",
    outline: "#27ae60",
    outlineVariant: "#1e8e51",
    inverseOnSurface: "#ffffff",
    inversePrimary: "#ffffff",
  },
};

export default theme;
