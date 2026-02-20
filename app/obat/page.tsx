import Link from "next/link";
import { Suspense } from "react";
import DarkModeToggle from "../DarkModeToggle";
import BackToTop from "../BackToTop";

interface DrugData {
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

const POPULAR_DRUGS = [
  { name: "aspirin", category: "Antinyeri" },
  { name: "ibuprofen", category: "Antinyeri" },
  { name: "acetaminophen", category: "Penurun Demam" },
  { name: "amoxicillin", category: "Antibiotik" },
  { name: "omeprazole", category: "Maag" },
  { name: "cetirizine", category: "Alergi" },
  { name: "loratadine", category: "Alergi" },
  { name: "metformin", category: "Diabetes" },
  { name: "vitamin+c", category: "Vitamin" },
  { name: "zinc", category: "Suplemen" },
  { name: "calcium", category: "Suplemen" },
  { name: "antacid", category: "Maag" },
];

function LoadingSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 animate-pulse"
        >
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2 mb-4"></div>
          <div className="space-y-2 mb-4">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      ))}
    </div>
  );
}

async function getObatPopuler() {
  try {
    const promises = POPULAR_DRUGS.slice(0, 12).map(async (drug) => {
      const res = await fetch(
        `https://api.fda.gov/drug/label.json?search=openfda.generic_name:${drug.name}&limit=1`,
        { cache: "no-store" },
      );
      if (!res.ok) return null;
      const data = await res.json();
      const result = data.results?.[0];
      if (!result) return null;
      return { ...result, _category: drug.category, _searchName: drug.name };
    });
    const results = await Promise.all(promises);
    return results.filter(Boolean);
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

async function ObatList() {
  const obatList = await getObatPopuler();

  return (
    <>
      <div className="mb-12 text-center animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Obat Populer & Sering Dicari
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          📊 Menampilkan{" "}
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {obatList.length}
          </span>{" "}
          obat terpopuler
        </p>
        <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full">
          <span className="text-sm text-blue-700 dark:text-blue-300">
            ⚡ Server-Side Rendering (SSR)
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {obatList.map((obat: any, index: number) => {
          const brandName =
            obat.openfda?.brand_name?.[0] ||
            obat.openfda?.generic_name?.[0] ||
            obat.openfda?.substance_name?.[0] ||
            obat._searchName?.toUpperCase() ||
            "Obat Tanpa Nama";

          const kegunaan =
            obat.indications_and_usage?.[0] ||
            obat.purpose?.[0] ||
            obat.description?.[0] ||
            "Informasi tidak tersedia";

          const kegunaanShort =
            kegunaan.length > 120
              ? kegunaan.substring(0, 120) + "..."
              : kegunaan;

          return (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative">
                <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  {obat._category}
                </span>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {brandName}
                </h3>

                {obat.openfda?.generic_name?.[0] &&
                  obat.openfda.generic_name[0] !== brandName && (
                    <p className="text-sm text-gray-400 dark:text-gray-500 mb-2 italic">
                      Generic: {obat.openfda.generic_name[0]}
                    </p>
                  )}

                {obat.openfda?.manufacturer_name?.[0] && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    🏭 {obat.openfda.manufacturer_name[0]}
                  </p>
                )}

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Kegunaan:
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {kegunaanShort}
                  </p>
                </div>

                {obat.openfda?.route?.[0] && (
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-1">
                    <span>📋</span> Cara: {obat.openfda.route[0]}
                  </p>
                )}

                <Link
                  href={`/obat/${encodeURIComponent(obat._searchName)}`}
                  className="block w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 font-semibold group-hover:scale-105"
                >
                  Lihat Detail →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {obatList.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Tidak ada data obat yang tersedia
          </p>
        </div>
      )}
    </>
  );
}

export default function ObatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-12">
        <Suspense fallback={<LoadingSkeleton />}>
          <ObatList />
        </Suspense>
      </main>

      <DarkModeToggle />
      <BackToTop />
    </div>
  );
}
