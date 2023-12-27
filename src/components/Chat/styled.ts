import styled from "styled-components";

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
  margin: 8px 0;
  box-shadow: 0px 10px 16px -16px rgba(66, 68, 90, 0.434);

  div {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export const AvatarImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: fill;
`;
