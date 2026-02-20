"use client";

import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle"; // Saya masukkan lagi sesuai keinginan kamu
import BackToTop from "./BackToTop";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500 relative">
      {/* --- FIXED BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/apotik-bg.png"
          alt="Apotikita Background"
          className="w-full h-full object-cover opacity-40 dark:opacity-20 blur-[1px]"
        />
        {/* Overlay agar teks tetap kontras */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white dark:from-gray-950/90 dark:via-transparent dark:to-gray-950 backdrop-blur-[2px]"></div>
      </div>

      {/* --- CONTENT WRAPPER --- */}
      <main className="relative z-10 container mx-auto px-6 pt-32 md:pt-48 pb-16">
        {/* Animated Blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-400/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        {/* --- HERO SECTION --- */}
        <section className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 mb-8 animate-fade-in shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Data FDA Real-time
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter animate-fade-in leading-[1.1]">
              Cari Obat <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-purple-400">
                Tanpa Ragu.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in [animation-delay:200ms] font-medium">
              Akses informasi medis terlengkap mulai dari dosis hingga efek
              samping dalam satu genggaman. Cepat, akurat, dan terpercaya.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fade-in [animation-delay:400ms]">
              <Link
                href="/cari"
                className="group relative px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-blue-500/20"
              >
                <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10 flex items-center gap-2">
                  Mulai Sekarang 🔍
                </span>
              </Link>

              <Link
                href="/obat"
                className="px-10 py-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm"
              >
                Katalog Obat
              </Link>
            </div>
          </div>
        </section>

        {/* --- BENTO GRID FEATURES --- */}
        <section className="py-32">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-full">
            <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden bg-gradient-to-br from-blue-600/90 to-indigo-700/90 backdrop-blur-md rounded-[2.5rem] p-10 text-white shadow-2xl transition-all border border-white/10">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="text-5xl mb-6">🏥</div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    Database Resmi FDA
                  </h3>
                  <p className="text-blue-100 text-lg leading-relaxed max-w-xs">
                    Kami mengambil data langsung dari openFDA untuk memastikan
                    informasi yang Anda terima valid.
                  </p>
                </div>
                <div className="mt-8">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium">
                    Verified Source
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/20 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Akses 24/7
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Kapanpun Anda membutuhkan informasi obat, kami siap
                    membantu.
                  </p>
                </div>
                <div className="text-4xl">⚡</div>
              </div>
            </div>

            <div className="md:col-span-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-[2.5rem] p-8 flex flex-col items-center text-center justify-center border border-white/20 dark:border-gray-700 shadow-xl">
              <div className="text-4xl mb-4">📖</div>
              <h3 className="font-bold text-gray-900 dark:text-white">
                Panduan Dosis
              </h3>
            </div>

            <div className="md:col-span-1 bg-red-50/70 dark:bg-red-900/40 backdrop-blur-md rounded-[2.5rem] p-8 flex flex-col items-center text-center justify-center border border-red-100 dark:border-red-900/30 shadow-xl">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="font-bold text-red-600 dark:text-red-400">
                Keamanan
              </h3>
            </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl pt-20 pb-10 border-t border-gray-100 dark:border-gray-800 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white uppercase italic">
              Apotikita
            </span>
          </div>
          <div className="flex justify-center gap-10 mb-10 text-sm font-semibold text-gray-600 dark:text-gray-400">
            <Link href="/cari" className="hover:text-blue-600 transition">
              Cari
            </Link>
            <Link href="/obat" className="hover:text-blue-600 transition">
              Katalog
            </Link>
            <Link href="/tentang" className="hover:text-blue-600 transition">
              Tentang
            </Link>
          </div>
          <div className="text-xs text-gray-400 border-t border-gray-50 dark:border-gray-800 pt-8">
            © 2026 Apotikita. Built with Passion & Data FDA.
          </div>
        </div>
      </footer>

      {/* Komponen interaktif diletakkan paling bawah */}
      <DarkModeToggle />
      <BackToTop />
    </div>
  );
}
