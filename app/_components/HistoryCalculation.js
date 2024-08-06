"use client";

import { ClipboardIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { deleteHistory, getHistory } from "../_lib/actions";
import toast from "react-hot-toast";

function HistoryCalculation() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const historyFetch = await getHistory();

      if (historyFetch.length > 50) {
        const over = historyFetch.slice(0, historyFetch.length - 50);

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
                className="flex flex-col gap-y-2 text-center border border-violet-300 px-10 py-4"
              >
                <div className="flex justify-between">
                  <h2 className="uppercase">{item.name.replace("-", " ")}</h2>
                  <button
                    onClick={() => handleDelete(item.inputValues, item.result)}
                  >
                    <TrashIcon className="size-6" />
                  </button>
                </div>

                {item.values.map((label, labelIndex) => (
                  <div key={labelIndex}>
                    <p>{label}</p>
                    <input
                      type="text"
                      value={item.inputValues[labelIndex]}
                      className="w-full text-center border border-violet-300"
                      readOnly
                    />
                  </div>
                ))}

                <p className="font-bold">Result</p>
                <div className="flex">
                  <input
                    type="text"
                    value={item.result}
                    className="text-center font-bold border border-violet-300"
                    readOnly
                  />

                  <button
                    className="ml-4"
                    onClick={() => {
                      navigator.clipboard.writeText(item.result);
                      toast.success("Copied to clipboard!");
                    }}
                  >
                    <ClipboardIcon className="size-6" />
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
