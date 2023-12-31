import styled from "styled-components";
import { device } from "~/styles/breakpoints";

export const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;

  &::-webkit-scrollbar-track {
    border-radius: 8px;
    background-color: ${({ theme }) => theme.backgroundPrimary};
  }

  &::-webkit-scrollbar {
    width: 8px;
    background-color: ${({ theme }) => theme.backgroundPrimary};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: ${({ theme }) => theme.primaryLight};
  }

  span {
    color: ${({ theme }) => theme.tertiary};
    display: table;
    margin: 0 auto;
    @media ${device.tablet} {
      font-size: 12px;
    }
  }
`;
