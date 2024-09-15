"use client";

import { ClipboardIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteHistory, getHistory } from "../_lib/actions";

function HistoryCalculation() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const historyFetch = await getHistory();

      if (historyFetch.length > 25) {
        const over = historyFetch.slice(0, historyFetch.length - 25);

        for (const item of over) {
          await deleteHistory(item.inputValues, item.result);
        }

        const updatedHistory = await getHistory();
        setHistory(updatedHistory);
      } else {
        setHistory(historyFetch);
      }

      setIsLoading(false);
    };
    fetch();
  }, []);

  async function handleDelete(y, z) {
    try {
      await deleteHistory(y, z);

      const updatedHistory = await getHistory();
      setHistory(updatedHistory);
      toast.success("Deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting from history");
    }
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {history.length !== 0 ? (
        <>
          {history
            .slice()
            .reverse()
            .map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-y-2 text-center border border-[color:var(--color-violet-300)] px-3 lg:px-8 py-4 w-full max-w-lg mx-auto"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="uppercase text-lg flex-grow text-center">
                    {item.name.replaceAll("-", " ")}
                  </h2>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() =>
                        handleDelete(item.inputValues, item.result)
                      }
                    >
                      <TrashIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {item.values.map((label, labelIndex) => (
                  <div key={labelIndex}>
                    <p>{label}</p>
                    <input
                      type="text"
                      value={
                        item.inputValues[labelIndex]
                          ? item.inputValues[labelIndex]
                          : item.result
                      }
                      className={`w-full text-center border border-[color:var(--color-violet-300)] ${
                        item.inputValues[labelIndex] === "" ? "font-bold" : ""
                      }`}
                      readOnly
                    />
                  </div>
                ))}

                <p className="font-bold">Result</p>
                <div className="flex justify-center mt-2">
                  <input
                    type="text"
                    value={item.result}
                    className="text-center font-bold border border-[color:var(--color-violet-300)] w-full max-w-xs"
                    readOnly
                  />

                  <button
                    className="ml-4"
                    onClick={() => {
                      navigator.clipboard.writeText(item.result);
                      toast.success("Copied to clipboard!");
                    }}
                  >
                    <ClipboardIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            ))}
        </>
      ) : (
        <p>No history yet.</p>
      )}
    </>
  );
}

export default HistoryCalculation;
