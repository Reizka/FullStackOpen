import React from "react";

const Notification = function({ message }) {
  let messageStyle = {
    color: "gray",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px"
  };

  if (message === null) {
    messageStyle = {};
    return null;
  }

  return (
    <div style={messageStyle} className="message">
      {message}
    </div>
  );
};

export default Notification;
