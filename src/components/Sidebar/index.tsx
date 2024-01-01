import Navbar from "./Navbar";
import Chats from "./Chats";
import { SidebarContainer } from "./styled";
import Footer from "./Footer";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setErrorMessage: (message: string) => void;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Sidebar({
  setErrorMessage,
  setIsSearchOpen,
  setIsLoading,
  setIsSettingsOpen,
  setIsSidebarOpen,
}: Props) {
  return (
    <>
      <SidebarContainer>
        <Navbar
          setErrorMessage={setErrorMessage}
          setIsSettingsOpen={setIsSettingsOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Chats
          setErrorMessage={setErrorMessage}
          setIsLoading={setIsLoading}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Footer
          setErrorMessage={setErrorMessage}
          setIsSearchOpen={setIsSearchOpen}
          setIsLoading={setIsLoading}
        />
      </SidebarContainer>
    </>
  );
}
