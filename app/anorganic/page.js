import AnorganicWrapper from "../_components/AnorganicWrapper";

export const metadata = {
  title: "Anorganic chemistry",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center py-10 gap-y-10">
      <h1 className="text-2xl">Anorganic chemistry</h1>
      <AnorganicWrapper />
    </div>
  );
}
