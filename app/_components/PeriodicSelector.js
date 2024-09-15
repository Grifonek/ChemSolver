import { useState } from "react";

function PeriodicSelector({ filter, onFilterChange }) {
  const [selectedFilter, setSelectedFilter] = useState(filter);

  function handleFilterChange(param) {
    const newFilter = selectedFilter === param ? null : param;
    setSelectedFilter(newFilter);
    onFilterChange(newFilter);
  }

  return (
    <div className="grid grid-cols-4 md:gap-x-3 gap-y-1 max-md:text-sm">
      <div>
        <label>
          <input
            type="checkbox"
            name="periodicFilter"
            value="nonmetal"
            checked={selectedFilter === "nonmetal"}
            onChange={() => handleFilterChange("nonmetal")}
            className="mr-0.5 md:mr-2"
          />
          Nonmetals
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="periodicFilter"
            value="halogen"
            checked={selectedFilter === "halogen"}
            onChange={() => handleFilterChange("halogen")}
            className="mr-0.5 md:mr-2"
          />
          Halogens
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="periodicFilter"
            value="noble gas"
            checked={selectedFilter === "noble gas"}
            onChange={() => handleFilterChange("noble gas")}
            className="mr-0.5 md:mr-2"
          />
          Noble gases
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="periodicFilter"
            value="alkali metal"
            checked={selectedFilter === "alkali metal"}
            onChange={() => handleFilterChange("alkali metal")}
            className="mr-0.5 md:mr-2"
          />
          Alkali metals
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="periodicFilter"
            value="alkaline earth metal"
            checked={selectedFilter === "alkaline earth metal"}
            onChange={() => handleFilterChange("alkaline earth metal")}
            className="mr-0.5 md:mr-2"
          />
          Alkaline earth metals
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="periodicFilter"
            value="post-transition metal"
            checked={selectedFilter === "post-transition metal"}
            onChange={() => handleFilterChange("post-transition metal")}
            className="mr-0.5 md:mr-2"
          />
          Post transition metals
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="periodicFilter"
            value="metalloid"
            checked={selectedFilter === "metalloid"}
            onChange={() => handleFilterChange("metalloid")}
            className="mr-0.5 md:mr-2"
          />
          Metaloids
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="periodicFilter"
            value="transition metal"
            checked={selectedFilter === "transition metal"}
            onChange={() => handleFilterChange("transition metal")}
            className="mr-0.5 md:mr-2"
          />
          Transition metals
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="periodicFilter"
            value="lanthanide"
            checked={selectedFilter === "lanthanide"}
            onChange={() => handleFilterChange("lanthanide")}
            className="mr-0.5 md:mr-2"
          />
          Lanthanides
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="periodicFilter"
            value="actinide"
            checked={selectedFilter === "actinide"}
            onChange={() => handleFilterChange("actinide")}
            className="mr-0.5 md:mr-2"
          />
          Actinides
        </label>
      </div>
    </div>
  );
}

export default PeriodicSelector;
