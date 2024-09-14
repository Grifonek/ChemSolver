"use client";

import GeneralCalculator from "./calculations/GeneralCalculator";

import energy1 from "./calculations/calculation/energyofphoton1";
import energy2 from "./calculations/calculation/energyofphoton2";
import idealgaslaw from "./calculations/calculation/idealgaslaw";
import wavelength from "./calculations/calculation/wavelength";

function PhysicalWrapper() {
  return (
    <div className="space-y-5 w-3/5">
      <GeneralCalculator
        values={[
          "Pressure (p) - [Pa]",
          "Volume (V) - [m3]",
          "Amount of substance (n) - [mol]",
          "Temperature (T) - [K]",
        ]}
        id="ideal-gas-law"
        calculate={idealgaslaw}
        desc="Gass constant R = 8.314 J/K.mol"
      />
      <GeneralCalculator
        values={[
          "Wavelength (λ) - [m]",
          "Mass (m) - [kg]",
          "Speed (v) - [m/s]",
        ]}
        id="wavelength"
        calculate={wavelength}
        desc="Planck constant h = 6.626e-34 J.s"
      />
      <GeneralCalculator
        values={[
          "Energy of photon (E) - [J]",
          "Frequency of photon (v) - [1/s]",
        ]}
        id="energy-of-photon-1"
        calculate={energy1}
        desc="Planck constant h = 6.626e-34 J.s"
      />
      <GeneralCalculator
        values={["Energy of photon (E) - [J]", "Wavelength (λ) - [m]"]}
        id="energy-of-photon-2"
        calculate={energy2}
        desc="Planck constant h = 6.626e-34 J.s, Speed of light c = 299792458 m/s"
      />
    </div>
  );
}

export default PhysicalWrapper;
