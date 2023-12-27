import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Message from "./Message";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "~/firebaseConfig";
import { ChatContext } from "~/context/ChatContext";
import { MessagesContainer } from "./styled";
import { MessageType } from "~/types";
import { formatDate } from "~/utils/formatDate";

type Props = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export default function Messages({ setIsLoading }: Props) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { state } = useContext(ChatContext);

  useEffect(() => {
    if (!state.chatId) {
      return;
    }

    try {
      setIsLoading(true);
      onSnapshot(doc(db, "chats", state.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [state.chatId, setIsLoading]);

  return (
    <MessagesContainer>
      {messages.map((message, i) => {
        if (
          i === 0 ||
          message.date.seconds - messages[i - 1].date.seconds > 120
        ) {
          return (
            <div key={i}>
              <span>{formatDate(message.date?.seconds)}</span>
              <Message message={message} withAvatar />
            </div>
          );
        }
        if (i > 0 && message.senderId !== messages[i - 1].senderId) {
          return (
            <div key={i}>
              <Message message={message} withAvatar />
            </div>
          );
        }

        return <Message message={message} key={i} />;
      })}
    </MessagesContainer>
  );
}
