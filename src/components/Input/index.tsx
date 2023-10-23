import React from "react";
import "./styles.scss";
import Img from "../../assets/img.png";
import Attach from "../../assets/attach.png";

export default function Input() {
  return (
    <div className="inputMessage">
      <input className="inputMessage" type="text" placeholder="type..." />
      <div className="send">
        <img src={Attach} alt="" />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
}
