import DeleteAllHistory from "@/app/_components/DeleteAllHistory";
import HistoryCalculation from "@/app/_components/HistoryCalculation";

export const metadata = {
  title: "History",
  description: "History of all calculations you have done on ChemSolver.",
};

export default async function Page() {
  return (
    <div className="flex flex-col items-center py-5 xl:py-10 gap-y-5 xl:gap-y-10">
      <h1 className="text-xl xl:text-2xl">History</h1>
      <DeleteAllHistory />
      <HistoryCalculation />
    </div>
  );
}
