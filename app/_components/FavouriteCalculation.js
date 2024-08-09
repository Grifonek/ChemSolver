"use client";

import { useEffect, useState } from "react";
import { getBookMarked } from "../_lib/actions";
import GeneralCalculator from "./calculations/GeneralCalculator";

function FavouriteCalculation() {
  const [bookmarked, setBookmarked] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [calculations, setCalculations] = useState({});

  useEffect(() => {
    const fetchBookMarks = async () => {
      const bookmarks = await getBookMarked();
      console.log(bookmarks);

      if (!bookmarks) return;

      setBookmarked(bookmarks);
      setIsLoading(false);
    };

    fetchBookMarks();
  }, []);

  useEffect(() => {
    const loadCalculation = async () => {
      const functions = {};

      for (const item of bookmarked) {
        console.log("item name " + item.name.replaceAll("-", ""));
        const x = await import(
          `./calculations/calculation/${item.name.replaceAll("-", "")}`
        );
        console.log("imported " + x);
        functions[item.name.replaceAll("-", "")] = x.default;
      }
      setCalculations(functions);
      console.log("state calc " + calculations);
    };

    if (bookmarked.length) {
      loadCalculation();
    }
  }, [bookmarked]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-x-20">
      {bookmarked.length !== 0 ? (
        bookmarked.map((item) => (
          <div key={item.id}>
            <GeneralCalculator
              values={item.values}
              id={item.name}
              calculate={calculations[item.name.replaceAll("-", "")]}
            />
          </div>
        ))
      ) : (
        <p>No bookmarks found.</p>
      )}
    </div>
  );
}

export default FavouriteCalculation;
