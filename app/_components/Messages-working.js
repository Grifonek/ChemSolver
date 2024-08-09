"use client";

import Message from "./Message";

function Messages({ messages, onReply, replies }) {
  return (
    <div className="border border-red-500 w-full">
      {messages?.map((item) => (
        <Message
          key={item.id}
          id={item.id}
          heading={item.heading}
          text={item.text}
          userName={item.userName}
          userEmail={item.userEmail}
          userImg={item.userImg}
          replies={replies.filter((reply) => reply.messageId === item.id)}
          onReply={onReply}
        />
      ))}
    </div>
  );
}

export default Messages;
