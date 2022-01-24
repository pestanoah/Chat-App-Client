import React, { useState, useEffect } from "react";
import MessageInput from "../components/MessageInput";
import "./Lobby.css";

function Lobby({ socket }) {
  const [message, setMessage] = useState("");

  const [chats, setChats] = useState([]);

  socket.on("messages", (messages) => {
    console.log(messages);
    setChats(messages);
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/messages");
      const data = await response.json();
      console.log(data.messages);
      setChats(data.messages);
    };
    fetchData();
  }, []);

  const renderedChats = chats.map((chat, i) => {
    return (
      <div
        key={i}
        className="row justify-content-between border border-light bg-light"
      >
        <p className="col-10">{chat.message}</p>
        <p className="col-2">{new Date(chat.timestamp).toLocaleTimeString()}</p>
      </div>
    );
  });

  const sendChat = async () => {
    socket.emit("chat message", message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendChat();
    setMessage("");
    setChats([...chats, message]);
  };

  return (
    <div className="container h-100">
      <div className="overflow-auto h-75">{renderedChats}</div>
      <div className="row mw-100">
        <MessageInput
          handleSubmit={handleSubmit}
          message={message}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
}

export default Lobby;
