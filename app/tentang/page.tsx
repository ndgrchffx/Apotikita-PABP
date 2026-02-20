import Link from "next/link";
import DarkModeToggle from "../DarkModeToggle";
import BackToTop from "../BackToTop";

const teamMembers = [
  {
    name: "Apoteker Profesional",
    role: "Tim Medis Berpengalaman",
  },
  {
    name: "Database FDA",
    role: "Sumber Data Terpercaya",
  },
  {
    name: "Update Berkala",
    role: "Informasi Terkini",
  },
];

const features = [
  {
    title: "Informasi Lengkap",
    description: "Database obat yang terintegrasi dengan openFDA API",
  },
  {
    title: "Pencarian Cepat",
    description: "Temukan obat yang Anda butuhkan dengan mudah",
  },
  {
    title: "Gratis & Terpercaya",
    description: "Akses informasi kesehatan tanpa biaya",
  },
  {
    title: "User Friendly",
    description: "Interface yang mudah digunakan untuk semua kalangan",
  },
];

export default function TentangPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
      <main className="flex-grow container mx-auto px-4 py-12">
        {/* SSG Badge */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 p-4 rounded">
            <p className="text-green-700 dark:text-green-300">
              ⚡ <strong>Static Site Generation (SSG)</strong> - Halaman ini
              di-generate saat build time!
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
            Apa itu Apotikita?
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong>Apotikita</strong> adalah platform informasi obat-obatan
              yang menyediakan akses mudah dan cepat ke database obat yang
              terintegrasi dengan openFDA (Food and Drug Administration) API.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Website ini dibuat oleh Naila Salsabila dengan NPM 247006111004
              dari Fakultas Teknik Prodi Informatika, untuk memenuhi tugas mata
              kuliah Pengembangan Aplikasi Berbasis Objek. Tujuannya adalah
              memberikan informasi kesehatan yang akurat dan mudah dipahami
              kepada masyarakat, membantu Anda membuat keputusan yang tepat
              tentang penggunaan obat-obatan.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Platform ini dikembangkan menggunakan teknologi web modern
              (Next.js) dengan menerapkan berbagai teknik rendering untuk
              memberikan pengalaman pengguna terbaik.
            </p>
          </div>
        </div>

        {/* --- SECTION HUBUNGI PENGEMBANG (KONTAK) --- */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
            Hubungi Pengembang
          </h2>
          <div className="flex justify-center gap-6 md:gap-12">
            {/* GMAIL */}
            <a
              href="mailto:nailasalsabila190506@gmail.com"
              className="group flex flex-col items-center gap-2 hover:scale-110 transition-transform"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg text-3xl border border-gray-100 dark:border-gray-700">
                📧
              </div>
              <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                Gmail
              </span>
            </a>

            {/* GITHUB */}
            <a
              href="https://github.com/ndgrchffx"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 hover:scale-110 transition-transform"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg text-3xl border border-gray-100 dark:border-gray-700">
                💻
              </div>
              <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                GitHub
              </span>
            </a>

            {/* INSTAGRAM */}
            <a
              href="https://instagram.com/ndgrchffx"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 hover:scale-110 transition-transform"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg text-3xl border border-gray-100 dark:border-gray-700">
                📸
              </div>
              <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                Instagram
              </span>
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
            Fitur Unggulan
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition text-center"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
            Kenapa Memilih Apotikita?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition"
              >
                <div className="text-6xl mb-4">{member.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
            Teknologi yang Digunakan
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                  Frontend
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    ✅ <strong>Next.js 16+</strong> - React Framework
                  </li>
                  <li>
                    ✅ <strong>TypeScript</strong> - Type Safety
                  </li>
                  <li>
                    ✅ <strong>Tailwind CSS</strong> - Modern Styling
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                  Rendering
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    🔵 <strong>SSR</strong> - Server-Side Rendering
                  </li>
                  <li>
                    🟢 <strong>CSR</strong> - Client-Side Rendering
                  </li>
                  <li>
                    🟡 <strong>SSG</strong> - Static Site Generation
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                  Data Source
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    🌐 <strong>openFDA API</strong> - Database Obat
                  </li>
                  <li>
                    📊 <strong>Real-time Data</strong> - Update Terkini
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                  State Management
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    ⚛️ <strong>React Hooks</strong> - useState
                  </li>
                  <li>
                    🔄 <strong>Context API</strong> - Dark Mode
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="bg-blue-600 dark:bg-blue-800 rounded-lg shadow-xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Siap Mencari Informasi Obat?
            </h2>
            <p className="text-blue-100 mb-6 text-lg">
              Jelajahi ribuan informasi obat dari database FDA
            </p>
            <div className="space-x-4">
              <Link
                href="/obat"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Lihat Katalog
              </Link>
              <Link
                href="/cari"
                className="inline-block bg-blue-700 dark:bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition border-2 border-white"
              >
                Cari Obat
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2026 Apotikita - Platform Informasi Obat Terpercaya</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            Data dari openFDA API | Built with Next.js
          </p>
        </div>
      </footer>

      <DarkModeToggle />
      <BackToTop />
    </div>
  );
}
