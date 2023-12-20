import "./styles.scss";
import { formatDate } from "../../../utils/formatDate";

type Props = {
  imgSrc: string;
  name: string;
  lastMessage?: string;
  timestamp?: number;
  isSelected?: boolean;
  isOnline?: boolean;
};
const User: React.FC<Props> = ({
  imgSrc,
  name,
  lastMessage,
  timestamp,
  isSelected,
  isOnline,
}: Props) => {
  return (
    <div className={`user ${isSelected && "selected"}`}>
      <div className="imgContainer">
        <img src={imgSrc} alt="" />
        {isOnline && <div className="onlineIcon"></div>}
      </div>
      <div className="userInfo">
        <span>{name}</span>
        {lastMessage && timestamp ? (
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
