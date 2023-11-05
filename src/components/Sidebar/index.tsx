import "./styles.scss";
import Navbar from "../Navbar";
import Search from "../Search";
import Chats from "../Chats";

import useScreenWidth from "../../hooks/useScreenWidth";
import { useState } from "react";
import Arrow from "../../assets/arrow.png";

type Props = {
  setErrorMessage: (message: string) => void;
};

export default function Sidebar({ setErrorMessage }: Props) {
  const isMobile = useScreenWidth() <= 480;
  const [isSidebarOpen, setisSidebarOpen] = useState(isMobile ? false : true);

  return (
    <div className="sidebar" style={isSidebarOpen ? { width: "24px" } : {}}>
      {isSidebarOpen ? (
        <div className="mobileSidebar" />
      ) : (
        <div>
          <Navbar setErrorMessage={setErrorMessage} />
          <Search setErrorMessage={setErrorMessage} />
          <Chats setErrorMessage={setErrorMessage} />
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
