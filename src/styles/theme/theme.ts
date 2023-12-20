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
    primary: "#22333B",
    primaryLight: "#639dff",
    secondary: "#5E503F",
    tertiary: "#A9927D",
    backgroundPrimary: "#F2F4F3",
    backgroundSecondary: "#F254F3",
    textPrimary: "#FFFFFF",
    textSecondary: "#123543",
    backgroundGradient:
      "linear-gradient(90deg, rgba(191,187,255,1) 0%, rgba(192,245,255,1) 100%)",
    error: "#b50000",
  },
};

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
