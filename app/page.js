import Link from "next/link";
import Search from "./_components/Search";

export default function Page() {
  return (
    <main className="text-xl flex items-center justify-center mt-24">
      <div className="flex flex-col text-center items-center gap-y-10">
        <div>
          <h1 className="text-8xl">ChemSolver</h1>
          <h2 className="py-3 text-3xl">A way for easier chemistry</h2>
        </div>
        <h3>Search for a chemical calculation...</h3>
        <Search />
        <h3>...or</h3>
        <Link
          href="/account"
          className="bg-[color:var(--color-violet-300)] px-6 py-4 font-semibold text-lg hover:bg-[color:var(--color-violet-400)] transition-all"
        >
          Go to your account
        </Link>
      </div>
    </main>
  );
}
