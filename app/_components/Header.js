"use client";

import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import ToggleDarkMode from "./ToggleDarkMode";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenMenu() {
    setIsOpen(!isOpen);
  }

  function handleCloseMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <header className="bg-[color:var(--color-violet-300)] font-semibold">
      <div className="flex justify-between items-center">
        <Link href="/" className="xl:ml-4">
          <Logo />
        </Link>

        <div className="flex items-center text-sm xl:text-base">
          {/* Desktop Menu */}
          <ul className="hidden lg:flex xl:space-x-3 items-center">
            <li className="hover:bg-[color:var(--color-violet-400)] py-2 px-2 transition-all list-none">
              <Link href="/anorganic">Anorganic chemistry</Link>
            </li>
            <li className="hover:bg-[color:var(--color-violet-400)] py-2 px-2 transition-all list-none">
              <Link href="/physical">Physical chemistry</Link>
            </li>
            <li className="hover:bg-[color:var(--color-violet-400)] py-2 px-2 transition-all list-none">
              <Link href="/periodicTable">Periodic Table</Link>
            </li>
            <li className="hover:bg-[color:var(--color-violet-400)] py-2 px-2 transition-all list-none">
              <Link href="/unitConverter">Unit converter</Link>
            </li>
            <li className="hover:bg-[color:var(--color-violet-400)] py-2 px-2 transition-all list-none">
              <Link href="/equationBalancer">Equation Balancer</Link>
            </li>
            <li className="mt-1 list-none">
              <ToggleDarkMode />
            </li>
            <li className="hover:bg-[color:var(--color-violet-400)] py-2 px-2 transition-all list-none">
              <Link href="/account" className="flex gap-3 items-center">
                <UserCircleIcon className="w-6 h-6" />
                Account
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="lg:hidden cursor-pointer" onClick={handleOpenMenu}>
            <Bars3Icon className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w:2/3 lg:w-1/3 bg-[color:var(--color-violet-300)] shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between m-4">
          <li className="mt-1 list-none">
            <ToggleDarkMode />
          </li>
          <XMarkIcon
            className="w-6 h-6 cursor-pointer"
            onClick={handleCloseMenu}
          />
        </div>
        <ul className="flex flex-col items-center space-y-4 mt-6 lg:px-4">
          <li
            className="hover:bg-[color:var(--color-violet-400)] py-2 px-1 transition-all cursor-pointer list-none"
            onClick={handleCloseMenu}
          >
            <Link href="/anorganic">Anorganic chemistry</Link>
          </li>
          <li
            className="hover:bg-[color:var(--color-violet-400)] py-2 px-1 transition-all cursor-pointer list-none"
            onClick={handleCloseMenu}
          >
            <Link href="/physical">Physical chemistry</Link>
          </li>
          <li
            className="hover:bg-[color:var(--color-violet-400)] py-2 px-1 transition-all cursor-pointer list-none"
            onClick={handleCloseMenu}
          >
            <Link href="/periodicTable">Periodic Table</Link>
          </li>
          <li
            className="hover:bg-[color:var(--color-violet-400)] py-2 px-1 transition-all cursor-pointer list-none"
            onClick={handleCloseMenu}
          >
            <Link href="/unitConverter">Unit converter</Link>
          </li>
          <li
            className="hover:bg-[color:var(--color-violet-400)] py-2 px-1 transition-all cursor-pointer list-none"
            onClick={handleCloseMenu}
          >
            <Link href="/equationBalancer">Equation Balancer</Link>
          </li>
          <li
            className="hover:bg-[color:var(--color-violet-400)] py-2 px-1 transition-all cursor-pointer list-none"
            onClick={handleCloseMenu}
          >
            <Link href="/account" className="flex gap-3 items-center">
              <UserCircleIcon className="w-6 h-6" />
              Account
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
