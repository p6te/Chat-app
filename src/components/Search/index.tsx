import React from "react";
import "./styles.scss";
import User from "../User";

export default function Search() {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find a user" />
      </div>
      <div className="userChat">
        <User />
      </div>
    </div>
  );
}
