import { useState } from "react";
import { Container } from "./styled";
import Search from "~/components/SearchNewUser";
import Modal from "~/components/common/Modal";
import Chat from "~/components/chat";
import Loading from "~/components/common/LoadingSpinner";
import ChoseTheme from "~/components/ChoseTheme";
import ErrorModal from "~/components/common/ErrorModal";
import Sidebar from "~/components/Sidebar";
import UserSettings from "~/components/UserSettings";
import useIsMobile from "~/hooks/useIsMobile";

function Home() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useIsMobile();

  return (
    <>
      {isLoading && <Loading />}

      <ErrorModal
        onClose={() => setErrorMessage("")}
        errorMessage={errorMessage}
        isOpen={!!errorMessage}
      />

      <Container>
        <Modal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          title="Add new chat"
        >
          <Search
            setErrorMessage={setErrorMessage}
            setIsSearchOpen={setIsSearchOpen}
            setIsLoading={setIsLoading}
          />
        </Modal>
        <Modal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          title="Settings"
        >
          <ChoseTheme />
          <UserSettings
            setIsLoading={setIsLoading}
            onClose={() => setIsSettingsOpen(false)}
          />
        </Modal>

        {isMobile && isSidebarOpen && (
          <Sidebar
            setErrorMessage={setErrorMessage}
            setIsSearchOpen={setIsSearchOpen}
            setIsSettingsOpen={setIsSettingsOpen}
            setIsLoading={setIsLoading}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        )}
        {isMobile && !isSidebarOpen && (
          <Chat
            setIsSearchOpen={setIsSearchOpen}
            setIsLoading={setIsLoading}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        )}
        {!isMobile && (
          <>
            <Sidebar
              setErrorMessage={setErrorMessage}
              setIsSearchOpen={setIsSearchOpen}
              setIsSettingsOpen={setIsSettingsOpen}
              setIsLoading={setIsLoading}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <Chat
              setIsSearchOpen={setIsSearchOpen}
              setIsLoading={setIsLoading}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </>
        )}
      </Container>
    </>
  );
}

export default Home;
