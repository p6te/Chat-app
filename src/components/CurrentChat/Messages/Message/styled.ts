import styled, { css } from "styled-components";
import { device } from "~/styles/breakpoints";
export interface Props {
  isOwner?: boolean;
  withAvatar?: boolean;
}

export const MessageContainer = styled("div").withConfig({
  shouldForwardProp: (prop) => !["isOwner"].includes(prop),
})<Props>`
  display: flex;
  gap: 6px;
  padding: 0 1rem;
  margin-bottom: 4px;
  ${({ isOwner }) =>
    isOwner &&
    css`
      flex-direction: row-reverse;
    `}
`;

export const MessageInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const AvatarImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  @media ${device.tablet} {
    width: 30px;
    height: 30px;
  }
`;

export const EmptyBox = styled.div`
  width: 40px;
  height: 40px;
  @media ${device.tablet} {
    width: 30px;
    height: 30px;
  }
`;

export const MessageContent = styled("div").withConfig({
  shouldForwardProp: (prop) => !["isOwner", "withAvatar"].includes(prop),
})<Props>`
  max-width: 80%;
  display: flex;
  flex-direction: column;

  p {
    background-color: ${({ theme }) => theme.secondary};
    padding: 10px 20px;
    border-radius: ${({ withAvatar }) =>
      withAvatar ? `10px 10px 10px 0px` : `0px 10px 10px 10px`};
    max-width: max-content;
    @media ${device.tablet} {
      padding: 6px 12px;
      font-size: 14px;
    }
  }

  ${({ isOwner, withAvatar }) =>
    isOwner &&
    css`
      flex-direction: row-reverse;

      p {
        background-color: ${({ theme }) => theme.primaryLight};
        color: ${({ theme }) => theme.textSecondary};
        border-radius: ${withAvatar
          ? "10px 10px 0px 10px"
          : "10px 0px 10px 10px"};
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
  @media ${device.tablet} {
    height: 70px;
    width: 70px;
    max-width: 70px;
    max-height: 70px;
    border-radius: 0.5rem;
  }
  img {
    object-fit: contain;
    max-width: 150px;
    max-height: 150px;
    flex: 1;
    @media ${device.tablet} {
      height: 70px;
      width: 70px;
      max-width: 70px;
      max-height: 70px;
      border-radius: 0.5rem;
    }
  }
`;
