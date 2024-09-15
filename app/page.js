import Link from "next/link";
import Footer from "./_components/Footer";
import Search from "./_components/Search";
import DevelopmentNotification from "./_components/DevelopmentNotification";

export default function Page() {
  return (
    <main className="text-xl flex items-center justify-center mt-6 xl:mt-12">
      <div className="flex flex-col text-center items-center gap-y-5 xl:gap-y-10">
        <div>
          <h1 className="text-5xl md:text-7xl xl:text-8xl">ChemSolver</h1>
          <h2 className="py-3 text-xl md:text-2xl xl:text-3xl">
            A way for easier chemistry
          </h2>
        </div>
        <h3 className="text-base md:text-lg xl:text-xl">
          Search for a chemical calculation...
        </h3>
        <Search />
        <h3 className="text-base md:text-lg xl:text-xl">...or</h3>
        <Link
          href="/account"
          className="bg-[color:var(--color-violet-300)] px-3 py-2 xl:px-6 xl:py-4 font-semibold text-sm md:text-base xl:text-lg hover:bg-[color:var(--color-violet-400)] transition-all"
        >
          Go to your account
        </Link>
        <DevelopmentNotification />
        <Footer />
      </div>
    </main>
  );
}
