import { useState } from "react";
import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import ErrorModal from "../../components/common/ErrorModal";

function Home() {
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="home">
      {errorMessage && (
        <ErrorModal
          closeModal={() => setErrorMessage("")}
          errorMessage={errorMessage}
        />
      )}

      <Sidebar setErrorMessage={setErrorMessage} />
      <Chat />
    </div>
  );
}

export default Home;
