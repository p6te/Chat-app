import "./styles.scss";
import User from "../User";

export default function Chats() {
  return (
    <div className="chats">
      <div className="userChat">
        <div className="userChatInfo">
          <User />
          <User />
        </div>
      </div>
    </div>
  );
}
