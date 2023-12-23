import { THEMES, ThemeType } from "~/styles/theme/theme";
import { ThemeButton, ThemeCircle, ThemeContainer } from "./styled";
import { useTheme } from "~/styles/theme/themeContext";

export default function ChoseTheme() {
  const themeKeys = Object.entries(THEMES);
  const { setCurrentTheme } = useTheme();

  const handleThemeChange = (selectedTheme: ThemeType) => {
    setCurrentTheme(selectedTheme);
  };

  return (
    <>
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
