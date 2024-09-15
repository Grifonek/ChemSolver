import { Bars3Icon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { deleteReply, updateReply } from "../_lib/actions";
import DeleteReply from "./DeleteReply";
import EditReply from "./EditReply";
import EditReplyWindow from "./EditReplyWindow";
import ModalConfirm from "./ModalConfirm";

function ReplyMessage({ reply, currentUserId, userId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newText, setNewText] = useState(reply.text);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  async function handleDelete() {
    setIsModalOpen(false);
    try {
      await deleteReply(reply.id);
      toast.success("Reply deleted successfully");
    } catch {
      toast.error("Error when deleting reply");
    }
  }

  async function handleUpdate() {
    try {
      if (reply.text === newText) {
        toast.error("No changes detected");
        return;
      } else if (newText === "") {
        toast.error("Reply can't be empty");
        return;
      }

      await updateReply(newText, reply.id);
      toast.success("Reply updated successfully");
      setIsEditOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    function handleOutsideClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex flex-col items-center text-center shadow-lg shadow-[color:var(--color-violet-300)] m-1 md:m-4 space-y-4 py-3 relative">
      {currentUserId === userId && (
        <div className="absolute top-2 right-6" ref={dropdownRef}>
          <Bars3Icon
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 cursor-pointer"
          />
          {isDropdownOpen && (
            <div className="absolute right-0 border bg-[color:var(--color-violet-400)] rounded-lg shadow-lg z-50 px-2 py-1 space-y-2">
              <EditReply setIsEditOpen={setIsEditOpen} />
              <DeleteReply setIsModalOpen={setIsModalOpen} />
            </div>
          )}
        </div>
      )}

      {isEditOpen && (
        <EditReplyWindow
          newText={newText}
          setNewText={setNewText}
          handleUpdate={handleUpdate}
          setIsEditOpen={setIsEditOpen}
        />
      )}

      {isModalOpen && (
        <ModalConfirm
          message={"Are you sure you want to delete this reply?"}
          onConfirm={handleDelete}
          onCancel={() => setIsModalOpen(false)}
          buttonText={"Delete"}
        />
      )}

      <div className="flex items-center gap-x-8 md:pb-4">
        <img
          src={reply.userImg}
          // alt={`Image of user ${reply.userName}`}
          className="w-8 h-8 rounded-full"
        />
        <div>
          <h2 className="text-sm md:text-base font-bold">{reply.userName}</h2>
          <p className="text-sm text-gray-500">{reply.userEmail}</p>
        </div>
        <p className="text-[color:var(--color-red)]">
          {userId === 12 ? "OWNER" : ""}
        </p>
      </div>
      <p className="w-[100%] max-w-prose px-4 break-words">{reply.text}</p>
    </div>
  );
}

export default ReplyMessage;
