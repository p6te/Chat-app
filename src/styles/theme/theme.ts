import {} from "styled-components";

export type Theme = {
  primary: string;
  secondary: string;
  tertiary: string;
  background: string;
  textPrimary: string;
  textSecondary: string;
};

export enum ThemeType {
  light = "light",
  dark = "dark",
}

const theme = ThemeType.light;

export const THEMES: Record<ThemeType, Theme> = {
  light: {
    primary: "#A9927D",
    secondary: "#5E503F",
    tertiary: "#22333B",
    background: "#F2F4F3",
    textPrimary: "#FFFFFF",
    textSecondary: "#123543",
  },
  dark: {
    primary: "#22333B",
    secondary: "#5E503F",
    tertiary: "#A9927D",
    background: "#3A3A39",
    textPrimary: "#FFFFFF",
    textSecondary: "#123543",
  },
};

export default theme;

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
