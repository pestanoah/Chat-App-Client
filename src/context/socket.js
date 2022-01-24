import socketio from "socket.io-client";
import React from "react";

export const Socket = socketio.connect(
  `http://${window.location.hostname}:3000`
);

export const SocketContext = React.createContext();
