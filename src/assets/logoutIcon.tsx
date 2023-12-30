import { useContext } from "react";
import { ThemeContext } from "~/styles/theme/themeContext";

interface Props {
  color?: string;
  size?: number;
}

export default function LogoutIcon({ color, size }: Props) {
  const { theme } = useContext(ThemeContext);

  const width = size ? size : "24";
  const height = size ? size : "24";
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 24 24`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke={color ? color : theme.primary}
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="matrix(-1 0 0 1 18 3)"
      >
        <path d="m10.595 10.5 2.905-3-2.905-3" />
        <path d="m13.5 7.5h-9" />
        <path d="m10.5.5-8 .00224609c-1.1043501.00087167-1.9994384.89621131-2 2.00056153v9.99438478c.0005616 1.1043502.8956499 1.9996898 2 2.0005615l8 .0022461" />
      </g>
    </svg>
  );
}
