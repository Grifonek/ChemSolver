import ConvertingTemperature from "../_components/ConvertingTemperature";
import ConvertingWithPrefixes from "../_components/ConvertingWithPrefixes";

export const metadata = {
  title: "Unit converter",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center text-center py-10 space-y-10">
      <h1 className="text-2xl">Unit converter</h1>

      <ConvertingWithPrefixes />
      <ConvertingTemperature />
    </div>
  );
}
