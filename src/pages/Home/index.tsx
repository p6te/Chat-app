import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import ErrorModal from "../../components/common/ErrorModal";
import { Container } from "./styled";
import Search from "~/components/SearchNewUser";
import Modal from "~/components/common/Modal";
import Chat from "~/components/chat";
import Loading from "~/components/common/LoadingSpinner";
import ChoseTheme from "~/components/ChoseTheme";

function Home() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);

  return (
    <>
      {isLoading && <Loading />}
      {errorMessage && (
        <ErrorModal
          closeModal={() => setErrorMessage("")}
          errorMessage={errorMessage}
        />
      )}
      <Container>
        <Modal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)}>
          <Search
            setErrorMessage={setErrorMessage}
            setIsSearchOpen={setIsSearchOpen}
            setIsLoading={setIsLoading}
          />
        </Modal>
        <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
          <ChoseTheme />
        </Modal>

        <Sidebar
          setErrorMessage={setErrorMessage}
          setIsSearchOpen={setIsSearchOpen}
          setIsSettingsOpen={setIsSettingsOpen}
          setIsLoading={setIsLoading}
        />
        <Chat setIsSearchOpen={setIsSearchOpen} />
      </Container>
    </>
  );
}

export default Home;
