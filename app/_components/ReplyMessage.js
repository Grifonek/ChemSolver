function ReplyMessage({ reply }) {
  return (
    <div className="flex flex-col items-center border border-blue-500 m-4 space-y-4 py-3">
      <div>Delete and edit</div>
      <div className="flex gap-x-8">
        <img
          src={reply.userImg}
          alt={`Image of user ${reply.userName}`}
          className="w-8 h-8 rounded-full"
        />
        <h2>{reply.userName}</h2>
        <h2>{reply.userEmail}</h2>
      </div>
      <p>{reply.text}</p>
    </div>
  );
}

export default ReplyMessage;
