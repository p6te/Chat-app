import Messages from "./Messages";
import Input from "./ChatInput";
import { Dispatch, SetStateAction, useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import {
  AvatarImage,
  ChatContainer,
  ChatMissing,
  MenuButton,
  TopSection,
} from "./styled";
import { Button } from "../common/Button/styled";
import useIsMobile from "~/hooks/useIsMobile";
import MenuIcon from "~/assets/MenuIcon";

type Props = {
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};
export default function Chat({
  setIsSearchOpen,
  setIsLoading,
  setIsSidebarOpen,
}: Props) {
  const { state } = useContext(ChatContext);
  const { displayName, photoURL } = state.user;
  const isMobile = useIsMobile();

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
          {isMobile && (
            <MenuButton onClick={() => setIsSidebarOpen(true)}>
              <MenuIcon />
            </MenuButton>
          )}
        </TopSection>
        <Messages setIsLoading={setIsLoading} />
        <Input />
      </>
    </ChatContainer>
  );
}
