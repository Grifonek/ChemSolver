// Page.js
import Footer from "../_components/Footer";
import { auth } from "../_lib/auth";

export const metadata = {
  title: "Account",
  description: "Your account on ChemSolve with all the features.",
};

export default async function Page() {
  const session = await auth();

  return (
    <>
      <div className="flex justify-between items-center py-4 px-4 space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex items-center gap-x-4">
          <img
            src={session.user.image}
            alt={session.user.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 lg:w-20 lg:h-20 rounded-full"
          />
          <h1 className="text-base md:text-lg lg:text-xl">
            Welcome to <span className="font-bold">ChemSolver</span>,{" "}
            {session.user.name}
          </h1>
        </div>
        <h2 className="text-sm lg:text-base text-gray-600">
          Logged in as: {session.user.email}
        </h2>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </>
  );
}
