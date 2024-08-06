import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";

function Header() {
  return (
    <header className="bg-violet-300 font-semibold">
      <div className="flex justify-between items-center">
        <Link href="/" className="ml-4">
          Logo
        </Link>
        <div className="flex items-center">
          <ul className="flex space-x-6">
            <li className="hover:bg-violet-400 py-2 px-2 transition-all">
              <Link href="/anorganic">Anorganic chemistry</Link>
            </li>
            <li className="hover:bg-violet-400 py-2 px-2 transition-all">
              <Link href="/organic">Organic chemistry</Link>
            </li>
            <li className="hover:bg-violet-400 py-2 px-2 transition-all">
              <Link href="/physical">Physical chemistry</Link>
            </li>
            <li className="hover:bg-violet-400 py-2 px-2 transition-all">
              <Link href="/account" className="flex gap-3 items-center">
                <UserCircleIcon className="w-6 h-6" />
                Account
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
