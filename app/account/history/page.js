import DeleteAllHistory from "@/app/_components/DeleteAllHistory";
import HistoryCalculation from "@/app/_components/HistoryCalculation";

export default async function Page() {
  return (
    <div className="flex flex-col items-center py-10 gap-y-10">
      <h1 className="text-2xl">History</h1>
      <DeleteAllHistory />
      <HistoryCalculation />
    </div>
  );
}
