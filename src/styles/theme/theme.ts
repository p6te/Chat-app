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
  darkRed = "darkRed",
  green = "green",
  red = "red",
  purple = "purple",
  yellow = "yellow",
  test1 = "test1",
  test2 = "test2",
  test3 = "test3",
}

export const THEMES: Record<ThemeType, Theme> = {
  light: {
    primary: "#2676ff",
    primaryLight: "#639dff",
    secondary: "#b6e3ff",
    tertiary: "#b3b3b3",
    backgroundPrimary: "#FFFFFF",
    backgroundSecondary: "#e9f0ff84",
    textPrimary: "#292929",
    textSecondary: "#ffffff",
    backgroundGradient:
      "linear-gradient(30deg, rgba(191,187,255,1) 0%, rgba(192,245,255,1) 100%)",
    error: "#b50000",
  },
  darkRed: {
    primary: "#e74c3c",
    primaryLight: "#e74c3c",
    secondary: "#3498db",
    tertiary: "#7f8c8d",
    backgroundPrimary: "#2c3e50",
    backgroundSecondary: "#34495e",
    textPrimary: "#ffffff",
    textSecondary: "#ffffff",
    backgroundGradient:
      "linear-gradient(27deg, rgba(30,37,115,1) 3%, rgba(170,17,17,1) 100%)",
    error: "#c0392b",
  },
  green: {
    primary: "#4CAF50",
    primaryLight: "#81C784",
    secondary: "#FFEB3B",
    tertiary: "#9d9d9d",
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
    secondary: "#9b958b",
    tertiary: "#bbbbbb",
    backgroundPrimary: "#FAFAFA",
    backgroundSecondary: "#eee7fb",
    textPrimary: "#333333",
    textSecondary: "#FFFFFF",
    backgroundGradient: "linear-gradient(30deg, #9C27B0 0%, #E1BEE7 100%)",
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
  test1: {
    primary: "#9b59b6",
    primaryLight: "#af7ac5",
    secondary: "#f1c40f",
    tertiary: "#95a5a6",
    backgroundPrimary: "#2c3e50",
    backgroundSecondary: "#34495e",
    textPrimary: "#ffffff",
    textSecondary: "#bdc3c7",
    backgroundGradient: "linear-gradient(90deg, #9b59b6 0%, #af7ac5 100%)",
    error: "#e74c3c",
  },
  test2: {
    primary: "#2980b9",
    primaryLight: "#3498db",
    secondary: "#d35400",
    tertiary: "#7f8c8d",
    backgroundPrimary: "#34495e",
    backgroundSecondary: "#2c3e50",
    textPrimary: "#ffffff",
    textSecondary: "#bdc3c7",
    backgroundGradient: "linear-gradient(90deg, #2980b9 0%, #3498db 100%)",
    error: "#c0392b",
  },
  test3: {
    primary: "#1abc9c",
    primaryLight: "#16a085",
    secondary: "#f39c12",
    tertiary: "#95a5a6",
    backgroundPrimary: "#2c3e50",
    backgroundSecondary: "#34495e",
    textPrimary: "#ffffff",
    textSecondary: "#bdc3c7",
    backgroundGradient: "linear-gradient(90deg, #1abc9c 0%, #16a085 100%)",
    error: "#e74c3c",
  },
};

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
