import styled from "styled-components";
import { device } from "~/styles/breakpoints";

export const ErrorContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;

  button {
    align-self: flex-end;
    background: transparent;
    border: none;
    opacity: 0.7;
    padding: 5px;
    border-radius: 50%;
    &:hover {
      cursor: pointer;
      background-color: lightgray;
    }
    img {
      width: 30px;
    }
  }
  img {
    width: 120px;
    opacity: 0.7;
  }
  @media ${device.mobile} {
  }
`;
