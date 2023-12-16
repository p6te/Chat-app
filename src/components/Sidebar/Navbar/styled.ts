import styled from "styled-components";

export const NavbarContainer = styled("div")`
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.secondary};
  img {
    background-color: white;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
