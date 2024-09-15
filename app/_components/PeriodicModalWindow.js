import { BeakerIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";

function PeriodicModalWindow({ element, onModalClose }) {
  const modalRef = useRef(null);

  function formatElectronConfiguration(electronConfiguration) {
    return electronConfiguration.replace(/([a-zA-Z])(\d+)/g, "$1<sup>$2</sup>");
  }

  function formatYear(year) {
    const str = year.toString();
    if (str.includes("-")) {
      return str.slice(1) + " BC";
    } else {
      return str + " AD";
    }
  }

  useEffect(() => {
    function handleOutsideClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onModalClose();
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onModalClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-[color:var(--color-violet-300)] rounded-lg p-6 space-y-4 overflow-y-scroll w-4/5 h-5/6 md:w-2/3 md:h-3/4 lg:w-1/3 lg:h-2/3"
        ref={modalRef}
      >
        <div className="space-y-4">
          <h1
            className={`text-xl sm:text-2xl font-bold flex justify-between items-center gap-x-3 p-2 rounded-lg`}
            style={{
              backgroundColor: element.borderColor
                ? element.borderColor
                : "yellow",
            }}
          >
            <div className="flex items-center gap-x-3">
              <BeakerIcon className="w-6 h-6" />
              {element.name}{" "}
              <span className="text-lg sm:text-xl">({element.symbol})</span>
            </div>
            <button onClick={onModalClose}>
              <XMarkIcon className="w-6 h-6" />
            </button>
          </h1>
          <h2 className="text-lg sm:text-xl uppercase font-semibold">
            Atomic properties
          </h2>
          <p>
            <span className="font-bold">Atomic number: </span>
            {element.atomicNumber}
          </p>
          <p>
            <span className="font-bold">Period: </span>
            {element.period}
          </p>
          <p>
            <span className="font-bold">Group: </span>
            {element.group}
          </p>
          <p>
            <span className="font-bold">Block: </span>
            {element.block}
          </p>
          <p>
            <span className="font-bold">State: </span>
            {element.state}
          </p>
          <p>
            <span className="font-bold">Crystal structure: </span>
            {element.crystalStructure}
          </p>
          <p>
            <span className="font-bold">Atomic mass: </span>
            {element.atomicMass}
          </p>
          <p>
            <span className="font-bold">Density: </span>
            {element.density} kg/m<sup>3</sup>
          </p>
          <p>
            <span className="font-bold">Melting point: </span>
            {element.meltingPoint}˚C
          </p>
          <p>
            <span className="font-bold">Boiling point: </span>
            {element.boilingPoint}˚C
          </p>
          <p>
            <span className="font-bold">Electrons: </span>
            {element.atomicNumber}
          </p>
          <p>
            <span className="font-bold">Protons: </span>
            {element.atomicNumber}
          </p>
          <p>
            <span className="font-bold">Valence electrons: </span>
            {element.period}
          </p>
          <p>
            <span className="font-bold">Ionization energy: </span>
            {element.ionizationEnergy} eV
          </p>
          <p>
            <span className="font-bold">Electron affinity: </span>
            {element.electronAffinity} eV
          </p>
          <p>
            <span className="font-bold">Atomic radius: </span>
            {element.atomicRadius} pm
          </p>
          <p>
            <span className="font-bold">Electron configuration: </span>
            <span
              dangerouslySetInnerHTML={{
                __html: formatElectronConfiguration(
                  element.electronConfiguration
                ),
              }}
            />
          </p>
          <h2 className="text-lg sm:text-xl uppercase font-semibold">
            Electron properties
          </h2>
          <p>
            <span className="font-bold">Electronegativity: </span>
            {element.electronegativity}
          </p>
          <p>
            <span className="font-bold">Magnetic type: </span>
            {element.magneticType}
          </p>
          <p>
            <span className="font-bold">Electrical conductivity: </span>
            {element.electricalConductivity} MS/m
          </p>
          <p>
            <span className="font-bold">Resistivity: </span>
            {element.resistivity} nΩ⋅m
          </p>
          <h2 className="text-lg sm:text-xl uppercase font-semibold">
            Abundance
          </h2>
          <p>
            <span className="font-bold">Universe: </span>
            {element.universe}%
          </p>
          <p>
            <span className="font-bold">Sun: </span>
            {element.sun}%
          </p>
          <p>
            <span className="font-bold">Earth crust: </span>
            {element.earthCrust}%
          </p>
          <p>
            <span className="font-bold">Ocean: </span>
            {element.earthOcean}%
          </p>
          <p>
            <span className="font-bold">Human body: </span>
            {element.humanBody}%
          </p>
          <h2 className="text-lg sm:text-xl uppercase font-semibold">
            Overview
          </h2>
          <p>
            <span className="font-bold">Latin name: </span>
            {element.latinName}
          </p>
          <p>
            <span className="font-bold">Year of discovery: </span>
            <span
              dangerouslySetInnerHTML={{
                __html: formatYear(element.yearOfDiscovery),
              }}
            />
          </p>
          <p>
            <span className="font-bold">Discovered by: </span>
            {element.discoveredBy}
          </p>
          <p>
            <span className="font-bold">CAS number: </span>
            {element.CAS}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PeriodicModalWindow;
