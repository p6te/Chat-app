import styled from "styled-components";
import { device } from "~/styles/breakpoints";

export const Container = styled("div")`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 40px;
  max-width: 500px;
  width: 80vw;
  @media ${device.mobile} {
    max-width: fit-content;
    width: 100vw;
  }

  h1 {
    color: ${({ theme }) => theme.primary};
    text-align: center;
  }
  h3 {
    color: ${({ theme }) => theme.primary};
    font-size: 1.4rem;
    font-weight: 400;
    text-align: center;
    @media ${device.tablet} {
      font-size: 1.2rem;
    }
  }

  p {
    margin-top: 12px;
    text-align: center;
  }
`;
