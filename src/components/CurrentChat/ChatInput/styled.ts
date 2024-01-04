import styled from "styled-components";
import { device } from "~/styles/breakpoints";

export const SearchInputContainer = styled.div`
  margin: 1rem 1.5rem;
  display: flex;
  gap: 0.5rem;
  position: relative;
  @media ${device.tablet} {
    margin: 1rem;
    gap: 0;
  }
`;

export const SendOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  @media ${device.tablet} {
    gap: 0;
  }
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
  background-color: ${({ theme }) => theme.backgroundSecondary};
`;

export const AddedImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.backgroundSecondary};
  padding: 12px;
  border-radius: 1rem;

  div {
    svg:first-child {
      transition: 0.2s;
      &:hover {
        cursor: pointer;
        transform: scale(1.2);
      }
    }
  }
`;
