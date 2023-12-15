import { useContext, useEffect, useRef } from "react";
import "./styles.scss";
import { AuthContext } from "../../../../context/AuthContext";
import { ChatContext } from "../../../../context/ChatContext";
import { MessageType } from "../../../../types";
import { formatDate } from "../../../../utils/formatDate";
type Props = {
  message: MessageType;
};

export default function Message({ message }: Props) {
  const { loggedUser } = useContext(AuthContext);
  const { state } = useContext(ChatContext);

  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === loggedUser?.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === loggedUser?.uid && loggedUser?.photoURL
              ? loggedUser?.photoURL
              : state.user.photoURL
          }
          alt=""
        />
        <span>{formatDate(message.date?.seconds)}</span>
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message?.img && <img src={message?.img} alt="" />}
      </div>
    </div>
  );
}
