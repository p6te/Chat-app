import styled from "styled-components";

export const ChatsContainer = styled("div")`
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
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
`;
