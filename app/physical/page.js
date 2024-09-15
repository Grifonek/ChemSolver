import PhysicalWrapper from "../_components/PhysicalWrapper";

export const metadata = {
  title: "Physical chemistry",
  description: "All calculations related to physical chemistry.",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center py-5 xl:py-10 gap-y-5 xl:gap-y-10">
      <h1 className="text-xl xl:text-2xl">Physical chemistry</h1>
      <PhysicalWrapper />
    </div>
  );
}
