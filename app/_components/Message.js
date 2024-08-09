import { deleteMessage } from "../_lib/actions";
import DeleteMessage from "./DeleteMessage";
import EditMessage from "./EditMessage";
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
  currentUserId,
  userId,
}) {
  async function handleDelete() {
    console.log(id);
    await deleteMessage(id);
  }

  return (
    <div className="flex flex-col items-center border border-blue-500 m-4 space-y-4 py-3">
      {currentUserId === userId && (
        <>
          <DeleteMessage handleDelete={handleDelete} />
          <EditMessage />
        </>
      )}
      <div className="flex gap-x-8 items-center">
        <img
          src={userImg}
          alt={`Image of user ${userName}`}
          className="w-10 h-10 rounded-full"
        />
        <p>{userName}</p>
        <h2>({userEmail})</h2>
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
