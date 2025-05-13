"use client";

import { MenuIcon, X, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
    document.documentElement.classList.add("dark");
  }, [isOpen]);

  const menuItems = [
    { name: "Pricing", href: "/pricing" },
    { name: "Resources", href: "/resources" },
    { name: "Enterprise", href: "/enterprise" },
   
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] h-[56px] w-full border-b border-white/10 bg-[#0a0a0a]/70 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 h-full">
          <aside className="flex items-center gap-2">
            <Link href="/">
              <Image
                src="/logo-white.png"
                alt="logo"
                width={120}
                height={70}
                className="dark:block"
              />
            </Link>
          </aside>

          <nav className="hidden md:block">
            <ul className="flex list-none items-center gap-6 text-sm font-medium tracking-wide">
              {menuItems.slice(0, 3).map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white hover:text-violet-300 transition-colors duration-200 ease-in-out"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <aside className="flex items-center gap-2">
            <Link
              href="https://github.com/your-org/your-repo"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center text-white hover:text-violet-300 transition-colors text-xs"
            >
              <Github size={18} className="mr-1" />
              <span>13.7k</span>
            </Link>

            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded border border-white/20 bg-transparent px-3 py-1 text-xs text-white transition hover:border-violet-500 hover:text-violet-300"
            >
              Pricing
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700 transition"
            >
              Start for free
            </Link>

            <button onClick={() => setIsOpen(true)} className="md:hidden">
              <MenuIcon size={22} className="text-white" />
            </button>
          </aside>
        </div>
      </header>

      <div
        className={`fixed top-0 left-0 z-[200] h-screen w-64 transform bg-zinc-900 text-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>
        </div>
        <nav className="mt-4 flex flex-col space-y-4 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-base font-medium hover:text-violet-300 transition duration-200"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[150] bg-black/60"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
