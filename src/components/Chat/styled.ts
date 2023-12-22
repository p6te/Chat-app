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
`;

export const TopSection = styled.div`
  box-shadow: 0px 25px 20px -27px rgba(66, 68, 90, 0.232);
  div {
    display: flex;
    align-items: center;
    margin: 0.5rem 2rem;
    gap: 1rem;
  }
`;

export const AvatarImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: fill;
`;
