import styled from "styled-components";

export const NavbarContainer = styled.div`
  display: flex;
  align-items: center;

  padding-left: 10px;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.secondary};
  img {
    background-color: white;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin: 10px;
  }
`;

export const CredentialsContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0 1rem;

  h4 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export const ImageContainer = styled.div`
  position: relative;

  &:hover {
    cursor: pointer;

    svg {
      transform: scale(1.2);
    }
  }

  svg {
    position: absolute;
    bottom: 5px;
    right: 0px;
    transition: 0.2s;
  }
`;
