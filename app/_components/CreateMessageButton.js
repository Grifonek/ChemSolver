"use client";

import { useState } from "react";
import ModalCreateMessage from "./ModalCreateMessage";

function CreateMessageButton({ onNewMessage }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <button
        className="bg-[color:var(--color-violet-300)] px-2 py-2 font-semibold hover:bg-[color:var(--color-violet-400)] transition-all w-36 flex gap-x-3 items-center text-sm md:text-base justify-center"
        onClick={handleOpenModal}
      >
        <span>+</span>New message
      </button>

      <ModalCreateMessage
        onNewMessage={onNewMessage}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default CreateMessageButton;
