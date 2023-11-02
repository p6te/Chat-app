import "./styles.scss";
import { v4 as uuid } from "uuid";
import { useContext, useEffect, useMemo, useState } from "react";
import { Timestamp, doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebaseConfig";
import User from "../User";
import { ChatContext } from "../../context/ChatContext";
import { changeUser } from "../../context/actionCreators";

export default function Chats() {
  const [isLoading, setIsLoading] = useState(false);
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
  const { dispatch, state } = useContext(ChatContext);

  const sortedChats = useMemo(() => {
    return chats.sort((a, b) => {
      if (b[1].date?.seconds && a[1].date?.seconds) {
        return b[1].date?.seconds - a[1].date?.seconds;
      } else if (b[1].date?.seconds) {
        return -1;
      } else if (a[1].date?.seconds) {
        return 1;
      }
      return 0;
    });
  }, [chats]);

  const handleSelect = (user: {
    uid: string;
    displayName: string;
    photoURL: string;
  }) => {
    dispatch(changeUser(user));
    console.warn(state.user);
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const getChats = () => {
      setIsLoading(true);
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        const data = doc.data();
        if (!data) {
          return;
        }

        setChats(Object.entries(data));
        const firstSortedChats = Object.entries(data).sort((a, b) => {
          if (b[1].date?.seconds && a[1].date?.seconds) {
            return b[1].date?.seconds - a[1].date?.seconds;
          } else if (b[1].date?.seconds) {
            return -1;
          } else if (a[1].date?.seconds) {
            return 1;
          }
          return 0;
        });
        const latestUser = firstSortedChats[0][1]?.userInfo;
        handleSelect(latestUser);

        if (sortedChats.length && sortedChats[0]) {
          handleSelect(sortedChats[0][1]?.userInfo);
        }
        setIsLoading(false);
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
    // eslint-disable-next-line
  }, [currentUser?.uid, currentUser]);

  return (
    <div className="chats">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="userChat">
          <div className="userChatInfo">
            {sortedChats.map((chat) => {
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
                    isSelected={
                      chat[1].userInfo.uid === state.user.uid ? true : false
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
