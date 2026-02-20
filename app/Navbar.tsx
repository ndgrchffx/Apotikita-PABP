"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Katalog", href: "/obat" },
    { name: "Tentang", href: "/tentang" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border-b border-white/20 dark:border-gray-800/50 shadow-sm dark:shadow-none transition-all">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-black tracking-tighter text-gray-900 dark:text-white uppercase italic"
        >
          <span className="text-blue-600 dark:text-blue-400 text-3xl"></span>
          Apotikita
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                pathname === link.href
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Tombol Cari Obat */}
          <Link
            href="/cari"
            className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            Cari Obat 🔍
          </Link>

          {/* SEKARANG DI PALING UJUNG KANAN */}
          <div id="google_translate_element" className="translate-widget"></div>
        </div>
      </div>
    </nav>
  );
}
