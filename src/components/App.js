import { Socket, SocketContext } from "../context/socket";
import Lobby from "../pages/Lobby";

function App() {
  return (
    <SocketContext.Provider value={Socket}>
      <Lobby />
    </SocketContext.Provider>
  );
}

export default App;
