"use client";

import CreateMessageButton from "@/app/_components/CreateMessageButton";
import Messages from "@/app/_components/Messages";
import Spinner from "@/app/_components/Spinner";
import { getMessages, getReplies } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { useEffect, useState } from "react";

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [replies, setReplies] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const session = await auth();
      if (session) {
        setCurrentUserId(session.user.guestId);
      }

      const fetchedMessages = await getMessages();
      const fetchedReplies = await getReplies();
      setMessages(fetchedMessages);
      setReplies(fetchedReplies);
      setIsLoading(false);
    };
    fetch();
  }, []);

  const handleNewMessage = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleReplies = (reply) => {
    setReplies((prev) => [...prev, reply]);
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

      {isLoading ? (
        <Spinner />
      ) : (
        <Messages
          messages={messages}
          replies={replies}
          onReply={handleReplies}
          currentUserId={currentUserId}
        />
      )}
    </div>
  );
}
