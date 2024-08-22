import FavouriteCalculation from "@/app/_components/FavouriteCalculation";

export const metadata = {
  title: "Favourite items",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center py-10 gap-y-10">
      <h1 className="text-2xl">Your favourite items</h1>
      <div>
        <FavouriteCalculation />
      </div>
    </div>
  );
}
