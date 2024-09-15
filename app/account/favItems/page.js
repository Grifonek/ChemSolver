import FavouriteCalculation from "@/app/_components/FavouriteCalculation";

export const metadata = {
  title: "Favourite items",
  description:
    "All bookmarked calculations on one place to get faster results.",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center py-5 xl:py-10 gap-y-5 xl:gap-y-10">
      <h1 className="text-xl xl:text-2xl">Your favourite items</h1>
      <div>
        <FavouriteCalculation />
      </div>
    </div>
  );
}
