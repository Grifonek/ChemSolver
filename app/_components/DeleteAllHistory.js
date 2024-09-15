"use client";

import toast from "react-hot-toast";
import { deleteAllHistory } from "../_lib/actions";

function DeleteAllHistory() {
  async function handleDeleteAllHistory() {
    try {
      await deleteAllHistory();

      toast.success("Deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting history");
    }
  }

  return (
    <button
      onClick={() => handleDeleteAllHistory()}
      className="bg-[color:var(--color-violet-300)] px-3 py-2 xl:px-6 xl:py-4 font-semibold text-sm md:text-base xl:text-lg hover:bg-[color:var(--color-violet-400)] transition-all"
    >
      Delete complete history
    </button>
  );
}

export default DeleteAllHistory;
