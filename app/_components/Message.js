import { Bars3Icon, HeartIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { addLike, deleteMessage, updateMessage } from "../_lib/actions";
import DeleteMessage from "./DeleteMessage";
import EditMessage from "./EditMessage";
import EditWindow from "./EditWindow";
import ModalConfirm from "./ModalConfirm";
import ReplyButton from "./ReplyButton";
import ReplyMessage from "./ReplyMessage";

function Message({
  id,
  heading,
  text,
  userName,
  userEmail,
  userImg,
  replies,
  onReply,
  onLike,
  currentUserId,
  userId,
  likes,
}) {
  const [likeNum, setLikeNum] = useState(likes);
  const [isOpen, setIsOpen] = useState(false);
  const [newHeading, setNewHeading] = useState(heading);
  const [newText, setNewText] = useState(text);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  async function handleDelete() {
    setIsModalOpen(false);
    try {
      await deleteMessage(id);
      toast.success("Message deleted successfully");
    } catch {
      toast.error("Error when deleting message");
    }
  }

  async function handleUpdate() {
    try {
      if (newHeading === heading && newText === text) {
        toast.error("No changes detected");
        return;
      } else if (newHeading === "" || newText === "") {
        toast.error("Message can't be empty");
        return;
      }

      await updateMessage(newHeading, newText, id);
      toast.success("Message successfully edited");
      setIsOpen(false);
    } catch {
      toast.error("Could not edit message");
    }
  }

  async function handleLikes() {
    try {
      const updatedMessage = await addLike(id);
      setLikeNum(updatedMessage[0].likes);
      onLike(id, updatedMessage[0].likes);
      toast.success(`Added like on ${userName}'s message`);
    } catch (error) {
      toast.error("You have already liked this message");
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
    <div className="relative flex flex-col items-center border-b border-[color:var(--color-gray-400)] md:m-4 space-y-4 py-3 w-full md:w-11/12 overflow-hidden">
      {currentUserId === userId && (
        <div className="absolute top-2 right-6" ref={dropdownRef}>
          <Bars3Icon
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 cursor-pointer"
          />
          {isDropdownOpen && (
            <div className="absolute right-0 border bg-[color:var(--color-violet-400)] rounded-lg shadow-lg z-50 px-2 py-1 space-y-2">
              <EditMessage setIsOpen={setIsOpen} />
              <DeleteMessage setIsModalOpen={setIsModalOpen} />
              {isOpen && (
                <EditWindow
                  newHeading={newHeading}
                  setNewHeading={setNewHeading}
                  newText={newText}
                  setNewText={setNewText}
                  handleUpdate={handleUpdate}
                  setIsOpen={setIsOpen}
                />
              )}
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <ModalConfirm
          message={"Are you sure you want to delete this message?"}
          onConfirm={handleDelete}
          onCancel={() => setIsModalOpen(false)}
          buttonText={"Delete"}
        />
      )}

      <div className="flex gap-x-8 items-center md:pb-4">
        <img
          src={userImg}
          alt={userName}
          referrerPolicy="no-referrer"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex max-md:flex-col items-center gap-x-4 w-full">
          <p className="text-sm md:text-base font-bold">{userName}:</p>
          <p className="text-sm md:text-base text-gray-500">{userEmail}</p>
          <button onClick={handleLikes} className="flex items-center gap-1">
            <HeartIcon className="h-6 w-6" />
            <span>{likeNum}</span>
          </button>
          <p className="text-[color:var(--color-red)]">
            {userId === 12 ? "OWNER" : ""}
          </p>
        </div>
      </div>

      {/* Ensuring the heading and text don't overlap */}
      <h2 className="text-base md:text-lg uppercase font-bold w-full break-words text-center">
        {heading}
      </h2>
      <p className="text-sm md:text-base w-full break-words text-center">
        {text}
      </p>

      <ReplyButton
        id={id}
        userName={userName}
        onReply={onReply}
        className="text-sm md:text-base xl:text-lg"
      />

      <div className="mt-4 space-y-4 w-full">
        {replies.map((reply) => (
          <ReplyMessage
            key={reply.id}
            reply={reply}
            currentUserId={currentUserId}
            userId={reply.userId}
          />
        ))}
      </div>
    </div>
  );
}

export default Message;
