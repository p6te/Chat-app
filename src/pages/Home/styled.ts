import styled from "styled-components";
import { device } from "~/styles/breakpoints";

export const Container = styled("div")`
  display: flex;
  height: 85vh;
  min-width: 70vw;
  max-width: 70vw;
  border-radius: 40px;
  @media ${device.tablet} {
    height: 90vh;
    min-width: 90vw;
    max-width: 90vw;
  }
  @media ${device.mobile} {
    min-height: 100vh;
    min-width: 100vw;
    max-width: 100vw;
    border-radius: 0;
  }
`;
