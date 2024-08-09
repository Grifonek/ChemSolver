"use client";

import { useState } from "react";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

import FavouriteMark from "../FavouriteMark";
import { addToHistory } from "@/app/_lib/actions";

function ThreeDivide({ values, id }) {
  const [inputValues, setInputValues] = useState(values.map(() => ""));
  const [result, setResult] = useState("");

  async function handleCalc() {
    const parsedValues = inputValues.map((value) =>
      parseFloat(value.replace(",", "."))
    );

    const calcResult = parsedValues[0] / (parsedValues[1] * parsedValues[2]);

    if (!calcResult) return;

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
      className="flex flex-col gap-y-2 text-center border border-violet-300 px-32 py-4"
    >
      <div className="flex justify-between gap-x-3 mb-2">
        <h2 className="uppercase text-lg">{id.replace("-", " ")}</h2>
        <FavouriteMark id={id} values={values} />
      </div>

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
            className="w-full text-center border border-violet-300"
          />
        </div>
      ))}

      <button
        onClick={handleCalc}
        className="border bg-violet-300 hover:bg-violet-400 font-bold transition-all"
      >
        Calculate
      </button>
      <div className="flex justify-center">
        <input
          type="text"
          value={result}
          className="text-center border border-violet-300"
          readOnly
        />
        <button
          className="ml-4"
          onClick={() => {
            navigator.clipboard.writeText(result);
            toast.success("Copied to clipboard!");
          }}
        >
          <ClipboardIcon className="size-6" />
        </button>
      </div>
      <button
        onClick={handleReset}
        className="border bg-violet-300 hover:bg-violet-400 font-bold transition-all"
      >
        Reset
      </button>
    </div>
  );
}

export default ThreeDivide;
