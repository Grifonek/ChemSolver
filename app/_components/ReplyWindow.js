import { useState } from "react";
import { createReply } from "../_lib/actions";
import toast from "react-hot-toast";

function ReplyWindow({ id, userName, isOpen, onClose, onReply }) {
  const [text, setText] = useState("");

  async function handleSend() {
    try {
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
            handleSend();
            setText("");
            onClose();
          }}
          className="bg-[color:var(--color-green-300)] hover:bg-[color:var(--color-green-400)] text-white px-4 py-2 rounded-lg transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ReplyWindow;
