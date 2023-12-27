import styled from "styled-components";

export const SidebarContainer = styled("div")`
  display: flex;
  flex-direction: column;
  z-index: 1;
  min-width: 300px;
  max-width: 300px;
  padding: 0.5rem 0;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.backgroundPrimary};
  box-shadow: 10px 0px 30px -25px rgba(66, 68, 90, 1);
`;
