"use client";

import { useState } from "react";
import Message from "./Message";

function Messages({ messages, replies, currentUserId }) {
  const [allReplies, setAllReplies] = useState(replies); // Initialize state with fetched replies

  // Function to handle adding a new reply
  const handleNewReply = (newReply) => {
    setAllReplies((prevReplies) => [...prevReplies, newReply]);
  };

  return (
    <div className="border border-red-500 w-full">
      {messages.map((message) => (
        <Message
          key={message.id}
          id={message.id}
          heading={message.heading}
          text={message.text}
          userName={message.userName}
          userEmail={message.userEmail}
          userImg={message.userImg}
          replies={allReplies.filter((reply) => reply.messageId === message.id)} // Filter replies by message ID
          onReply={handleNewReply} // Pass handleNewReply function
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
}

export default Messages;
