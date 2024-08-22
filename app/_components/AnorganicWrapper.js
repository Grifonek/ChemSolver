"use client";

import GeneralCalculator from "./calculations/GeneralCalculator";
import concentration from "./calculations/calculation/concentration";
import idealgaslaw from "./calculations/calculation/idealgaslaw";

function AnorganicWrapper() {
  return (
    <div className="space-y-5 w-3/5">
      <GeneralCalculator
        values={[
          "Concentration [c]",
          "Mass of substance [m]",
          "Volume of mixture [V]",
          "Molar mass of substance [M]",
        ]}
        id="concentration"
        calculate={concentration}
      />
      <GeneralCalculator
        values={[
          "Pressure [p]",
          "Volume [V]",
          "Amount of substance [n]",
          "Gass constant [R]",
          "Temperature [T]",
        ]}
        id="ideal-gas-law"
        calculate={idealgaslaw}
      />
    </div>
  );
}

export default AnorganicWrapper;
