import styled from "styled-components";

export const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  &::-webkit-scrollbar-track {
    border-radius: 8px;
    background-color: ${({ theme }) => theme.backgroundSecondary};
  }

  &::-webkit-scrollbar {
    width: 8px;
    background-color: ${({ theme }) => theme.backgroundSecondary};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: ${({ theme }) => theme.primaryLight};
  }
`;
