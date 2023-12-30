import styled, { css } from "styled-components";
import { device } from "~/styles/breakpoints";

export interface ContainerProps {
  isSelected?: boolean;
  isOnline?: boolean;
}

export const UserContainer = styled("div").withConfig({
  shouldForwardProp: (prop) => !["isSelected", "isOnline"].includes(prop),
})<ContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: white;
  cursor: pointer;
  padding: 4px;
  margin: 0 0.5rem;
  border-radius: 1rem;
  transition: background-color 0.2s;
  margin: 0.5rem;
  &:hover {
    background-color: ${({ theme }) => theme.backgroundSecondary};
  }
  ${({ isSelected }) =>
    isSelected &&
    css`
      background-color: ${({ theme }) => theme.backgroundSecondary};
    `}
  ${({ isOnline }) =>
    isOnline &&
    css`
      .isOnline {
        position: absolute;
        bottom: 24px;
        left: 48px;
        border-radius: 50%;
        width: 16px;
        height: 16px;
        padding: 2px;
        border: 2px solid white;
        background-color: greenyellow;
      }
    `}
`;

export const AvatarImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: fill;
  @media ${device.tablet} {
    width: 40px;
    height: 40px;
  }
`;

export interface ContainerProps {
  onlyUsername?: boolean;
}

export const UserInfo = styled("div").withConfig({
  shouldForwardProp: (prop) => !["onlyUsername"].includes(prop),
})<ContainerProps>`
  height: 75px;
  margin-left: 1rem;
  max-width: 80%;

  span {
    font-size: 1.1rem;
    font-weight: bold;
    @media ${device.tablet} {
      font-size: 0.8rem;
    }
  }
  p {
    font-size: 1rem;
    color: lightgray;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 80%;
    @media ${device.tablet} {
      font-size: 0.8rem;
    }
  }
  time {
    font-size: 0.6rem;
    color: lightgray;
    @media ${device.tablet} {
      font-size: 0.5rem;
    }
  }
  ${({ onlyUsername }) =>
    onlyUsername &&
    css`
      height: 50px;
      display: flex;
      justify-content: center;

      flex-direction: column;
    `}
`;
