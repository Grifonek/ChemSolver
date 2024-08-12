import { TrashIcon } from "@heroicons/react/24/outline";

function DeleteMessage({ handleDelete, setIsModalOpen }) {
  return (
    <button
      className="flex"
      onClick={() => {
        handleDelete;
        setIsModalOpen(true);
      }}
    >
      <TrashIcon className="size-6" />
      Delete
    </button>
  );
}

export default DeleteMessage;
