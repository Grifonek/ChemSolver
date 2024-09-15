"use client";

import { ClipboardIcon, EqualsIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const prefixes = [
  { name: "yocto", symbol: "y", value: -24 },
  { name: "zepto", symbol: "z", value: -21 },
  { name: "atto", symbol: "a", value: -18 },
  { name: "femto", symbol: "f", value: -15 },
  { name: "piko", symbol: "p", value: -12 },
  { name: "nano", symbol: "n", value: -9 },
  { name: "mikro", symbol: "μ", value: -6 },
  { name: "mili", symbol: "m", value: -3 },
  { name: "base", symbol: "", value: 0 },
  { name: "kilo", symbol: "k", value: 3 },
  { name: "mega", symbol: "M", value: 6 },
  { name: "giga", symbol: "G", value: 9 },
  { name: "tera", symbol: "T", value: 12 },
  { name: "peta", symbol: "P", value: 15 },
  { name: "exa", symbol: "E", value: 18 },
  { name: "zetta", symbol: "Z", value: 21 },
  { name: "yotta", symbol: "Y", value: 24 },
];

function ConvertingWithPrefixes() {
  const [inputValue, setInputValue] = useState("");
  const [inputPrefix, setInputPrefix] = useState(0);
  const [outputValue, setOutputValue] = useState("");
  const [outputPrefix, setOutputPrefix] = useState(0);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      function handleResult() {
        if (inputValue !== "") {
          const adjustedInputValue = inputValue.replace(",", ".").trim();
          const numericInputValue = parseFloat(adjustedInputValue);
          const factor = Math.pow(10, inputPrefix - outputPrefix);
          setOutputValue((numericInputValue * factor).toString());
        }
      }
      handleResult();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [inputValue, inputPrefix, outputPrefix]);

  return (
    <div className="flex flex-col text-center space-y-4">
      <h1 className="text-sm md:text-base">
        For converting between same unit (kg, m, etc.)
      </h1>
      <div className="flex items-center max-lg:flex-col space-x-4">
        <div className="space-x-4">
          <input
            className="border border-[color:var(--color-violet-300)] max-md:w-36"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <select
            className="text-center bg-[color:var(--color-violet-300)]"
            value={inputPrefix}
            onChange={(e) => {
              setInputPrefix(Number(e.target.value));
            }}
          >
            {prefixes.map((el) => (
              <option key={el.value} value={el.value}>
                {el.name} {el.symbol}
              </option>
            ))}
          </select>
        </div>
        <EqualsIcon className="size-6" />
        <div className="flex items-center space-x-4">
          <input
            className="border border-[color:var(--color-violet-300)] max-md:w-36"
            type="text"
            value={inputValue !== "" ? outputValue : ""}
            readOnly
          />
          <select
            className="text-center bg-[color:var(--color-violet-300)]"
            value={outputPrefix}
            onChange={(e) => {
              setOutputPrefix(Number(e.target.value));
            }}
          >
            {prefixes.map((el) => (
              <option key={el.value} value={el.value}>
                {el.name} {el.symbol}
              </option>
            ))}
          </select>
          <button
            className="ml-4"
            onClick={() => {
              navigator.clipboard.writeText(outputValue);
              toast.success("Copied to clipboard!");
            }}
          >
            <ClipboardIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConvertingWithPrefixes;
