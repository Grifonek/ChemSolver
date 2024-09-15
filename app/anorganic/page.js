import AnorganicWrapper from "../_components/AnorganicWrapper";

export const metadata = {
  title: "Anorganic chemistry",
  description: "All calculations related to anorganic chemistry.",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center py-5 xl:py-10 gap-y-5 xl:gap-y-10">
      <h1 className="text-xl xl:text-2xl">Anorganic chemistry</h1>
      <AnorganicWrapper />
    </div>
  );
}
