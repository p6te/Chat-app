import styled from "styled-components";

export const ChatsContainer = styled("div")`
  flex-grow: 1;
  overflow-y: scroll;
  &::-webkit-scrollbar-track {
    border-radius: 8px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 8px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: ${({ theme }) => theme.primaryLight};
  }
`;
