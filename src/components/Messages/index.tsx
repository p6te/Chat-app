import { useContext, useEffect, useState } from "react";
import Message from "../Message";
import "./styles.scss";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "~/firebaseConfig";
import { ChatContext } from "~/context/ChatContext";

export default function Messages() {
  const [messages, setMessages] = useState<[]>([]);
  const { state } = useContext(ChatContext);

  useEffect(() => {
    if (!state.chatId) {
      return;
    }
    try {
      onSnapshot(doc(db, "chats", state.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
    } catch (error) {
      console.log(error);
    }
  }, [state.chatId]);

  return (
    <div className="messages">
      {messages.map((message, i) => {
        return <Message message={message} key={i} />;
      })}
    </div>
  );
}
