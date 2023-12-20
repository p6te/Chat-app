import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import ErrorModal from "../../components/common/ErrorModal";
import { Container } from "./styled";
import Search from "~/components/SearchNewUser";
import Modal from "~/components/common/Modal";
import Chat from "~/components/chat";
import Loading from "~/components/common/LoadingSpinner";

function Home() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
          <Search setErrorMessage={setErrorMessage} />
        </Modal>

        <Sidebar
          setErrorMessage={setErrorMessage}
          setIsSearchOpen={setIsSearchOpen}
          setIsLoading={setIsLoading}
        />
        <Chat />
      </Container>
    </>
  );
}

export default Home;
