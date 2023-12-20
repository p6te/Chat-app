import "./styles.scss";
import Img from "~/assets/img.png";
import Cancel from "~/assets/cancel.png";
// import Attach from "../../assets/attach.png";
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
import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";
import { db, storage } from "../../../firebaseConfig";
import { MessageType } from "../../../types";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import EmojiIcon from "~/assets/EmojiIcon";
import Input from "~/components/common/Input";
import {
  EmojiButton,
  EmojiPickerContainer,
  SearchInputContainer,
  SendButton,
  SendOptions,
} from "./styled";
import { Flexbox } from "~/components/common/Flexbox";
import AddImageIcon from "~/assets/AddImageIcon";
import SendIcon from "~/assets/SendIcon";

export default function ChatInput() {
  const [text, setText] = useState("");
  const [img, setImg] = useState<File | null>(null);
  const [isEmojPicker, setIsEmojPicker] = useState(false);
  const { loggedUser } = useContext(AuthContext);
  const { state } = useContext(ChatContext);

  const emojiPickerRef = useOutsideClick(() => {
    setIsEmojPicker(false);
  });

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
              senderId: loggedUser?.uid,
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
          senderId: loggedUser?.uid,
          date: Timestamp.now(),
        }),
      });
    }
    if (!loggedUser?.uid) {
      return;
    }

    try {
      await updateDoc(doc(db, "userChats", loggedUser.uid), {
        [state.chatId + ".lastMessage"]: text,
        [state.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", state.user.uid), {
        [state.chatId + ".lastMessage"]: text,
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
      console.log();
      if (e.target.files[0].size > 100000) {
        alert("Your img is too large, please use file below 100Kb");
      } else {
        setImg(e.target.files[0]);
      }
    }
  };
  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    event.preventDefault();
    setText(
      (inputValue) =>
        inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
    );
    setIsEmojPicker(false);
  };

  return (
    <SearchInputContainer>
      <Input
        // className="inputMessage"
        type="text"
        placeholder="type..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => handleEnterKey(e)}
      />
      {isEmojPicker && (
        <EmojiPickerContainer ref={emojiPickerRef}>
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            height={350}
            width={350}
            lazyLoadEmojis={true}
            skinTonesDisabled={true}
          />
        </EmojiPickerContainer>
      )}
      <div>
        {img && (
          <Flexbox center gap="4px">
            <img
              src={Cancel}
              alt=""
              onClick={() => setImg(null)}
              className="cancel"
            />
            <img src={Img} alt="" /> <p>{img.name}</p>
          </Flexbox>
        )}
      </div>
      <SendOptions>
        {/* TODO add handling files */}
        {/* <img src={Attach} alt="" /> */}
        <EmojiButton onClick={() => setIsEmojPicker(true)}>
          <EmojiIcon size="28" />
        </EmojiButton>
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={handleFileChange}
        />
        <label htmlFor="file">
          <AddImageIcon size="28" />
        </label>
        <SendButton onClick={handleSend}>
          <SendIcon size="28" />
        </SendButton>
      </SendOptions>
    </SearchInputContainer>
  );
}
