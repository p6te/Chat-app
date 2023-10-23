import "./styles.scss";

//TODO replace with real data
const message = {
  senderId: 1,
};

const currentUser = {
  uid: 1,
};

export default function Message() {
  return (
    <div
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src="https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_640.jpg"
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>hello</p>
        <img
          src="https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_640.jpg"
          alt=""
        />
      </div>
    </div>
  );
}
