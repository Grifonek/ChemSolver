import { auth } from "../_lib/auth";

export default async function Page() {
  const session = await auth();

  return (
    <div className="flex justify-between items-center py-4 px-4">
      <div className="flex items-center gap-x-4">
        <img
          src={session.user.image}
          alt={session.user.name}
          referrerPolicy="no-referrer"
          className="size-20 rounded-full"
        />
        <h1>
          Welcome to <span className="font-bold">ChemSolver</span>,{" "}
          {session.user.name}
        </h1>
      </div>
      <h2>Logged as: {session.user.email}</h2>
    </div>
  );
}
