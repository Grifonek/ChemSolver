"use client";

import GeneralCalculator from "./calculations/GeneralCalculator";

import amountofsubstance1 from "./calculations/calculation/amountofsubstance1";
import amountofsubstance2 from "./calculations/calculation/amountofsubstance2";
import concentration1 from "./calculations/calculation/concentration1";
import concentration2 from "./calculations/calculation/concentration2";
import density from "./calculations/calculation/density";
import massconcentration from "./calculations/calculation/massconcentration";
import mixing from "./calculations/calculation/mixing";
import molality from "./calculations/calculation/molality";
import volumeconcentration from "./calculations/calculation/volumeconcentration";

function AnorganicWrapper() {
  return (
    <div className="space-y-5 w-3/5">
      <GeneralCalculator
        values={[
          "Concentration (c) - [mol/l]",
          "Mass of substance (m) - [g]",
          "Volume of mixture (V) - [l]",
          "Molar mass of substance (M) - [g/mol]",
        ]}
        id="concentration-1"
        calculate={concentration1}
      />
      <GeneralCalculator
        values={[
          "Concentration (c) - [mol/l]",
          "Amount of substance (n) - [mol]",
          "Volume of mixture (V) - [l]",
        ]}
        id="concentration-2"
        calculate={concentration2}
      />

      <GeneralCalculator
        values={[
          "Mass concentration (w)",
          "Mass of constituent (mA) - [g]",
          "Total mass (m) - [g]",
        ]}
        id="mass-concentration"
        calculate={massconcentration}
      />
      <GeneralCalculator
        values={[
          "Volume concentration (φ)",
          "Volume of constituent (VA) - [l]",
          "Total volume (V) - [l]",
        ]}
        id="volume-concentration"
        calculate={volumeconcentration}
      />
      <GeneralCalculator
        values={[
          "Amount of substance (n) - [mol]",
          "Mass (m) - [g]",
          "Molar mass (M) - [g/mol]",
        ]}
        id="amount-of-substance-1"
        calculate={amountofsubstance1}
      />
      <GeneralCalculator
        values={[
          "Amount of substance (n) - [mol]",
          "Number of elementary entities [N]",
        ]}
        id="amount-of-substance-2"
        calculate={amountofsubstance2}
        desc="Avogadro constant NA = 6.02214076e+23 1/mol"
      />
      <GeneralCalculator
        values={[
          "Density (ρ) - [kg/m3]",
          "Mass (m) - [kg]",
          "Volume (V) - [m3]",
        ]}
        id="density"
        calculate={density}
      />
      <GeneralCalculator
        values={[
          "Molality (b) - [mol/kg]",
          "Amount of substance of solute (n) - [mol]",
          "Mass of solvent (m) - [kg]",
        ]}
        id="molality"
        calculate={molality}
      />
      <GeneralCalculator
        values={[
          "Mass 1 (m1) - [g]",
          "Mass concentration 1 (w1)",
          "Mass 2 (m2) - [g]",
          "Mass concentration 2 (w2)",
          "Mass concentration 3 (w3)",
        ]}
        id="mixing-1"
        calculate={mixing}
      />
      <GeneralCalculator
        values={[
          "Concentration 1 (c1) - [mol/l]",
          "Volume 1 (V1) - [l]",
          "Concentration 2 (c2) - [mol/l]",
          "Volume 2 (V2) - [l]",
          "Concentration 3 (c3) - [mol/l]",
        ]}
        id="mixing-2"
        calculate={mixing}
      />
    </div>
  );
}

export default AnorganicWrapper;
