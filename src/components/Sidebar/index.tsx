import Navbar from "./Navbar";
import Chats from "./Chats";

import useScreenWidth from "../../hooks/useScreenWidth";
import { SidebarContainer } from "./styled";
import Footer from "./Footer";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setErrorMessage: (message: string) => void;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export default function Sidebar({
  setErrorMessage,
  setIsSearchOpen,
  setIsLoading,
}: Props) {
  const isMobile = useScreenWidth() <= 480;

  return (
    <>
      <SidebarContainer>
        <Navbar setErrorMessage={setErrorMessage} setIsLoading={setIsLoading} />
        <Chats setErrorMessage={setErrorMessage} setIsLoading={setIsLoading} />
        <Footer
          setErrorMessage={setErrorMessage}
          setIsSearchOpen={setIsSearchOpen}
          setIsLoading={setIsLoading}
        />
      </SidebarContainer>
    </>
  );
}
