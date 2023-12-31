import styled from "styled-components";

export const ThemeContainer = styled("div")`
  min-height: 50px;
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color: string;
}

export const ThemeCircle = styled("button").withConfig({
  shouldForwardProp: (prop) => !["color"].includes(prop),
})<Props>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ color }) => color};
  outline: none;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
