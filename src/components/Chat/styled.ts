import styled from "styled-components";
import { device } from "~/styles/breakpoints";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 40px;
  position: relative;
`;

export const ChatMissing = styled.div`
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  background-color: rgba(66, 68, 90, 0.232);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 40px;
`;

export const TopSection = styled.div`
  min-height: 50px;
  padding: 12px 0;
  margin: 8px 0;
  box-shadow: 0px 10px 16px -16px rgba(66, 68, 90, 0.299);
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  button {
    margin-right: 1rem;
  }
`;

export const AvatarImage = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  object-fit: fill;
  @media ${device.tablet} {
    width: 36px;
    height: 36px;
  }
`;

export const MenuButton = styled.button`
  margin-left: auto;
  margin-right: 1rem;
  background: ${({ theme }) => theme.backgroundSecondary};
  padding: 8px;
  border-radius: 50%;
  outline: none;
  border: none;
`;
