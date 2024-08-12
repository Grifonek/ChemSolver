import { useState } from "react";
import { addLike, deleteMessage, updateMessage } from "../_lib/actions";
import DeleteMessage from "./DeleteMessage";
import EditMessage from "./EditMessage";
import ReplyButton from "./ReplyButton";
import ReplyMessage from "./ReplyMessage";
import { HeartIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import EditWindow from "./EditWindow";
import ModalConfirm from "./ModalConfirm";

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
      await updateMessage(newHeading, newText, id);
      toast.success("Message successfully edited");
      setIsOpen(false); // Close the EditWindow after update
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

  return (
    <div className="relative flex flex-col items-center border border-blue-500 m-4 space-y-4 py-3">
      {currentUserId === userId && (
        <div className="absolute top-0 right-0 flex flex-col gap-x-4 gap-y-2 p-2">
          <DeleteMessage
            setIsModalOpen={setIsModalOpen}
            handleDelete={handleDelete}
          />
          <EditMessage setIsOpen={setIsOpen} />
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

      {isModalOpen && (
        <ModalConfirm
          message={"Are you sure you want to delete this message?"}
          onConfirm={handleDelete}
          onCancel={() => setIsModalOpen(false)}
          buttonText={"Delete"}
        />
      )}

      <div className="flex gap-x-8 items-center">
        <img
          src={userImg}
          alt={`Image of user ${userName}`}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex items-center gap-x-4">
          <p>{userName}</p>
          <h2>({userEmail})</h2>
          <button onClick={handleLikes} className="flex items-center">
            <HeartIcon className="h-6 w-6" />
            <span>{likeNum}</span>
          </button>
        </div>
      </div>
      <p>{id}</p>
      <h2 className="text-lg uppercase font-bold">{heading}</h2>
      <p>{text}</p>

      <ReplyButton id={id} userName={userName} onReply={onReply} />

      <div className="mt-4 space-y-4 w-full">
        {replies.map((reply) => (
          <ReplyMessage key={reply.id} reply={reply} />
        ))}
      </div>
    </div>
  );
}

export default Message;
