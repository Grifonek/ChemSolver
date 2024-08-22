"use client";

import { useState } from "react";
import PeriodicSelector from "./PeriodicSelector";
import PeriodicTable from "./PeriodicTable";
import elements from "./elements/elements.json";

function PeriodicTableWrapper() {
  const [filter, setFilter] = useState(null);

  function onFilterChange(selectedFilter) {
    setFilter(selectedFilter);
  }

  return (
    <div>
      <PeriodicTable
        elements={elements}
        filter={filter}
        selectorComponent={
          <PeriodicSelector onFilterChange={onFilterChange} filter={filter} />
        }
      />
    </div>
  );
}

export default PeriodicTableWrapper;
