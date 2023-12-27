import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { ChatContext } from "../../../../context/ChatContext";
import { MessageType } from "../../../../types";

import {
  AvatarImage,
  EmptyBox,
  ImageMessageContainer,
  MessageContainer,
  MessageContent,
  MessageInfo,
} from "./styled";
type Props = {
  message: MessageType;
  withAvatar?: boolean;
};

export default function Message({ message, withAvatar = false }: Props) {
  const { loggedUser } = useContext(AuthContext);
  const { state } = useContext(ChatContext);

  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      <MessageContainer
        ref={ref}
        className={`message ${message.senderId === loggedUser?.uid && "owner"}`}
        isOwner={message.senderId === loggedUser?.uid}
      >
        <MessageInfo>
          {withAvatar ? (
            <AvatarImage
              src={
                message.senderId === loggedUser?.uid && loggedUser?.photoURL
                  ? loggedUser?.photoURL
                  : state.user.photoURL
              }
              alt=""
            />
          ) : (
            <EmptyBox />
          )}
        </MessageInfo>
        <MessageContent
          isOwner={message.senderId === loggedUser?.uid}
          withAvatar={withAvatar}
        >
          {message.text && <p>{message.text}</p>}
          {message?.img && (
            <ImageMessageContainer>
              <img src={message?.img} alt="" />
            </ImageMessageContainer>
          )}
        </MessageContent>
      </MessageContainer>
    </>
  );
}
