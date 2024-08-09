import { TrashIcon } from "@heroicons/react/24/outline";

function DeleteMessage({ handleDelete }) {
  return (
    <button className="flex" onClick={handleDelete}>
      <TrashIcon className="size-6" />
      Delete
    </button>
  );
}

export default DeleteMessage;
