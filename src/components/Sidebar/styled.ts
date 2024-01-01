import styled from "styled-components";
import { device } from "~/styles/breakpoints";

export const SidebarContainer = styled("div")`
  display: flex;
  flex-direction: column;
  z-index: 1;
  min-width: 300px;
  max-width: 300px;
  padding: 0.5rem 0;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  background-color: ${({ theme }) => theme.backgroundPrimary};
  border-right: 1px solid ${({ theme }) => theme.secondary};
  @media ${device.tablet} {
    min-width: 200px;
    max-width: 200px;
  }
  @media ${device.mobile} {
    min-width: 100vw;
    max-width: 100vw;
    min-height: 100vh;
    padding: 0.5rem 0;
    border-radius: 0;
    background-color: ${({ theme }) => theme.backgroundPrimary};
    box-shadow: none;
  }
`;
