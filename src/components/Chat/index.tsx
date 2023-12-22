import Messages from "./Messages";
import Input from "./ChatInput";
import { Dispatch, SetStateAction, useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AvatarImage, ChatContainer, ChatMissing, TopSection } from "./styled";
import User from "../common/User";
import { Button } from "../common/Button/styled";
import { Flexbox } from "../common/Flexbox";

type Props = {
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
};
export default function Chat({ setIsSearchOpen }: Props) {
  const { state } = useContext(ChatContext);
  const { displayName, isOnline, photoURL } = state.user;
  return (
    <ChatContainer>
      {!state.chatId && (
        <ChatMissing>
          <Button shrink onClick={() => setIsSearchOpen(true)}>
            Find a user to start chatting
          </Button>
        </ChatMissing>
      )}

      <>
        <TopSection>
          {displayName && (
            <div>
              <AvatarImage src={photoURL} />
              <h3>{displayName}</h3>
            </div>
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
