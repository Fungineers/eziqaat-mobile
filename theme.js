import { DefaultTheme } from "react-native-paper";

const colors = {
  primary: "#102770",
  primaryContainer: "#0d1c57",
  secondary: "#4286f4",
  secondaryContainer: "#3372e4",
  tertiary: "#82bfff",
  tertiaryContainer: "#6fabf7",
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
  outline: "#102770",
  outlineVariant: "#0d1c57",
  inverseOnSurface: "#ffffff",
  inversePrimary: "#ffffff",
};

const theme = {
  ...DefaultTheme,
  roundness: 1,
  colors: {
    ...DefaultTheme.colors,
    // ...colors,
  },
};

export default theme;
