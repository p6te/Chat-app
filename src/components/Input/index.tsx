import "./styles.scss";
import Img from "../../assets/img.png";
import Cancel from "../../assets/cancel.png";
import Attach from "../../assets/attach.png";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db, storage } from "../../firebaseConfig";
import { MessageType } from "../../types";

export default function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState<File | null>(null);

  const { currentUser } = useContext(AuthContext);
  const { state } = useContext(ChatContext);

  const handleSend = async () => {
    if (!img && !text) {
      return;
    }
    if (img) {
      const storageRef = ref(storage, uuid());

      try {
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on("state_changed", () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const newMessage: MessageType = {
              id: uuid(),
              text,
              senderId: currentUser?.uid,
              date: Timestamp.now(),
              img: downloadURL,
            };

            await updateDoc(doc(db, "chats", state.chatId), {
              messages: arrayUnion(newMessage),
            });
          });
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      await updateDoc(doc(db, "chats", state.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser?.uid,
          date: Timestamp.now(),
        }),
      });
    }
    if (!currentUser?.uid) {
      return;
    }

    try {
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [state.chatId + ".lastMessage"]: {
          text,
        },
        [state.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", state.user.uid), {
        [state.chatId + ".lastMessage"]: {
          text,
        },
        [state.chatId + ".date"]: serverTimestamp(),
      });
    } catch (error) {
      console.error(error);
    }
    setText("");
    setImg(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImg(e.target.files[0]);
    }
  };
  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="inputMessage">
      <input
        className="inputMessage"
        type="text"
        placeholder="type..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => handleEnterKey(e)}
      />
      <div>
        {img && (
          <div className="imageLoaded">
            <img
              src={Cancel}
              alt=""
              onClick={() => setImg(null)}
              className="cancel"
            />
            <img src={Img} alt="" /> <p>{img.name}</p>{" "}
          </div>
        )}
      </div>
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={handleFileChange}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
