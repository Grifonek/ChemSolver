import { useState } from "react";
import PeriodicModalWindow from "./PeriodicModalWindow";

function PeriodicTable({ elements, filter, selectorComponent }) {
  const [selectedElement, setSelectedElement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function onModalClose() {
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-[repeat(18,minmax(40px,1fr))] gap-2 p-4">
          {elements.map((element) => (
            <button
              key={element.symbol}
              className={`border-2 p-2 flex flex-col items-center ${
                filter === element.category ? element.color : ""
              }`}
              style={{
                gridColumn: `${element.group}`,
                gridRow: `${element.period}`,
                marginBottom: element.period === 7 ? "16px" : "0",
                borderColor: element.borderColor
                  ? element.borderColor
                  : "yellow",
              }}
              onClick={() => {
                setSelectedElement(element);
                setIsModalOpen(true);
              }}
            >
              <span className="text-lg font-bold">{element.symbol}</span>
              <span
                className="text-xs overflow-hidden whitespace-nowrap text-ellipsis max-w-full"
                style={{ maxWidth: "100%" }}
              >
                {element.name}
              </span>
              <span className="text-xs">{element.atomicNumber}</span>
            </button>
          ))}

          <div
            className="col-span-12 row-span-1 flex justify-center items-center"
            style={{ gridColumn: "2 / span 12", gridRow: "1" }}
          >
            {selectorComponent}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <PeriodicModalWindow
          element={selectedElement}
          onModalClose={onModalClose}
        />
      )}
    </>
  );
}

export default PeriodicTable;
