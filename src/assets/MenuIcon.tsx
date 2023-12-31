import { useContext } from "react";
import { ThemeContext } from "~/styles/theme/themeContext";

type Props = {
  color?: string;
  size?: number;
};

export default function MenuIcon({ color, size }: Props) {
  const { theme } = useContext(ThemeContext);

  const width = size ? size : "24";
  const height = size ? size : "24";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 18L20 18"
        stroke={color ? color : theme.primary}
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M4 12L20 12"
        stroke={color ? color : theme.primary}
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M4 6L20 6"
        stroke={color ? color : theme.primary}
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
}
