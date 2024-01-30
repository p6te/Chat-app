import React from "react";
import { MockUser } from "~/mockUsersData";
import { Container } from "./styled";

interface Props {
  onClick: () => void;
  key?: React.Key | null;
  user: MockUser;
}
const TestUserCard = ({ onClick, key, user }: Props) => {
  return (
    <Container key={key} onClick={onClick}>
      <h4>{user.nickname}</h4>
      <div>
        <div>email: {user.email}</div>
        <div>password: {user.password}</div>
      </div>
    </Container>
  );
};

export default TestUserCard;
