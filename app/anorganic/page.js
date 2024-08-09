"use client";

import concentration from "../_components/calculations/calculation/concentration";
import idealgaslaw from "../_components/calculations/calculation/idealgaslaw";
import GeneralCalculator from "../_components/calculations/GeneralCalculator";

export default function Page() {
  return (
    <div className="flex flex-col items-center py-10 gap-y-10">
      <h1 className="text-2xl">Anorganic chemistry</h1>
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
