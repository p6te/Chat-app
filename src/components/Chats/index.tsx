import "./styles.scss";
import { v4 as uuid } from "uuid";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebaseConfig";
import User from "../User";
import { ChatContext } from "../../context/ChatContext";
import { changeUser } from "../../context/actionCreators";

export default function Chats() {
  const [chats, setChats] = useState<
    [
      string,
      {
        date: Timestamp;
        lastMessage: { text: string };
        userInfo: {
          uid: string;
          photoURL: string;
          displayName: string;
        };
      }
    ][]
  >([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        const data = doc.data();
        if (data) {
          setChats(Object.entries(data));
        }
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser?.uid, currentUser]);

  const handleSelect = (user: {
    uid: string;
    displayName: string;
    photoURL: string;
  }) => {
    dispatch(changeUser(user));
  };

  return (
    <div className="chats">
      <div className="userChat">
        <div className="userChatInfo">
          {chats &&
            chats
              .sort((a, b) => {
                if (b[1].date?.seconds && a[1].date?.seconds) {
                  return b[1].date?.seconds - a[1].date?.seconds;
                } else if (b[1].date?.seconds) {
                  return -1;
                } else if (a[1].date?.seconds) {
                  return 1;
                }
                return 0;
              })
              .map((chat) => {
                return (
                  <div
                    onClick={() => handleSelect(chat[1].userInfo)}
                    key={uuid()}
                  >
                    <User
                      name={chat[1].userInfo?.displayName}
                      imgSrc={chat[1].userInfo?.photoURL}
                      lastMessage={chat[1].lastMessage?.text}
                      timestamp={
                        chat[1].date?.seconds ? chat[1].date?.seconds : 0
                      }
                    />
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
