import styled from "styled-components";

export const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${({ theme }) => theme.primaryLight};
  }
`;
