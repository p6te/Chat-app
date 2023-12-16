import { useState } from "react";
import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import ErrorModal from "../../components/common/ErrorModal";
import { Container } from "./styled";
import Search from "~/components/SearchNewUser";

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
      {isSearchOpen && (
        <Search
          setErrorMessage={setErrorMessage}
          setIsSearchOpen={setIsSearchOpen}
        />
      )}

      <Sidebar setErrorMessage={setErrorMessage} />
      <Chat />
    </Container>
  );
}

export default Home;
