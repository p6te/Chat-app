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
  blue = "blue",
  purple = "purple",
  darkBlue = "darkBlue",
  darkGreen = "darkGreen",
}

export const THEMES: Record<ThemeType, Theme> = {
  blue: {
    primary: "#2676ff",
    primaryLight: "#639dff",
    secondary: "#ebebeb",
    tertiary: "#b3b3b3",
    backgroundPrimary: "#FFFFFF",
    backgroundSecondary: "#e9f0ff84",
    textPrimary: "#292929",
    textSecondary: "#ffffff",
    backgroundGradient: "#bdd6ff",
    error: "#b50000",
  },

  purple: {
    primary: "#c337db",
    primaryLight: "#db7ceb",
    secondary: "#f6e5ff",
    tertiary: "#8d8d8d",
    backgroundPrimary: "#FAFAFA",
    backgroundSecondary: "#fbecfc",
    textPrimary: "#333333",
    textSecondary: "#FFFFFF",
    backgroundGradient: "#fbe5ff",
    error: "#D32F2F",
  },

  darkBlue: {
    primary: "#2980b9",
    primaryLight: "#45adf3",
    secondary: "#727272",
    tertiary: "#7f8c8d",
    backgroundPrimary: "#34495e",
    backgroundSecondary: "#2c3e50",
    textPrimary: "#ffffff",
    textSecondary: "#ffffff",
    backgroundGradient: "linear-gradient(90deg, #2980b9 0%, #3498db 100%)",
    error: "#c0392b",
  },
  darkGreen: {
    primary: "#0eb896",
    primaryLight: "#36caad",
    secondary: "#727272",
    tertiary: "#7f8c8d",
    backgroundPrimary: "#2c3e50",
    backgroundSecondary: "#34495e",
    textPrimary: "#ffffff",
    textSecondary: "#ffffff",
    backgroundGradient: "#405562",
    error: "#e74c3c",
  },
};

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
