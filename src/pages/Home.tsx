import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

function Home() {
  return (
    <div className="home">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default Home;
