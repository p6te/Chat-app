import styled from "styled-components";

export const SearchInputContainer = styled.div`
  margin: 1rem 1.5rem;
  display: flex;
  gap: 0.5rem;
  position: relative;
`;

export const SendOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  label {
    transition: 0.2s;
    padding: 8px;
    border-radius: 50%;

    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
`;

export const EmojiPickerContainer = styled.div`
  position: absolute;
  top: -354px;
  right: 0;
`;

export const EmojiButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 50%;

  svg {
    transition: 0.2s;
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
`;

export const SendButton = styled(EmojiButton)`
  background-color: ${({ theme }) => theme.tertiary};
`;
