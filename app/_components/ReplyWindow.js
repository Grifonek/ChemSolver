import { useState } from "react";
import { createReply } from "../_lib/actions";
import toast from "react-hot-toast";
import ModalConfirm from "./ModalConfirm";

function ReplyWindow({ id, userName, isOpen, onClose, onReply }) {
  const [text, setText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleSend() {
    setIsModalOpen(false);
    try {
      if (!text) {
        toast.error("Reply can't be empty");
        return;
      }

      const [reply] = await createReply(id, text);

      if (reply) {
        toast.success(`You replied to ${userName}`);
        if (onReply) {
          onReply(reply); // Add the new reply to the parent's state
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to reply");
    }
  }

  if (!isOpen) return null;

  return (
    <div className="flex flex-col text-center space-y-4">
      <h2>Reply to: {userName}</h2>

      <div>
        <label htmlFor="text" className="block text-sm font-medium mb-1">
          Message
        </label>
        <input
          type="text"
          id="text"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="flex justify-center gap-3 mt-3">
        <button
          onClick={onClose}
          className="bg-[color:var(--color-red)] px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="bg-[color:var(--color-green-300)] hover:bg-[color:var(--color-green-400)] px-4 py-2 rounded-lg transition-all"
        >
          Send
        </button>

        {isModalOpen && (
          <ModalConfirm
            message={`Reply to ${userName}?`}
            buttonText={"Reply"}
            onConfirm={() => {
              handleSend();
              setText("");
              onClose();
            }}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default ReplyWindow;
