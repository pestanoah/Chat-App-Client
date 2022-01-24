import React, { useState, useEffect } from "react";
import Lobby from "../pages/Lobby";
import io from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(
    io(`http://${window.location.hostname}:3000`)
  );

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, [setSocket]);

  return <Lobby socket={socket} />;
}

export default App;
