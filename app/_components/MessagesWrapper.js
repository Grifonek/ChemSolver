"use client";

import { useState } from "react";
import CreateMessageButton from "@/app/_components/CreateMessageButton";
import Messages from "@/app/_components/Messages";

export default function MessagesWrapper({ messages, replies, currentUserId }) {
  const [currentMessages, setCurrentMessages] = useState(messages);

  const handleNewMessage = (newMessage) => {
    setCurrentMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="flex flex-col items-center py-10 px-5 gap-y-5">
      <h1 className="text-2xl">Discussion</h1>
      <h3>
        Do you have any ideas on improving the app, do you miss anything or want
        to take a part in the development of ChemSolver?
      </h3>
      <h3>Let us know in the discussion!</h3>

      <CreateMessageButton onNewMessage={handleNewMessage} />

      <Messages
        messages={currentMessages}
        replies={replies}
        currentUserId={currentUserId}
      />
    </div>
  );
}
