import React from "react";

import "./styles.scss";

function User() {
  return (
    <div className="user">
      <img
        src="https://cdn.pixabay.com/photo/2018/02/21/08/40/woman-3169726_640.jpg"
        alt=""
      />
      <div className="userInfo">
        <span>Name</span>
        <p>hello</p>
      </div>
    </div>
  );
}

export default User;
