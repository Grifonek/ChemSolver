import Link from "next/link";
import { BookmarkIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import SignOutButton from "./SignOutButton";

function SideNavigation() {
  return (
    <nav className="flex flex-col items-center">
      <ul className="flex flex-col gap-6 mt-24">
        <li className="hover:bg-violet-400 transition-all font-semibold border-r border-r-violet-300">
          <Link
            href="/account/favItems"
            className="flex items-center gap-4 py-6 px-5 h-full w-full"
          >
            <BookmarkIcon className="size-6" />
            Favourite items
          </Link>
        </li>
        <li className="hover:bg-violet-400 transition-all font-semibold border-r border-r-violet-300">
          <Link
            href="/account/history"
            className="flex items-center gap-4 py-6 px-5 h-full w-full"
          >
            <ArrowPathIcon className="size-6" />
            History
          </Link>
        </li>
        <li className="hover:bg-violet-400 transition-all font-semibold border-r border-r-violet-300">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
