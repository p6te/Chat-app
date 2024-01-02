import React, { Dispatch, SetStateAction } from "react";
import { THEMES, Theme, ThemeType } from "./theme";

interface ThemeContextProps {
  themeType: ThemeType;
  theme: Theme;
  setCurrentTheme: Dispatch<SetStateAction<ThemeType>>;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  themeType: ThemeType.blue,
  theme: THEMES.blue,
  setCurrentTheme: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContextProvider = ({ children }: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = React.useState<ThemeType>(
    localStorage.getItem("theme")
      ? (localStorage.getItem("theme") as ThemeType)
      : ThemeType.blue
  );

  return (
    <ThemeContext.Provider
      value={{
        themeType: currentTheme,
        theme: THEMES[currentTheme],
        setCurrentTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
