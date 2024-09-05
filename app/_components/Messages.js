"use client";

import { useState } from "react";
import Message from "./Message";

function Messages({ messages, replies, currentUserId }) {
  const [allReplies, setAllReplies] = useState(replies);
  const [currentMessages, setCurrentMessages] = useState(messages);

  const handleNewReply = (newReply) => {
    setAllReplies((prevReplies) => [...prevReplies, newReply]);
  };

  const handleLikeUpdate = (messageId, updatedLikes) => {
    setCurrentMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === messageId ? { ...message, likes: updatedLikes } : message
      )
    );
  };

  return (
    <div className="flex flex-col w-full space-y-10">
      {messages.map((message) => (
        <Message
          key={message.id}
          id={message.id}
          likes={message.likes}
          userId={message.userId}
          heading={message.heading}
          text={message.text}
          userName={message.userName}
          userEmail={message.userEmail}
          userImg={message.userImg}
          replies={allReplies.filter((reply) => reply.messageId === message.id)}
          onReply={handleNewReply}
          onLike={handleLikeUpdate}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
}

export default Messages;
