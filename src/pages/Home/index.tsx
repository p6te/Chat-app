import { useState } from "react";

import Sidebar from "../../components/Sidebar";
import ErrorModal from "../../components/common/ErrorModal";
import { Container } from "./styled";
import Search from "~/components/SearchNewUser";
import Modal from "~/components/common/Modal";
import Chat from "~/components/chat";

function Home() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <Container>
      {errorMessage && (
        <ErrorModal
          closeModal={() => setErrorMessage("")}
          errorMessage={errorMessage}
        />
      )}

      <Modal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)}>
        <Search setErrorMessage={setErrorMessage} />
      </Modal>

      <Sidebar
        setErrorMessage={setErrorMessage}
        setIsSearchOpen={setIsSearchOpen}
      />
      <Chat />
    </Container>
  );
}

export default Home;
