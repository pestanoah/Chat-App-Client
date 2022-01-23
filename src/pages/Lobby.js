import React, { useState, useEffect } from "react";
import MessageInput from "../components/MessageInput";

function Lobby({ socket }) {
  const [message, setMessage] = useState("");

  const [chats, setChats] = useState([]);

  socket.on("messages", (messages) => {
    setChats(messages);
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/messages");
      console.log(response);
      const data = await response.json();
      console.log(data);
      setChats(data.messages);
    };
    fetchData();
  }, []);

  const renderedChats = chats.map((chat, i) => {
    return (
      <p className="border border-light" key={i}>
        {chat}
      </p>
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
    <div className="container">
      <div
        data-bs-spy="scroll"
        data-bs-target="#navbar-example2"
        data-bs-offset="0"
        className="scrollspy-example"
        tabIndex="0"
      >
        {renderedChats}
      </div>
      <div className="row">
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
