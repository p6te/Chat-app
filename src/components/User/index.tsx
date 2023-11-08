import { MouseEventHandler } from "react";
import "./styles.scss";
import { formatDate } from "../../utils/formatDate";

type Props = {
  imgSrc?: string;
  name?: string;
  lastMessage?: string;
  timestamp: number;
  isSelected?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};
const User: React.FC<Props> = ({
  imgSrc,
  name,
  lastMessage,
  timestamp,
  isSelected,
  onClick,
}: Props) => {
  return (
    <div className={`user ${isSelected && "selected"}`} onClick={onClick}>
      <img src={imgSrc} alt="" />
      <div className="userInfo">
        <span>{name}</span>
        {lastMessage ? (
          <>
            <p>{lastMessage}</p>
            <time>{formatDate(timestamp)}</time>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default User;
