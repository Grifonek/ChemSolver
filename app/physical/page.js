import PhysicalWrapper from "../_components/PhysicalWrapper";

export const metadata = {
  title: "Physical chemistry",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center py-10 gap-y-10">
      <h1 className="text-2xl">Physical chemistry</h1>
      <PhysicalWrapper />
    </div>
  );
}
