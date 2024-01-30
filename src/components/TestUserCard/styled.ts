import styled from "styled-components";

export const Container = styled("div")`
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1;
  padding: 10px 30px;
  border: 1px solid ${({ theme }) => theme.backgroundSecondary};
  border-radius: 16px;
  margin-bottom: 1rem;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.backgroundSecondary};
  }
`;
