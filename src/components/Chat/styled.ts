import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  border-radius: 40px;
`;

export const ChatMissing = styled.div`
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TopSection = styled.div`
  box-shadow: 0px 25px 20px -27px rgba(66, 68, 90, 0.232);
`;
