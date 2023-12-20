import styled, { css } from "styled-components";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  outline?: boolean;
  shrink?: boolean;
}

export const Button = styled("button").withConfig({
  shouldForwardProp: (prop) => !["outline", "shrink"].includes(prop),
})<ButtonProps>`
  display: flex;
  text-align: center;
  align-self: center;
  justify-content: center;
  font-size: 1.2rem;
  padding: 10px 20px;
  border-radius: 1rem;
  outline: none;
  border: none;
  color: ${({ theme }) => theme.textSecondary};
  background-color: ${({ theme }) => theme.primaryLight};
  width: ${({ shrink }) => (shrink ? "auto" : "100%")};
  min-height: 3rem;
  word-wrap: break-word;

  &:hover {
    background-color: ${({ theme }) => theme.primary};
    cursor: pointer;
    transition: background-color 0.2s;
  }

  ${({ outline }) =>
    !!outline &&
    css`
      background-color: transparent;
      color: ${({ theme }) => theme.primaryLight};
      border: ${({ theme }) => css`1px solid ${theme.primaryLight}`};
      &:hover {
        color: ${({ theme }) => theme.primary};
        border: ${({ theme }) => css`1px solid ${theme.primary}`};
        background-color: transparent;
      }
    `}
`;
