"use client";

import { useState } from "react";
import ReplyWindow from "./ReplyWindow";

function ReplyButton({ id, userName, onReply }) {
  const [isReplyWindowOpen, setIsReplyWindowOpen] = useState(false);

  function handleOpenWindow() {
    setIsReplyWindowOpen(true);
  }

  function handleCloseWindow() {
    setIsReplyWindowOpen(false);
  }

  return (
    <>
      <button
        className="bg-[color:var(--color-violet-300)] px-1 py-1 font-semibold hover:bg-[color:var(--color-violet-400)] transition-all"
        onClick={handleOpenWindow}
      >
        Reply
      </button>

      <ReplyWindow
        id={id}
        userName={userName}
        isOpen={isReplyWindowOpen}
        onClose={handleCloseWindow}
        onReply={onReply}
      />
    </>
  );
}

export default ReplyButton;
