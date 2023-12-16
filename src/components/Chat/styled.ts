import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  background-color: lightblue;
`;

export const ChatMissing = styled.div`
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  background-color: #6288a14a;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TopSection = styled.div`
  background-color: tomato;
`;
