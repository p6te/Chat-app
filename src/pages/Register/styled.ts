import styled from "styled-components";

import ImageIcon from "~/assets/ImageIcon";

export const StyledImgIcon = styled(ImageIcon)`
  width: 20px;
  height: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export const AddImageContainer = styled("div")`
  background-color: ${({ theme }) => theme.backgroundSecondary};
  display: flex;
  align-items: center;
  padding: 4px 16px;
  margin-top: 0.5rem;
  border-radius: 1rem;
  &:hover {
    cursor: pointer;
  }
  span {
    margin-left: 1rem;
  }
`;
