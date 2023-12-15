import styled from "styled-components";

export const Container = styled("div")`
  display: flex;
  justify-content: center;
  flex-direction: column;

  h1 {
    color: ${({ theme }) => theme.primary};
    text-align: center;
  }
  h3 {
    color: ${({ theme }) => theme.textPrimary};
    margin: 12px 0;
    font-size: 1.4rem;
    font-weight: 400;
  }

  p {
    margin-top: 12px;
    text-align: center;
  }
`;
