import { PencilSquareIcon } from "@heroicons/react/24/outline";

function EditReply({ setIsEditOpen }) {
  return (
    <button
      className="flex hover:font-bold"
      onClick={() => setIsEditOpen(true)}
    >
      <PencilSquareIcon className="size-6" />
      Edit
    </button>
  );
}

export default EditReply;
