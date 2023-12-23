import styled from "styled-components";

export const AddImageContainer = styled("div")`
  display: flex;
  align-items: center;
  padding: 4px 16px;
  margin-top: 0.5rem;
  border-radius: 1rem;

  label {
    transition: 0.2s;
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
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
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0px 0px 39px -18px rgba(66, 68, 90, 1);
`;
