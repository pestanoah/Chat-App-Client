import React, { useState, useEffect, useRef } from "react";
import MessageInput from "../components/MessageInput";
import "./Lobby.css";

function Lobby({ socket }) {
  const [message, setMessage] = useState("");

  const [chats, setChats] = useState([]);

  const lastMessage = useRef(null);

  const scrollToMessage = () => {
    lastMessage.current.scrollIntoView();
  };

  socket.on("messages", (messages) => {
    console.log("Messages recived:", messages);
    setChats(messages);
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/messages");
      const data = await response.json();
      console.log("Inital messages: ", data.messages);
      setChats(data.messages);
      scrollToMessage();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (chats.length > 0) {
      scrollToMessage();
    }
  }, [chats]);

  const renderedChats = chats.map((chat, i) => {
    let ref = null;
    if (i === chats.length - 1) {
      ref = lastMessage;
    }
    return (
      <div
        key={i}
        ref={ref}
        className="row justify-content-between border border-light bg-light"
      >
        <p className="col-10">{chat.message}</p>
        <p className="col-2">{new Date(chat.timestamp).toLocaleTimeString()}</p>
      </div>
    );
  });

  const sendChat = async () => {
    console.log("Sending message:", message);
    socket.emit("chat message", message);
    scrollToMessage();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendChat();
    setMessage("");
    setChats([...chats, message]);
  };

  return (
    <div className="container h-100">
      <div className="h-75" id="chats-window">
        {renderedChats}
      </div>
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
