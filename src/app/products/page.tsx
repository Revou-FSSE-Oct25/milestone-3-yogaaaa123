import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

// This is a Server Component by default in Next.js 13+
// Data fetching happens on the server on each request (SSR)
export const dynamic = 'force-dynamic'; // Ensure SSR on every request

async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://api.escuelajs.co/api/v1/products?limit=20', {
    cache: 'no-store', // Disable caching for true SSR behavior
  });
  
  if (!res.ok) {
    throw new Error('Gagal mengambil data produk');
  }
  
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Daftar Produk</h1>
        <p className="text-gray-600 mb-8">Halaman ini menggunakan <span className="font-semibold text-blue-600">Server-Side Rendering (SSR)</span> - data diambil dari server setiap kali halaman diminta.</p>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
