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
      className="bg-violet-300 px-6 py-4 font-semibold hover:bg-violet-400 transition-all"
    >
      Delete complete history
    </button>
  );
}

export default DeleteAllHistory;
