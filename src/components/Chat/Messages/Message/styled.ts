import styled, { css } from "styled-components";
export interface Props {
  isOwner?: boolean;
}

export const MessageContainer = styled("div").withConfig({
  shouldForwardProp: (prop) => !["isOwner"].includes(prop),
})<Props>`
  margin-top: 0.5rem;
  display: flex;
  gap: 20px;
  padding: 0 1rem;
  ${({ isOwner }) =>
    isOwner &&
    css`
      flex-direction: row-reverse;
    `}
`;

export const MessageInfo = styled.div`
  display: flex;
  flex-direction: column;
  span {
    color: ${({ theme }) => theme.secondary};
  }
`;

export const AvatarImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const MessageContent = styled("div").withConfig({
  shouldForwardProp: (prop) => !["isOwner"].includes(prop),
})<Props>`
  max-width: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;

  p {
    background-color: ${({ theme }) => theme.tertiary};
    padding: 10px 20px;
    border-radius: 0px 10px 10px 10px;
    max-width: max-content;
  }

  ${({ isOwner }) =>
    isOwner &&
    css`
      flex-direction: row-reverse;

      p {
        background-color: ${({ theme }) => theme.primaryLight};
        color: ${({ theme }) => theme.textSecondary};
        border-radius: 10px 0px 10px 10px;
      }
    `}
`;

export const ImageMessageContainer = styled.div`
  height: 150px;
  width: 150px;
  max-width: 150px;
  max-height: 150px;

  border-radius: 1rem;

  box-shadow: 0px 0px 22px -14px rgba(66, 68, 90, 0.471);
  display: flex;
  justify-content: center;
  img {
    object-fit: contain;

    max-width: 150px;
    max-height: 150px;
    flex: 1;
  }
`;
