import Link from 'next/link';

export default function FAQ() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Pertanyaan yang Sering Diajukan</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            <div className="pt-6">
              <dt>
                <button className="flex w-full items-start justify-between text-left text-gray-900">
                  <span className="text-base font-semibold leading-7">Bagaimana kebijakan pengembalian Hello Shop?</span>
                </button>
              </dt>
              <dd className="mt-2 pr-12">
                <p className="text-base leading-7 text-gray-600">Anda dapat mengembalikan barang apa pun dalam waktu 30 hari setelah pembelian. Pastikan barang dalam kondisi aslinya.</p>
              </dd>
            </div>
            <div className="pt-6">
              <dt>
                <button className="flex w-full items-start justify-between text-left text-gray-900">
                  <span className="text-base font-semibold leading-7">Bagaimana cara melacak pesanan saya?</span>
                </button>
              </dt>
              <dd className="mt-2 pr-12">
                <p className="text-base leading-7 text-gray-600">Setelah pesanan Anda dikirim, Anda akan menerima email berisi nomor pelacakan.</p>
              </dd>
            </div>
          </dl>
          <div className="mt-10 pt-10 border-t border-gray-200">
             <Link href="/" className="text-blue-600 hover:text-blue-500">
                &larr; Kembali ke Beranda
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
