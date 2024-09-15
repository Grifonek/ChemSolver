import ConvertingTemperature from "../_components/ConvertingTemperature";
import ConvertingWithPrefixes from "../_components/ConvertingWithPrefixes";

export const metadata = {
  title: "Unit converter",
  description:
    "Unit converter is here to help you if you struggle with converting between different units,",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center py-5 xl:py-10 gap-y-5 xl:gap-y-10">
      <h1 className="text-xl xl:text-2xl">Unit converter</h1>

      <ConvertingWithPrefixes />
      <ConvertingTemperature />
    </div>
  );
}
