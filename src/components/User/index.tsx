import { MouseEventHandler } from "react";
import "./styles.scss";

type Props = {
  imgSrc?: string;
  name?: string;
  lastMessage?: string;
  timestamp: number;
  isSelected: boolean;
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
  const currentDay = new Date();
  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const lastMessageDate =
    date.toDateString() === currentDay.toDateString()
      ? `${hours}:${minutes}`
      : `${day}-${month}-${year}`;
  return (
    <div className={`user ${isSelected && "selected"}`} onClick={onClick}>
      <img src={imgSrc} alt="" />
      <div className="userInfo">
        <span>{name}</span>
        {lastMessage ? (
          <>
            <p>{lastMessage}</p>
            <time>{lastMessageDate}</time>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default User;
