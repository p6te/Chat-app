import styled from "styled-components";

export const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-bottom: 0.5rem;
  box-shadow: 0px 10px 16px -16px rgba(66, 68, 90, 0.299);
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

  div {
    background: ${({ theme }) => theme.primary};
    padding: 4px;
    border-radius: 50%;

    position: absolute;
    bottom: 0px;
    right: -4px;
    transition: 0.2s;
  }
  &:hover {
    cursor: pointer;

    div {
      transform: scale(1.2);
    }
  }
`;

export const Settings = styled.div`
  padding: 10px;
  border: 50%;
`;

export const ChatButton = styled.button`
  margin-left: auto;
  margin-right: 1rem;
  background: ${({ theme }) => theme.backgroundSecondary};
  padding: 8px;
  border-radius: 50%;
  outline: none;
  border: none;
`;
