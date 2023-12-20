import styled from "styled-components";

export const AddImageContainer = styled("div")`
  background-color: ${({ theme }) => theme.backgroundSecondary};
  display: flex;
  align-items: center;
  padding: 4px 16px;
  margin-top: 0.5rem;
  border-radius: 1rem;

  svg {
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
      transition: 0.2s;
    }
  }
  span {
    margin-left: 1rem;
  }
`;

export const AvatarContainer = styled("div")`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  position: relative;
  button {
    position: absolute;
    background-color: transparent;
    outline: none;
    border: none;
    left: 0;
    padding: 10px;
    border-radius: 50%;
    &:hover {
      background-color: ${({ theme }) => theme.backgroundSecondary};
      cursor: pointer;
      transition: 0.2s;
    }
  }
`;

export const Avatar = styled("img")`
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
  object-position: 50% 50%;
`;
