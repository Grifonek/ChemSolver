import { useState } from "react";

function FilterMenu({ onFilterChange, selectedFilterType }) {
  const [selectedFilter, setSelectedFilter] = useState(selectedFilterType);

  function handleFilterChange(filter) {
    setSelectedFilter(filter);
    onFilterChange(filter);
  }

  return (
    <div className="flex flex-col gap-y-2 w-max">
      <div>
        <label>
          <input
            type="radio"
            name="dateFilter"
            value="newest"
            checked={selectedFilter === "newest"}
            onChange={() => handleFilterChange("newest")}
          />
          Newest
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="dateFilter"
            value="oldest"
            checked={selectedFilter === "oldest"}
            onChange={() => handleFilterChange("oldest")}
          />
          Oldest
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="myMessages"
            value="myMessages"
            checked={selectedFilter === "myMessages"}
            onChange={() => handleFilterChange("myMessages")}
          />
          Mine
        </label>
      </div>
    </div>
  );
}

export default FilterMenu;
