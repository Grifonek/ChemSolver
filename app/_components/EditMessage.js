import { PencilSquareIcon } from "@heroicons/react/24/outline";

function EditMessage({ setIsOpen }) {
  return (
    <button className="flex hover:font-bold" onClick={() => setIsOpen(true)}>
      <PencilSquareIcon className="size-6" />
      Edit
    </button>
  );
}

export default EditMessage;
