import React, { useState, useEffect, useRef, useContext } from "react";
import MessageInput from "../components/MessageInput";
import "./Lobby.css";
import { SocketContext } from "../context/socket";

function Lobby() {
  const [message, setMessage] = useState("");

  const socket = useContext(SocketContext);

  const [chats, setChats] = useState([]);

  const lastMessage = useRef(null);

  const scrollToMessage = () => {
    lastMessage.current.scrollIntoView();
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/messages");
      const data = await response.json();
      console.log("Inital messages: ", data.messages);
      setChats(data.messages);
      scrollToMessage();
    };

    fetchData();
    socket.on("messages", (messages) => {
      console.log("Messages recived:", messages);
      setChats(messages);
    });
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
