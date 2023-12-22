import styled from "styled-components";

export const SidebarContainer = styled("div")`
  display: flex;
  flex-direction: column;
  z-index: 1;
  min-width: 260px;
  max-width: 260px;
  padding: 0.5rem 0;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.backgroundPrimary};
  filter: drop-shadow(12px 7px 12px #00000033);
`;
