import React, { Dispatch, SetStateAction } from "react";
import { THEMES, Theme, ThemeType } from "./theme";

interface ThemeContextProps {
  themeType: ThemeType;
  theme: Theme;
  setCurrentTheme: Dispatch<SetStateAction<ThemeType>>;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  themeType: ThemeType.light,
  theme: THEMES.light,
  setCurrentTheme: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContextProvider = ({ children }: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = React.useState<ThemeType>(
    ThemeType.light
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
