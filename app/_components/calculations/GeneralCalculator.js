"use client";

import { useState } from "react";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

import FavouriteMark from "../FavouriteMark";
import { addToHistory } from "@/app/_lib/actions";

function GeneralCalculator({ values, id, calculate, desc }) {
  const [inputValues, setInputValues] = useState(values.map(() => ""));
  const [result, setResult] = useState("");

  async function handleCalc() {
    const parsedValues = inputValues.map((value) =>
      value ? parseFloat(value.replace(",", ".")) : null
    );

    const calcResult = calculate(parsedValues);

    if (!calcResult) return;

    const emptyIndex = parsedValues.findIndex((value) => value === null);
    setInputValues((prev) =>
      prev.map((val, idx) => (idx === emptyIndex ? calcResult : val))
    );
    setResult(calcResult);

    await addToHistory(id, values, inputValues, calcResult);
  }

  function handleReset() {
    setInputValues(values.map(() => ""));
    setResult("");
  }

  return (
    <div
      id={id}
      className="flex flex-col gap-y-2 text-center border border-[color:var(--color-violet-300)] px-8 py-4 w-full max-w-lg mx-auto"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="uppercase text-lg flex-grow text-center">
          {id.replaceAll("-", " ")}
        </h2>
        <div className="flex-shrink-0">
          <FavouriteMark id={id} values={values} />
        </div>
      </div>

      <p>{desc ? desc : ""}</p>

      {values.map((label, index) => (
        <div key={index}>
          <p>{label}</p>
          <input
            type="text"
            value={inputValues[index]}
            onChange={(e) => {
              const newValues = [...inputValues];
              newValues[index] = e.target.value;
              setInputValues(newValues);
            }}
            className="w-full text-center border border-[color:var(--color-violet-300)]"
          />
        </div>
      ))}

      <button
        onClick={handleCalc}
        className="border bg-[color:var(--color-violet-300)] hover:bg-[color:var(--color-violet-400)] font-bold transition-all mt-2"
        disabled={result !== ""}
      >
        Calculate
      </button>
      <div className="flex justify-center mt-2">
        <input
          type="text"
          value={result}
          className="text-center border border-[color:var(--color-violet-300)] w-full max-w-xs"
          readOnly
        />
        <button
          className="ml-4"
          onClick={() => {
            navigator.clipboard.writeText(result);
            toast.success("Copied to clipboard!");
          }}
        >
          <ClipboardIcon className="h-6 w-6" />
        </button>
      </div>
      <button
        onClick={handleReset}
        className="border bg-[color:var(--color-violet-300)] hover:bg-[color:var(--color-violet-400)] font-bold transition-all mt-2"
      >
        Reset
      </button>
    </div>
  );
}

export default GeneralCalculator;
