"use client";

import { useEffect, useState } from "react";
import { getBookMarked } from "../_lib/actions";
import TwoCalc from "./TwoCalc";

function FavouriteCalculation() {
  const [bookmarked, setBookmarked] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookMarks = async () => {
      const bookmarks = await getBookMarked();

      if (!bookmarks) return;

      setBookmarked(bookmarks);
      setIsLoading(false);
    };

    fetchBookMarks();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-x-20">
      {bookmarked.length !== 0 ? (
        bookmarked.map((item) => (
          <div key={item.id}>
            <TwoCalc values={item.values} id={item.name} />
          </div>
        ))
      ) : (
        <p>No bookmarks found.</p>
      )}
    </div>
  );
}

export default FavouriteCalculation;
