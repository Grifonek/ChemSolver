import PeriodicTableWrapper from "../_components/PeriodicTableWrapper";

export const metadata = {
  title: "Periodic table",
  description:
    "Interactive periodic table with a lot of information about each element.",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-2xl">Periodic table</h1>
      <PeriodicTableWrapper />
    </div>
  );
}
