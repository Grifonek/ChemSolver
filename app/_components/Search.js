"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { searchMappings } from "../_lib/searchMappings";

function normalizeQuery(query) {
  return query.trim().toLowerCase().replace(/\s+/g, " ");
}

function Search() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") {
        setSuggestions([]);
      }
    }

    function handleClickOutside(e) {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target)
      ) {
        setSuggestions([]);
      }
    }

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleSearch() {
    const normalizedQuery = normalizeQuery(query);

    if (normalizedQuery && searchMappings[normalizedQuery]) {
      router.push(searchMappings[normalizedQuery]);
    } else {
      setQuery("");
      setSuggestions([]);
      toast.error("Calculation not found!");
    }
  }

  function handleChange(e) {
    const value = e.target.value;
    const normalizedValue = normalizeQuery(value);

    setQuery(value);

    if (value === "") {
      setSuggestions([]);
    } else {
      setSuggestions(
        Object.keys(searchMappings).filter((key) =>
          key.includes(normalizedValue)
        )
      );
    }
  }

  function handleSuggestionClick(suggestion) {
    setQuery(suggestion);
    setSuggestions([]);
    router.push(searchMappings[normalizeQuery(suggestion)]);
  }

  return (
    <div className="relative w-80">
      <input
        type="text"
        placeholder="Search"
        className="w-full text-center border border-[color:var(--color-violet-300)]"
        value={query}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        ref={inputRef}
      />
      {suggestions.length > 0 && (
        <ul
          className="absolute left-0 right-0 bg-white border border-[color:var(--color-violet-300)] mt-1"
          ref={suggestionsRef}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="cursor-pointer p-2 text-black hover:bg-[color:var(--color-violet-400)]"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
