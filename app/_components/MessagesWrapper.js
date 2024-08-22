"use client";

import { useEffect, useRef, useState } from "react";
import CreateMessageButton from "@/app/_components/CreateMessageButton";
import Messages from "@/app/_components/Messages";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import FilterMenu from "./FilterMenu";

export default function MessagesWrapper({ messages, replies, currentUserId }) {
  const [currentMessages, setCurrentMessages] = useState(messages);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter, setFilter] = useState("newest");

  const filterRef = useRef(null);

  useEffect(() => {
    let filteredMessages = [...messages];

    if (filter === "myMessages") {
      filteredMessages = filteredMessages.filter(
        (message) => message.userId === currentUserId
      );
    }

    filteredMessages.sort((a, b) => {
      if (filter === "newest") {
        return new Date(b.created_at) - new Date(a.created_at);
      } else {
        return new Date(a.created_at) - new Date(b.created_at);
      }
    });

    setCurrentMessages(filteredMessages);
  }, [currentUserId, filter, messages]);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleNewMessage = (newMessage) => {
    setCurrentMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  function handleFilterChange(selectedFilter) {
    setFilter(selectedFilter);
  }

  return (
    <div className="flex flex-col items-center py-10 px-5 gap-y-5">
      <h1 className="text-2xl">Discussion</h1>
      <h3>
        Do you have any ideas on improving the app, do you miss anything or want
        to take a part in the development of ChemSolver?
      </h3>
      <h3>Let us know in the discussion!</h3>

      <div className="w-full flex justify-between items-center">
        <CreateMessageButton onNewMessage={handleNewMessage} />

        <div className="relative" ref={filterRef}>
          <div
            className="flex items-center gap-x-2 cursor-pointer"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FunnelIcon className="w-6 h-6" />
            {isFilterOpen ? (
              <ChevronUpIcon className="w-6 h-6" />
            ) : (
              <ChevronDownIcon className="w-6 h-6" />
            )}
          </div>

          {isFilterOpen && (
            <div className="absolute right-0 border rounded-lg shadow-lg z-50 px-2 py-1 space-y-2 bg-[color:var(--color-violet-400)]">
              <FilterMenu
                onFilterChange={handleFilterChange}
                selectedFilterType={filter}
              />
            </div>
          )}
        </div>
      </div>

      {currentMessages.length !== 0 ? (
        <Messages
          messages={currentMessages}
          replies={replies}
          currentUserId={currentUserId}
        />
      ) : (
        "No messages found"
      )}
    </div>
  );
}
