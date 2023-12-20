import styled from "styled-components";
import { keyframes } from "styled-components";

export const Wrapper = styled.div`
  z-index: 100;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: aliceblue;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const rotator = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: ${187 / 4};
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }
`;

const colors = keyframes`
  0% {
    stroke: #026337;
  }
  25% {
    stroke: #c5dbcf;
  }
  50% {
    stroke: #003a63;
  }
  75% {
    stroke: #c75c35;
  }
  100% {
    stroke: #c7985c;
  }
`;

export const StyledCircle = styled("circle").attrs({
  fill: "none",
  strokeWidth: "6",
  strokeLinecap: "round",
  cx: "33",
  cy: "33",
  r: "30",
})`
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: ${dash} 1.4s ease-in-out infinite,
    ${colors} ${1.4 * 4}s ease-in-out infinite;
`;

export const StyledSpinner = styled.svg`
  animation: ${rotator} 1.4s linear infinite;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;
`;
