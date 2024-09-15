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
        const x = await import(
          `./calculations/calculation/${item.name.replaceAll("-", "")}`
        );
        functions[item.name.replaceAll("-", "")] = x.default;
      }
      setCalculations(functions);
    };

    if (bookmarked.length) {
      loadCalculation();
    }
  }, [bookmarked]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {bookmarked.length !== 0 ? (
        <div className="grid md:grid-cols-2 gap-x-20 gap-y-5">
          {bookmarked.map((item) => (
            <div key={item.id}>
              <GeneralCalculator
                values={item.values}
                id={item.name}
                calculate={calculations[item.name.replaceAll("-", "")]}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No bookmarks found.</p>
      )}
    </div>
  );
}

export default FavouriteCalculation;
