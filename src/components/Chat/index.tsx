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
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};
export default function Chat({ setIsSearchOpen, setIsLoading }: Props) {
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
        </TopSection>
        <Messages setIsLoading={setIsLoading} />
        <Input />
      </>
    </ChatContainer>
  );
}
