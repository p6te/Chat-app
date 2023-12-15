import { ReactNode } from "react";
import styled, { css } from "styled-components";

export interface FlexProps {
  center?: boolean;
  spaceBetween?: boolean;
  flxEnd?: boolean;
  gap?: string;
  column?: boolean;
  children: ReactNode;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  ${({ center }) =>
    center &&
    css`
      justify-content: center;
      align-items: center;
    `}
  ${({ spaceBetween }) =>
    spaceBetween &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${({ flxEnd }) =>
    flxEnd &&
    css`
      justify-content: flex-end;
      align-items: center;
    `}
  ${({ gap }) =>
    gap &&
    css`
      gap: ${gap};
    `}
    ${({ column }) =>
    column &&
    css`
      flex-direction: column;
    `}
`;
