import React, { useState } from "react";

function MessageInput({ handleSubmit, message, setMessage }) {
  const handleChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-between">
          <input
            onChange={handleChange}
            value={message}
            className="col-sm-11"
            type="text"
          />
          <button className="col-sm-1 btn btn-primary">Send</button>
        </div>
      </form>
    </div>
  );
}

export default MessageInput;
