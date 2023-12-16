import Navbar from "./Navbar";
import Chats from "./Chats";

import useScreenWidth from "../../hooks/useScreenWidth";
import { SidebarContainer } from "./styled";
import Footer from "./Footer";

type Props = {
  setErrorMessage: (message: string) => void;
};

export default function Sidebar({ setErrorMessage }: Props) {
  const isMobile = useScreenWidth() <= 480;

  return (
    <>
      <SidebarContainer>
        <Navbar setErrorMessage={setErrorMessage} />

        <Chats setErrorMessage={setErrorMessage} />
        <Footer setErrorMessage={setErrorMessage} />
      </SidebarContainer>
    </>
  );
}
