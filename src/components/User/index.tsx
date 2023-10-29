import { MouseEventHandler } from "react";
import "./styles.scss";

type Props = {
  imgSrc?: string;
  name?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
};
const User: React.FC<Props> = ({ imgSrc, name, onClick }: Props) => {
  return (
    <div className="user" onClick={onClick}>
      <img src={imgSrc} alt="" />
      <div className="userInfo">
        <span>{name}</span>
        <p>hello</p>
      </div>
    </div>
  );
};

export default User;
