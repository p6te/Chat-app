import {} from "styled-components";

export type Theme = {
  primary: string;
  primaryLight: string;
  secondary: string;
  tertiary: string;
  backgroundPrimary: string;
  backgroundSecondary: string;
  textPrimary: string;
  textSecondary: string;
  backgroundGradient: string;
  error: string;
};

export enum ThemeType {
  light = "light",
  dark = "dark",
  green = "green",
  red = "red",
  purple = "purple",
  yellow = "yellow",
}

export const THEMES: Record<ThemeType, Theme> = {
  light: {
    primary: "#2676ff",
    primaryLight: "#639dff",
    secondary: "#9e9e9e",
    tertiary: "#f0f0f0",
    backgroundPrimary: "#FFFFFF",
    backgroundSecondary: "#edf3ff",
    textPrimary: "#292929",
    textSecondary: "#ffffff",
    backgroundGradient:
      "linear-gradient(90deg, rgba(191,187,255,1) 0%, rgba(192,245,255,1) 100%)",
    error: "#b50000",
  },
  dark: {
    primary: "#03DAC6",
    primaryLight: "#64FFDA",
    secondary: "#FF4081",
    tertiary: "#424242",
    backgroundPrimary: "#121212",
    backgroundSecondary: "#1F1F1F",
    textPrimary: "#FFFFFF",
    textSecondary: "#B0BEC5",
    backgroundGradient: "linear-gradient(90deg, #536DFE 0%, #64B5F6 100%)",
    error: "#FF5252",
  },
  green: {
    primary: "#4CAF50",
    primaryLight: "#81C784",
    secondary: "#FFEB3B",
    tertiary: "#E0E0E0",
    backgroundPrimary: "#FFFFFF",
    backgroundSecondary: "#E8F5E9",
    textPrimary: "#212121",
    textSecondary: "#FFFFFF",
    backgroundGradient: "linear-gradient(90deg, #4CAF50 0%, #81C784 100%)",
    error: "#FF5722",
  },
  purple: {
    primary: "#9C27B0",
    primaryLight: "#E1BEE7",
    secondary: "#FF9800",
    tertiary: "#9E9E9E",
    backgroundPrimary: "#FAFAFA",
    backgroundSecondary: "#D1C4E9",
    textPrimary: "#333333",
    textSecondary: "#FFFFFF",
    backgroundGradient: "linear-gradient(90deg, #9C27B0 0%, #E1BEE7 100%)",
    error: "#D32F2F",
  },
  yellow: {
    primary: "#FFC107",
    primaryLight: "#FFE082",
    secondary: "#03A9F4",
    tertiary: "#9E9E9E",
    backgroundPrimary: "#F5F5F5",
    backgroundSecondary: "#FFECB3",
    textPrimary: "#424242",
    textSecondary: "#FFFFFF",
    backgroundGradient: "linear-gradient(90deg, #FFC107 0%, #FFE082 100%)",
    error: "#F44336",
  },
  red: {
    primary: "#E91E63",
    primaryLight: "#F48FB1",
    secondary: "#8BC34A",
    tertiary: "#9E9E9E",
    backgroundPrimary: "#EEEEEE",
    backgroundSecondary: "#FFCDD2",
    textPrimary: "#212121",
    textSecondary: "#FFFFFF",
    backgroundGradient: "linear-gradient(90deg, #E91E63 0%, #F48FB1 100%)",
    error: "#FF5722",
  },
};

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
