import styled from "styled-components";
import { device } from "~/styles/breakpoints";

export const Background = styled.div`
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  /* background-color: black; */
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(3px);
  -webkit-transition: 0.5s;
  overflow: auto;
  transition: all 0.3s linear;
`;

export const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.backgroundPrimary};
  width: 500px;
  border-radius: 40px;
  padding: 20px 30px;
  overflow: auto;
  @media ${device.mobile} {
    position: static;
    transform: none;
    min-height: 100vh;
    width: 100vw;
    max-width: 100vw;
    border-radius: 0;
  }
`;

export const CloseButton = styled.div`
  width: min-content;
  padding: 0.5rem;
  border-radius: 50%;
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.backgroundSecondary};
  }
`;
