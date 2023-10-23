import React from "react";
import "./styles.scss";

export default function Navbar() {
  return (
    <div className="navbar">
      <h4>Wall chat</h4>
      <div className="user">
        <img
          src="https://cdn.pixabay.com/photo/2018/02/21/08/40/woman-3169726_640.jpg"
          alt=""
        />
        <span>Name</span>
        <button>logout</button>
      </div>
    </div>
  );
}
