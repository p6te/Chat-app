import styled from "styled-components";

export const FooterContainer = styled("div")`
  display: flex;
  flex-direction: column;
  flex-grow: 0;

  padding-top: 1rem;
  margin-bottom: 0.5rem;
  box-shadow: 0px -10px 16px -16px rgba(66, 68, 90, 0.299);

  & div {
    margin: 0 1rem;
  }
`;

export const LogoutButton = styled("button")`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  outline: none;
  border: none;
  font-size: 1rem;
  width: min-content;
  padding: 0.5rem;
  border-radius: 1rem;
  color: ${({ theme }) => theme.primary};
  svg {
    transform: translateY(2px);
  }

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.backgroundSecondary};
    transition: 0.2s;
  }
`;
