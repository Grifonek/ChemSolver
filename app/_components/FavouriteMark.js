import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BlackIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addBookMark, deleteBookMark, isBookMarked } from "../_lib/actions";
import SpinnerMini from "./SpinnerMini";

function FavouriteMark({ id, values }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      try {
        const status = await isBookMarked(id);

        if (!status) setIsLoading(false);

        setIsBookmarked(status.length > 0);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching bookmark status:", error);
      }
    };

    fetchBookmarkStatus();
  }, [id]);

  const handleBookmark = async () => {
    if (isBookmarked) {
      try {
        await deleteBookMark(id);
        setIsBookmarked(false);
        toast.success("Removed from bookmarks!");
      } catch (error) {
        toast.error("Failed to remove bookmark.");
        console.error("Error deleting bookmark:", error);
      }
    } else {
      try {
        await toast.promise(addBookMark(id, values), {
          loading: "Adding bookmark...",
          success: "Added to bookmarks!",
          error: "You must be logged in to add bookmarks",
        });
        setIsBookmarked(true);
      } catch (error) {
        console.error("Error adding bookmark:", error);
      }
    }
  };

  if (isLoading) {
    return <SpinnerMini />;
  }

  return (
    <button onClick={handleBookmark}>
      {isBookmarked ? (
        <BlackIcon className="size-6" />
      ) : (
        <BookmarkIcon className="size-6" />
      )}
    </button>
  );
}

export default FavouriteMark;
