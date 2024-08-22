import { TrashIcon } from "@heroicons/react/24/outline";

function DeleteReply({ setIsModalOpen }) {
  return (
    <button
      className="flex hover:font-bold"
      onClick={() => {
        setIsModalOpen(true);
      }}
    >
      <TrashIcon className="size-6" />
      Delete
    </button>
  );
}

export default DeleteReply;
