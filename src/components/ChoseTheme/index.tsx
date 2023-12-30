import { THEMES, ThemeType } from "~/styles/theme/theme";
import { ThemeCircle, ThemeContainer } from "./styled";
import Spacer from "../common/Spacer";
import { useContext } from "react";
import { ThemeContext } from "~/styles/theme/themeContext";

export default function ChoseTheme() {
  const themeKeys = Object.entries(THEMES);
  const { setCurrentTheme } = useContext(ThemeContext);

  const handleThemeChange = (selectedTheme: ThemeType) => {
    setCurrentTheme(selectedTheme);
  };

  return (
    <>
      <Spacer />
      <h3>Chose Theme</h3>
      <ThemeContainer>
        {themeKeys.map(([themeKey, theme]) => (
          <ThemeCircle
            color={theme.primary}
            key={themeKey}
            onClick={() => handleThemeChange(themeKey as ThemeType)}
          />
        ))}
      </ThemeContainer>
    </>
  );
}
