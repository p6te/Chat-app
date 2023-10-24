import "./styles.scss";
import Navbar from "../Navbar";
import Search from "../Search";
import Chats from "../Chats";

import useScreenWidth from "../../hooks/useScreenWidth";
import { useState, useMemo } from "react";
import Arrow from "../../assets/arrow.png";

export default function Sidebar() {
  const isMobile = useScreenWidth() <= 480;
  const [isSidebarOpen, setisSidebarOpen] = useState(isMobile ? false : true);

  return (
    <div className="sidebar" style={isSidebarOpen ? { width: "24px" } : {}}>
      {isSidebarOpen ? (
        <div className="mobileSidebar" />
      ) : (
        <div>
          <Navbar />
          <Search />
          <Chats />
        </div>
      )}

      <img
        className="arrow"
        src={Arrow}
        alt="toggle sidebar"
        style={isSidebarOpen ? {} : { rotate: "180deg" }}
        onClick={() => setisSidebarOpen(!isSidebarOpen)}
      />
    </div>
  );
}
