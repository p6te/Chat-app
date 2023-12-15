import "./styles.scss";
import Messages from "./Messages";
import Input from "./ChatInput";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

export default function Chat() {
  const { state } = useContext(ChatContext);

  return (
    <div className="chat">
      {!state.chatId && (
        <div className="chatMissing">
          <h3>Please open a new chat... </h3>
        </div>
      )}

      <>
        <div className="chatInfo">
          <span>{state.user.displayName}</span>
          {/* TODO add additional functionality  */}
          {/* <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div> */}
        </div>
        <Messages />
        <Input />
      </>
    </div>
  );
}
