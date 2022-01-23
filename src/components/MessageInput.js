import React, { useState } from "react";

function MessageInput({ handleSubmit, message, setMessage }) {
  //   const [message, setMessage] = useState("");

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log(message);
  //     setMessage("");
  //   };

  const handleChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  return (
    <div className="row">
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={message}
          className="col-sm-10"
          type="text"
        />
        <button className="col-sm-2">Send</button>
      </form>
    </div>
  );
}

export default MessageInput;
