"use client";

import { useState } from "react";
import { createMessage } from "../_lib/actions";
import toast from "react-hot-toast";

function ModalCreateMessage({ onNewMessage, isOpen, onClose }) {
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");

  async function handleSubmit(heading, text) {
    try {
      const [newMessage] = await createMessage(heading, text);

      if (newMessage) {
        toast.success("Message successfully created!");
        onNewMessage(newMessage);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create message");
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[color:var(--color-violet-300)] rounded-lg p-6 w-96 space-y-4">
        <h2 className="text-xl font-semibold">Create a New Message</h2>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="heading">
            Heading
          </label>
          <input
            type="text"
            id="heading"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="text">
            Message
          </label>
          <textarea
            id="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            rows="4"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-[color:var(--color-red)] px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleSubmit(heading, text);
              setHeading("");
              setText("");
              onClose();
            }}
            className="bg-[color:var(--color-green-300)] hover:bg-[color:var(--color-green-400)] px-4 py-2 rounded-lg transition-all"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalCreateMessage;
