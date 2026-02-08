import Link from 'next/link';

// This page uses Static Site Generation (SSG)
// It will be pre-rendered at build time
export const dynamic = 'force-static'; // Ensure SSG

export const metadata = {
  title: 'Tentang Kami - Hello Shop',
  description: 'Pelajari lebih lanjut tentang Hello Shop, toko online terpercaya.',
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Tentang Kami</h1>
          <p className="mt-4 text-lg text-gray-600">Halaman ini menggunakan <span className="font-semibold text-green-600">Static Site Generation (SSG)</span> - di-render saat build time.</p>
        </div>

        <div className="prose prose-lg mx-auto text-gray-700">
          <section className="mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Tentang Hello Shop
          </h1>
            <p>
              Hello Shop adalah platform e-commerce modern yang dibangun dengan teknologi terkini. 
              Kami berkomitmen untuk memberikan pengalaman belanja online yang mudah, aman, dan menyenangkan.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Visi Kami</h2>
            <p>
              Menjadi destinasi belanja online pilihan utama dengan menyediakan produk berkualitas 
              tinggi dengan harga terjangkau dan layanan pelanggan yang luar biasa.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Teknologi</h2>
            <p>Website ini dibangun menggunakan:</p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li><strong>Next.js 16</strong> - Framework React modern dengan App Router</li>
              <li><strong>Tailwind CSS</strong> - Styling utility-first</li>
              <li><strong>TypeScript</strong> - Type-safe JavaScript</li>
              <li><strong>Bun</strong> - Runtime dan package manager yang cepat</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Strategi Rendering</h2>
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="flex items-start gap-3">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">CSR</span>
                <div>
                  <p className="font-medium">Home Page</p>
                  <p className="text-sm text-gray-600">Client-Side Rendering - Data diambil di browser</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">SSR</span>
                <div>
                  <p className="font-medium">Products & Product Detail</p>
                  <p className="text-sm text-gray-600">Server-Side Rendering - Data diambil di server setiap request</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">SSG</span>
                <div>
                  <p className="font-medium">About & FAQ</p>
                  <p className="text-sm text-gray-600">Static Site Generation - Di-render saat build time</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-500 font-medium">
            &larr; Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
