import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { auth } from "../_lib/auth";

async function DevelopmentNotification() {
  const session = await auth();

  return (
    <div className="border border-[color:var(--color-violet-400)] px-2 py-1.5 xl:px-4 xl:py-3 max-xl:mx-2 space-y-2">
      <h2 className="text-base md:text-lg xl:text-xl">
        <strong>NOTE: </strong>
        ChemSolver is still under development, some information is missing, some
        may be wrong!
      </h2>
      <h3 className="text-sm xl:text-base">
        If you find something wrong or want to add some calculation, feature
        etc., than feel free to write it in the discussion :D
      </h3>
      <Link
        href={session ? "/account/discussion" : "/account"}
        className="flex justify-end items-center gap-x-2 font-bold xl:mt-2 text-base md:text-lg xl:text-xl"
      >
        Go to discussion
        <ArrowLongRightIcon className="size-6" />
      </Link>
    </div>
  );
}

export default DevelopmentNotification;
