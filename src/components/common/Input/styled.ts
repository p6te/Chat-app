import styled, { css } from "styled-components";

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  isError?: boolean;
}

export const Container = styled.div`
  flex-grow: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledInput = styled.input<InputProps>`
  width: 100%;
  height: 3rem;
  padding: 0.6rem 1.2rem;
  border: ${({ theme }) => css`1px solid ${theme.tertiary}`};
  border-radius: 1rem;
  font-size: 1rem;
  outline-color: transparent;
  transition: box-shadow 0.3s;
  outline: none;
  ${({ isError, theme }) =>
    isError &&
    css`
      border: 1px solid ${theme.error};
    `};

  &:focus {
    border: ${({ theme }) => css`1px solid ${theme.primary}`};
  }

  &:not(:placeholder-shown) + span,
  &:focus + span {
    color: blue;
    transform: translateX(1rem) translateY(-22px);
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0 6px;
    background-color: ${({ theme }) => theme.backgroundPrimary};
  }

  &:not(:focus) + span {
    color: ${({ theme }) => theme.secondary};
  }
`;

export const Label = styled.span`
  position: absolute;
  left: 0;
  padding-left: 1.2rem;
  font-size: 1rem;
  color: #7f8fa6;
  pointer-events: none;
  transition: 0.3s;
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.error};
  font-size: 0.8rem;
  margin-left: 1rem;
`;
