"use client";

import { ClipboardIcon, EqualsIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const temperatureUnits = [
  { name: "Kelvin", symbol: "K" },
  { name: "Celsius", symbol: "˚C" },
  { name: "Fahrenheit", symbol: "˚F" },
];

function ConvertingTemperature() {
  const [inputValue, setInputValue] = useState("");
  const [inputUnit, setInputUnit] = useState("Celsius ˚C");
  const [outputValue, setOutputValue] = useState("");
  const [outputUnit, setOutputUnit] = useState("Kelvin K");

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      function handleResult() {
        if (inputValue !== "") {
          const adjustedInputValue = inputValue.replace(",", ".").trim();

          const numericInputValue = parseFloat(adjustedInputValue);

          if (isNaN(numericInputValue)) {
            setOutputValue("Invalid input");
            return;
          }

          let result;

          if (inputUnit === "Celsius ˚C") {
            if (outputUnit === "Kelvin K") {
              result = numericInputValue + 273.15;
            } else if (outputUnit === "Fahrenheit ˚F") {
              result = (numericInputValue * 9) / 5 + 32;
            } else {
              result = numericInputValue;
            }
          } else if (inputUnit === "Kelvin K") {
            if (outputUnit === "Celsius ˚C") {
              result = numericInputValue - 273.15;
            } else if (outputUnit === "Fahrenheit ˚F") {
              result = ((numericInputValue - 273.15) * 9) / 5 + 32;
            } else {
              result = numericInputValue;
            }
          } else if (inputUnit === "Fahrenheit ˚F") {
            if (outputUnit === "Celsius ˚C") {
              result = ((numericInputValue - 32) * 5) / 9;
            } else if (outputUnit === "Kelvin K") {
              result = ((numericInputValue - 32) * 5) / 9 + 273.15;
            } else {
              result = numericInputValue;
            }
          }
          setOutputValue(result.toFixed(6));
        }
      }

      handleResult();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [inputUnit, inputValue, outputUnit]);

  return (
    <div className="flex flex-col text-center space-y-4">
      <h1 className="text-sm md:text-base">For converting temperature</h1>
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
            value={inputUnit}
            onChange={(e) => {
              setInputUnit(e.target.value);
            }}
          >
            {temperatureUnits.map((el) => (
              <option key={el.name}>
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
            value={outputUnit}
            onChange={(e) => {
              setOutputUnit(e.target.value);
            }}
          >
            {temperatureUnits.map((el) => (
              <option key={el.name}>
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

export default ConvertingTemperature;
