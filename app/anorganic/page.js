import TwoCalc from "../_components/TwoCalc";

export default function Page() {
  return (
    <div className="flex flex-col items-center py-10 gap-y-10">
      <h1 className="text-2xl">Anorganic chemistry</h1>
      <TwoCalc
        values={["Mass of substance", "Mass of mixture"]}
        id="mass-concentration"
      />
      <TwoCalc
        values={["Volume of substance", "Volume of mixture"]}
        id="volume-concentration"
      />
    </div>
  );
}
