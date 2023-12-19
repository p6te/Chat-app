import Navbar from "./Navbar";
import Chats from "./Chats";

import useScreenWidth from "../../hooks/useScreenWidth";
import { SidebarContainer } from "./styled";
import Footer from "./Footer";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setErrorMessage: (message: string) => void;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Sidebar({ setErrorMessage, setIsSearchOpen }: Props) {
  const isMobile = useScreenWidth() <= 480;

  return (
    <>
      <SidebarContainer>
        <Navbar setErrorMessage={setErrorMessage} />
        <Chats setErrorMessage={setErrorMessage} />
        <Footer
          setErrorMessage={setErrorMessage}
          setIsSearchOpen={setIsSearchOpen}
        />
      </SidebarContainer>
    </>
  );
}
