"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import DarkModeToggle from "../DarkModeToggle";
import BackToTop from "../BackToTop";

interface SearchResult {
  openfda?: {
    brand_name?: string[];
    generic_name?: string[];
    manufacturer_name?: string[];
    substance_name?: string[];
    route?: string[];
  };
  indications_and_usage?: string[];
  purpose?: string[];
  description?: string[];
  active_ingredient?: string[];
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get("q");

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // 1. Efek untuk menangkap perubahan URL (misal dari Navbar)
  useEffect(() => {
    if (queryParam) {
      setSearchTerm(queryParam);
      searchObat(queryParam);
    }
  }, [queryParam]);

  const searchObat = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch(
        `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${query}*&limit=10`,
      );
      if (res.ok) {
        const data = await res.json();
        setResults(data.results || []);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error searching:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // 2. Fungsi Search Manual (mengupdate URL & hasil sekaligus)
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const timeoutId = setTimeout(() => {
      searchObat(value);
      // Update URL supaya sinkron dengan input manual
      if (value.trim()) {
        router.replace(`/cari?q=${encodeURIComponent(value)}`, {
          scroll: false,
        });
      } else {
        router.replace(`/cari`, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  return (
    <>
      {/* Header - Z-index aman agar tidak menutupi klik */}
      <div className="relative z-20 text-center mb-8 md:mb-12 animate-fade-in px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          🔍 Pencarian Obat
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Temukan informasi obat yang Anda cari dengan cepat
        </p>
        <span className="text-sm text-blue-700 dark:text-blue-300">
          ⚡ Client-Side Rendering (CSR)
        </span>
      </div>

      {/* Search Bar - Z-index paling tinggi */}
      <div className="relative z-30 max-w-2xl mx-auto mb-8 px-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Ketik nama obat..."
            className="w-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 transition-all shadow-lg"
          />
          {loading && (
            <div className="absolute right-4 top-3 md:top-4">
              <div className="animate-spin h-5 w-5 md:h-6 md:w-6 border-2 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="relative z-10 max-w-5xl mx-auto px-4">
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin h-12 w-12 border-4 border-blue-500 rounded-full border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Mencari obat...</p>
          </div>
        )}

        {!loading && hasSearched && results.length === 0 && searchTerm && (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-5xl md:text-6xl mb-4">😔</div>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-semibold mb-2">
              Tidak ada hasil untuk &quot;{searchTerm}&quot;
            </p>
          </div>
        )}

        {!loading && results.length > 0 && searchTerm && (
          <div className="animate-fade-in">
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-base md:text-lg">
              Ditemukan{" "}
              <span className="font-bold text-blue-600">{results.length}</span>{" "}
              hasil
            </p>

            {/* Grid Responsif: 1 kolom di HP, 2 kolom di Tablet/Laptop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
              {results.map((obat, index) => {
                const brandName =
                  obat.openfda?.brand_name?.[0] || "Obat Tanpa Nama";
                const kegunaan =
                  obat.indications_and_usage?.[0] || "Informasi tidak tersedia";
                const detailSlug = obat.openfda?.generic_name?.[0] || brandName;

                return (
                  <div
                    key={index}
                    className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700 flex flex-col h-full hover:shadow-xl transition-all"
                  >
                    <div className="relative z-10 flex flex-col h-full">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {brandName}
                      </h3>

                      <div className="flex-grow">
                        <p className="text-xs text-gray-400 mb-2 italic">
                          {obat.openfda?.manufacturer_name?.[0] ||
                            "Produsen tidak diketahui"}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                          {kegunaan}
                        </p>
                      </div>

                      {/* Tombol Lihat Detail */}
                      <Link
                        href={`/obat/${encodeURIComponent(detailSlug)}`}
                        className="relative z-20 block w-full text-center bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
                      >
                        Lihat Detail Lengkap →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* State Awal saat belum mengetik apapun */}
        {!hasSearched && !loading && (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-7xl mb-6">🔍</div>
            <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">
              Siap mencari informasi obat?
            </h2>
            <p className="text-gray-500">
              Ketik nama brand atau kandungan aktif di atas.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default function CariPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <main className="flex-grow container mx-auto py-8">
        <Suspense
          fallback={<div className="text-center py-20">Memuat halaman...</div>}
        >
          <SearchContent />
        </Suspense>
      </main>
      <DarkModeToggle />
      <BackToTop />
    </div>
  );
}
