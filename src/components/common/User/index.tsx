import { formatDate } from "~/utils/formatDate";
import { AvatarImage, UserContainer, UserInfo } from "./styled";

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
    <UserContainer isOnline={isOnline} isSelected={isSelected}>
      <div className="isOnline"></div>

      <AvatarImage src={imgSrc} alt="" />

      <UserInfo onlyUsername={!lastMessage && !timestamp}>
        <span>{name}</span>
        {lastMessage && timestamp ? (
          <>
            <p>{lastMessage}</p>
            <time>{formatDate(timestamp)}</time>
          </>
        ) : null}
      </UserInfo>
    </UserContainer>
  );
};

export default User;
