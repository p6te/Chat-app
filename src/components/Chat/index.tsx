import Messages from "./Messages";
import Input from "./ChatInput";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { ChatContainer, ChatMissing, TopSection } from "./styled";
import User from "../common/User";

export default function Chat() {
  const { state } = useContext(ChatContext);
  const { displayName, isOnline, photoURL } = state.user;
  return (
    <ChatContainer>
      {/* {!state.chatId && (
        <ChatMissing>
          <h3>Please open a new chat... </h3>
        </ChatMissing>
      )} */}

      <>
        <TopSection>
          <span>{state.user.displayName}</span>
          <span>Nazwa uzytkownika</span>
          {displayName && (
            <User name={displayName} imgSrc={photoURL} isOnline={isOnline} />
          )}
          {/* TODO add additional functionality  */}
          {/* <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div> */}
        </TopSection>
        <Messages />
        <Input />
      </>
    </ChatContainer>
  );
}
