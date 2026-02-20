import Link from "next/link";
import DarkModeToggle from "../../DarkModeToggle";
import BackToTop from "../../BackToTop";

interface DrugDetail {
  openfda?: {
    brand_name?: string[];
    generic_name?: string[];
    manufacturer_name?: string[];
    substance_name?: string[];
    route?: string[];
    pharm_class_epc?: string[];
  };
  indications_and_usage?: string[];
  purpose?: string[];
  description?: string[];
  active_ingredient?: string[];
  warnings?: string[];
  dosage_and_administration?: string[];
  adverse_reactions?: string[];
  contraindications?: string[];
  drug_interactions?: string[];
  storage_and_handling?: string[];
}

async function getObatDetail(searchName: string) {
  try {
    // Search di multiple fields
    const queries = [
      `openfda.generic_name:"${searchName}"`,
      `openfda.brand_name:"${searchName}"`,
      `openfda.substance_name:"${searchName}"`,
    ];

    for (const query of queries) {
      try {
        const res = await fetch(
          `https://api.fda.gov/drug/label.json?search=${query}&limit=1`,
          { cache: "no-store" },
        );

        if (res.ok) {
          const data = await res.json();
          if (data.results && data.results.length > 0) {
            return data.results[0];
          }
        }
      } catch (e) {
        continue;
      }
    }

    return null;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export default async function ObatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const searchName = decodeURIComponent(id);
  const obat: DrugDetail | null = await getObatDetail(searchName);

  if (!obat) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <main className="flex-grow container mx-auto px-4 py-12 text-center">
          <div className="text-8xl mb-6 animate-bounce">😕</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Obat tidak ditemukan
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Maaf, informasi obat yang Anda cari tidak tersedia
          </p>
          <Link
            href="/obat"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:scale-105 font-semibold"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Kembali ke Katalog
          </Link>
        </main>
        <DarkModeToggle />
        <BackToTop />
      </div>
    );
  }

  const brandName =
    obat.openfda?.brand_name?.[0] ||
    obat.openfda?.generic_name?.[0] ||
    obat.openfda?.substance_name?.[0] ||
    searchName.toUpperCase();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link
            href="/obat"
            className="inline-flex items-center gap-2 mb-6 text-blue-600 dark:text-blue-400 hover:gap-3 transition-all font-medium group"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Kembali ke Katalog
          </Link>

          {/* Header Card */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 md:p-12 mb-8 text-white shadow-2xl animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
              {brandName}
            </h1>

            <div className="grid md:grid-cols-2 gap-4 text-sm md:text-base">
              {obat.openfda?.generic_name?.[0] && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-white/70">Generic:</span>
                  <span className="font-semibold">
                    {obat.openfda.generic_name[0]}
                  </span>
                </div>
              )}

              {obat.openfda?.manufacturer_name?.[0] && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-white/70">🏭 Produsen:</span>
                  <span className="font-semibold">
                    {obat.openfda.manufacturer_name[0]}
                  </span>
                </div>
              )}

              {obat.openfda?.route?.[0] && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-white/70">📋 Cara Penggunaan:</span>
                  <span className="font-semibold">{obat.openfda.route[0]}</span>
                </div>
              )}

              {obat.openfda?.pharm_class_epc?.[0] && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-white/70">💊 Kelas:</span>
                  <span className="font-semibold">
                    {obat.openfda.pharm_class_epc[0]}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Info Sections */}
          <div className="space-y-6">
            {/* Kegunaan */}
            {(obat.indications_and_usage?.[0] || obat.purpose?.[0]) && (
              <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Kegunaan & Indikasi
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {obat.indications_and_usage?.[0] || obat.purpose?.[0]}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Dosis */}
            {obat.dosage_and_administration?.[0] && (
              <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">💊</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Dosis & Cara Penggunaan
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {obat.dosage_and_administration[0]}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Peringatan */}
            {obat.warnings?.[0] && (
              <div className="group bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 md:p-8 border-2 border-yellow-400 dark:border-yellow-600 shadow-lg hover:shadow-2xl transition-all animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-yellow-900 dark:text-yellow-200 mb-4">
                      Peringatan Penting
                    </h2>
                    <p className="text-yellow-800 dark:text-yellow-300 leading-relaxed whitespace-pre-line">
                      {obat.warnings[0]}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Efek Samping */}
            {obat.adverse_reactions?.[0] && (
              <div className="group bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl p-6 md:p-8 border-2 border-red-400 dark:border-red-600 shadow-lg hover:shadow-2xl transition-all animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🚨</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-red-900 dark:text-red-200 mb-4">
                      Efek Samping
                    </h2>
                    <p className="text-red-800 dark:text-red-300 leading-relaxed whitespace-pre-line">
                      {obat.adverse_reactions[0]}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Kontraindikasi */}
            {obat.contraindications?.[0] && (
              <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-orange-300 dark:border-orange-600 animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🚫</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Kontraindikasi
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {obat.contraindications[0]}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Interaksi Obat */}
            {obat.drug_interactions?.[0] && (
              <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all border border-purple-200 dark:border-purple-700 animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">💊</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Interaksi dengan Obat Lain
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {obat.drug_interactions[0]}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Penyimpanan */}
            {obat.storage_and_handling?.[0] && (
              <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all border border-green-200 dark:border-green-700 animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">📦</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Penyimpanan & Penanganan
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {obat.storage_and_handling[0]}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bahan Aktif */}
            {obat.active_ingredient?.[0] && (
              <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-200 dark:border-gray-700 animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🧪</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Bahan Aktif
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {obat.active_ingredient[0]}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Back Button Bottom */}
          <div className="mt-12 text-center">
            <Link
              href="/obat"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:scale-105 font-semibold"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Kembali ke Katalog
            </Link>
          </div>
        </div>
      </main>

      <DarkModeToggle />
      <BackToTop />
    </div>
  );
}
